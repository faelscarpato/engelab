'use client';

import { useMemo, useState } from 'react';
import {
  engineeringAgents,
  engineeringDisciplines,
  engineeringTasks,
  getDiscipline,
  getTask,
  promptDeskSafetyNotice,
  routeEngineeringAgent,
  type PromptDeskDisciplineId,
  type PromptDeskTaskId,
} from '../../data/promptdeskEngineering';

type FormState = {
  taskId: PromptDeskTaskId;
  disciplineId: PromptDeskDisciplineId;
  projectName: string;
  buildingType: string;
  location: string;
  stage: string;
  sourceMaterial: string;
  objective: string;
  requiredOutput: string;
  constraints: string;
  knownData: string;
  missingData: string;
};

const initialForm: FormState = {
  taskId: 'technical-board',
  disciplineId: 'structural',
  projectName: 'Projeto-modelo residencial',
  buildingType: 'Residência térrea',
  location: 'Pedreira/SP',
  stage: 'Estudo preliminar',
  sourceMaterial: '',
  objective: 'Gerar uma entrega técnica educacional clara, segura e pronta para revisão humana.',
  requiredOutput: 'Prompt técnico estruturado + checklist de revisão',
  constraints:
    'Não tratar como projeto executivo, cálculo final, laudo, ART/RRT, aprovação normativa ou autorização de obra.',
  knownData: '',
  missingData: '',
};

function getReadiness(form: FormState) {
  const required = [
    form.projectName,
    form.buildingType,
    form.location,
    form.stage,
    form.objective,
    form.requiredOutput,
    form.sourceMaterial || form.knownData,
  ];
  const filled = required.filter((value) => value.trim().length > 2).length;
  const score = Math.round((filled / required.length) * 100);

  if (score >= 86) {
    return { label: 'Verde', tone: 'bg-emerald-400 text-slate-950', score, message: 'Briefing suficiente para gerar prompt completo.' };
  }

  if (score >= 58) {
    return { label: 'Amarelo', tone: 'bg-yellow-300 text-slate-950', score, message: 'Pode gerar, mas deve destacar lacunas e pedir revisão.' };
  }

  return { label: 'Vermelho', tone: 'bg-red-500 text-white', score, message: 'Dados insuficientes. Gere apenas triagem e lista de pendências.' };
}

function buildEngineeringPrompt(form: FormState) {
  const task = getTask(form.taskId);
  const discipline = getDiscipline(form.disciplineId);
  const agent = routeEngineeringAgent(form.taskId, form.disciplineId);
  const readiness = getReadiness(form);

  return `# Prompt estruturado — Engelab PromptDesk / Engenharia

## 1. Papel do agente
Atue como ${agent.name}, especialista em ${agent.category}.
Sua função é transformar dados soltos, briefing, PDF, imagens ou observações em uma entrega técnica preliminar, organizada e segura para revisão humana.

## 2. Tarefa selecionada
- Tarefa: ${task.title}
- Descrição: ${task.description}
- Saída esperada: ${form.requiredOutput || task.output}
- Disciplina: ${discipline.name}
- Escopo da disciplina: ${discipline.scope}

## 3. Contexto do projeto
- Nome do projeto: ${form.projectName || 'não informado'}
- Tipo de edificação/projeto: ${form.buildingType || 'não informado'}
- Localidade: ${form.location || 'não informada'}
- Etapa: ${form.stage || 'não informada'}
- Objetivo do usuário: ${form.objective || 'não informado'}

## 4. Dados fornecidos pelo usuário
${form.sourceMaterial || form.knownData || 'Nenhum dado técnico detalhado foi fornecido. Trabalhe apenas como triagem e solicite dados ausentes.'}

## 5. Dados conhecidos / premissas
${form.knownData || 'Não informado.'}

## 6. Lacunas ou dados ausentes já percebidos
${form.missingData || 'Aponte as lacunas durante a análise.'}

## 7. Restrições obrigatórias
${form.constraints || promptDeskSafetyNotice}

Regras de segurança:
${agent.guardrails.map((item) => `- ${item}`).join('\n')}
- ${promptDeskSafetyNotice}

## 8. Checklist mínimo de conferência
${task.checklist.map((item) => `- Conferir: ${item}`).join('\n')}
${discipline.criticalData.map((item) => `- Dado crítico da disciplina: ${item}`).join('\n')}

## 9. Critério de prontidão
- Status atual: ${readiness.label}
- Pontuação: ${readiness.score}%
- Interpretação: ${readiness.message}

## 10. Formato da resposta
Entregue a resposta nesta estrutura:

1. Resumo executivo curto.
2. Dados identificados.
3. Lacunas de informação.
4. Hipóteses assumidas, separadas dos fatos.
5. Entrega principal solicitada: ${form.requiredOutput || task.output}.
6. Checklist de revisão humana.
7. Riscos de interpretação.
8. Próximos dados necessários.
9. Aviso técnico obrigatório.

## 11. Aviso final obrigatório
Inclua no final: "${promptDeskSafetyNotice}"`;
}

export default function PromptDeskEngineeringPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [manualAgentId, setManualAgentId] = useState<string>('auto');
  const [copied, setCopied] = useState(false);

  const task = useMemo(() => getTask(form.taskId), [form.taskId]);
  const discipline = useMemo(() => getDiscipline(form.disciplineId), [form.disciplineId]);
  const routedAgent = useMemo(() => routeEngineeringAgent(form.taskId, form.disciplineId), [form.taskId, form.disciplineId]);
  const selectedAgent = useMemo(
    () => engineeringAgents.find((agent) => agent.id === manualAgentId) ?? routedAgent,
    [manualAgentId, routedAgent],
  );
  const readiness = useMemo(() => getReadiness(form), [form]);
  const generatedPrompt = useMemo(() => {
    const base = buildEngineeringPrompt(form);
    if (manualAgentId === 'auto' || selectedAgent.id === routedAgent.id) return base;
    return base.replace(routedAgent.name, selectedAgent.name).replace(routedAgent.category, selectedAgent.category);
  }, [form, manualAgentId, routedAgent, selectedAgent]);

  function updateField<Key extends keyof FormState>(key: Key, value: FormState[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
    setCopied(false);
  }

  async function copyPrompt() {
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
  }

  return (
    <main className="min-h-screen bg-[#050914] px-4 py-5 text-slate-100 md:px-8 md:py-8">
      <section className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl">
          <div className="grid gap-8 p-5 md:grid-cols-[1.1fr_0.9fr] md:p-8 lg:p-10">
            <div>
              <span className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                Engelab PromptDesk · Engenharia
              </span>
              <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.05em] text-white md:text-6xl">
                Transforme briefing, PDF e dados soltos em prompt técnico pronto para revisão.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                Primeiro nicho implementado: engenharia. A lógica abaixo replica o núcleo operacional do PromptDesk:
                seleção de tarefa, disciplina, roteamento de agente, prontidão e geração de prompt estruturado.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-wide text-slate-300">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">MVP web</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Nicho: Engenharia</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Escalável por agentes</span>
              </div>
            </div>

            <aside className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Status da entrega</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <p className="text-3xl font-black text-white">01</p>
                  <p className="mt-1 text-sm text-slate-400">nicho ativo</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <p className="text-3xl font-black text-white">09</p>
                  <p className="mt-1 text-sm text-slate-400">tarefas base</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <p className="text-3xl font-black text-white">08</p>
                  <p className="mt-1 text-sm text-slate-400">agentes</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <p className="text-3xl font-black text-white">100%</p>
                  <p className="mt-1 text-sm text-slate-400">local-first</p>
                </div>
              </div>
              <p className="mt-4 rounded-2xl border border-yellow-300/20 bg-yellow-300/10 p-4 text-sm leading-6 text-yellow-100">
                {promptDeskSafetyNotice}
              </p>
            </aside>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-6">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200">1. Tarefa</p>
                  <h2 className="mt-1 text-2xl font-black text-white">O que o PromptDesk vai gerar?</h2>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-black ${readiness.tone}`}>{readiness.label} · {readiness.score}%</span>
              </div>

              <div className="mt-5 grid gap-3">
                {engineeringTasks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => updateField('taskId', item.id)}
                    className={`rounded-2xl border p-4 text-left transition hover:border-cyan-300/50 ${
                      form.taskId === item.id ? 'border-cyan-300/60 bg-cyan-300/10' : 'border-white/10 bg-slate-950/45'
                    }`}
                  >
                    <span className="text-sm font-black text-white">{item.title}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-400">{item.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200">2. Disciplina</p>
              <h2 className="mt-1 text-2xl font-black text-white">Área técnica</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {engineeringDisciplines.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => updateField('disciplineId', item.id)}
                    className={`rounded-2xl border p-4 text-left transition hover:border-cyan-300/50 ${
                      form.disciplineId === item.id ? 'border-cyan-300/60 bg-cyan-300/10' : 'border-white/10 bg-slate-950/45'
                    }`}
                  >
                    <span className="text-sm font-black text-white">{item.name}</span>
                    <span className="mt-1 line-clamp-3 block text-xs leading-5 text-slate-400">{item.scope}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200">3. Briefing guiado</p>
              <h2 className="mt-1 text-2xl font-black text-white">Dados mínimos da entrega</h2>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <Field label="Nome do projeto" value={form.projectName} onChange={(value) => updateField('projectName', value)} />
                <Field label="Tipo de projeto" value={form.buildingType} onChange={(value) => updateField('buildingType', value)} />
                <Field label="Localidade" value={form.location} onChange={(value) => updateField('location', value)} />
                <Field label="Etapa" value={form.stage} onChange={(value) => updateField('stage', value)} />
                <Field label="Objetivo" value={form.objective} onChange={(value) => updateField('objective', value)} wide />
                <Field label="Saída desejada" value={form.requiredOutput} onChange={(value) => updateField('requiredOutput', value)} wide />
              </div>

              <div className="mt-4 grid gap-4">
                <TextArea
                  label="Material de origem / texto extraído / resumo do PDF"
                  value={form.sourceMaterial}
                  placeholder="Cole aqui o texto extraído do PDF, anotações da prancha, descrição do projeto, fotos observadas ou briefing do cliente."
                  onChange={(value) => updateField('sourceMaterial', value)}
                />
                <TextArea
                  label="Dados conhecidos"
                  value={form.knownData}
                  placeholder="Ex.: área, pavimentos, escala, sistema estrutural, elementos presentes, materiais, ambientes, pontos técnicos identificados."
                  onChange={(value) => updateField('knownData', value)}
                />
                <TextArea
                  label="Lacunas percebidas"
                  value={form.missingData}
                  placeholder="Ex.: sem sondagem, sem cargas, sem cotas, sem escala confirmada, sem norma indicada, fotos incompletas."
                  onChange={(value) => updateField('missingData', value)}
                />
                <TextArea label="Restrições" value={form.constraints} onChange={(value) => updateField('constraints', value)} />
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200">4. Roteamento</p>
                  <h2 className="mt-1 text-2xl font-black text-white">Agente recomendado</h2>
                </div>
                <select
                  value={manualAgentId}
                  onChange={(event) => setManualAgentId(event.target.value)}
                  className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm font-bold text-white outline-none"
                >
                  <option value="auto">Automático pelo PromptDesk</option>
                  {engineeringAgents.map((agent) => (
                    <option key={agent.id} value={agent.id}>{agent.name}</option>
                  ))}
                </select>
              </div>

              <div className="mt-5 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                <p className="text-lg font-black text-white">{selectedAgent.name}</p>
                <p className="mt-1 text-sm font-bold text-cyan-100">{selectedAgent.category}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{selectedAgent.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedAgent.bestFor.slice(0, 4).map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">{item}</span>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <InfoCard title="Tarefa ativa" body={`${task.title} · ${task.output}`} />
                <InfoCard title="Disciplina ativa" body={`${discipline.name} · ${discipline.warning}`} />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200">5. Prontidão</p>
            <h2 className="mt-1 text-2xl font-black text-white">Checklist antes de enviar</h2>
            <div className="mt-5 flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/55 p-4">
              <span className={`rounded-full px-4 py-2 text-sm font-black ${readiness.tone}`}>{readiness.label}</span>
              <div>
                <p className="text-xl font-black text-white">{readiness.score}%</p>
                <p className="text-sm text-slate-400">{readiness.message}</p>
              </div>
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
              {[...task.checklist, ...discipline.criticalData].slice(0, 10).map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>

          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200">6. Prompt final</p>
                <h2 className="mt-1 text-2xl font-black text-white">Copiar e enviar para o agente GPT</h2>
              </div>
              <button
                onClick={copyPrompt}
                className="rounded-2xl border border-cyan-300/30 bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 transition hover:brightness-110"
              >
                {copied ? 'Copiado' : 'Copiar prompt'}
              </button>
            </div>
            <pre className="mt-5 max-h-[760px] overflow-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/45 p-5 text-sm leading-7 text-slate-200">
              {generatedPrompt}
            </pre>
          </div>
        </section>
      </section>
    </main>
  );
}

function Field({ label, value, onChange, wide = false }: { label: string; value: string; onChange: (value: string) => void; wide?: boolean }) {
  return (
    <label className={`block ${wide ? 'md:col-span-2' : ''}`}>
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-slate-400">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50"
      />
    </label>
  );
}

function TextArea({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-slate-400">{label}</span>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-28 w-full resize-y rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50"
      />
    </label>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-200">{body}</p>
    </div>
  );
}
