'use client';

import { useEffect, useMemo, useState } from 'react';
import { agentRouting, resolveAgentRoute } from '../../../lib/data/agent-routing';
import { engelabProjects } from '../../../lib/data/engelab-projects';
import PromptQualityScore from './PromptQualityScore';

export interface SavedPrompt {
  id: number;
  title: string;
  content: string;
  notes?: string;
}

export const fieldLabels = {
  objetivo: 'Objetivo',
  contexto: 'Contexto',
  tipoProjeto: 'Tipo de projeto',
  disciplina: 'Disciplina',
  nivelDetalhe: 'Nível de detalhe',
  formatoSaida: 'Formato de saída',
  restricoes: 'Restrições',
};

export type BuilderFields = Record<keyof typeof fieldLabels, string>;

export const emptyFields: BuilderFields = {
  objetivo: '',
  contexto: '',
  tipoProjeto: '',
  disciplina: '',
  nivelDetalhe: '',
  formatoSaida: '',
  restricoes: '',
};

interface PromptBuilderProps {
  initialFields?: Partial<BuilderFields>;
  compact?: boolean;
  onSavePrompt?: (prompt: SavedPrompt) => void;
  onToast?: (message: string) => void;
}

const specialProjectTypes = ['CAD/BIM', 'Cálculo IA', 'Landing Page', 'UX/Produto'];
const disciplines = ['Estrutural', 'Elétrico', 'Hidrossanitário', 'CAD/BIM', 'Cálculo IA', 'Landing Page', 'UX/Produto'];
const detailLevels = ['Conceitual', 'Básico', 'Intermediário', 'Avançado'];
const outputFormats = ['Checklist', 'Memorial', 'Roteiro de estudo', 'Brief técnico', 'Tabela comparativa', 'Prompt completo'];

function getStoredPrompts() {
  try {
    return JSON.parse(localStorage.getItem('myPrompts') || '[]') as SavedPrompt[];
  } catch {
    return [];
  }
}

export function buildPromptPreview(fields: BuilderFields) {
  const parts = [
    fields.objetivo && `Objetivo: ${fields.objetivo}.`,
    fields.contexto && `Contexto: ${fields.contexto}.`,
    fields.tipoProjeto && `Tipo de projeto: ${fields.tipoProjeto}.`,
    fields.disciplina && `Disciplina: ${fields.disciplina}.`,
    fields.nivelDetalhe && `Nível de detalhe: ${fields.nivelDetalhe}.`,
    fields.formatoSaida && `Formato de saída: ${fields.formatoSaida}.`,
    fields.restricoes && `Restrições técnicas: ${fields.restricoes}.`,
    'Limite: este estudo é conceitual e não substitui cálculo técnico, projeto executivo ou revisão de profissional habilitado.',
  ].filter(Boolean);

  return parts.join('\n\n');
}

export function savePrompt(prompt: SavedPrompt) {
  const next = [...getStoredPrompts(), prompt];
  localStorage.setItem('myPrompts', JSON.stringify(next));
  localStorage.setItem('promptsSaved', next.length.toString());
}

export default function PromptBuilder({
  initialFields,
  compact = false,
  onSavePrompt,
  onToast,
}: PromptBuilderProps) {
  const [fields, setFields] = useState<BuilderFields>({ ...emptyFields, ...initialFields });

  useEffect(() => {
    setFields({ ...emptyFields, ...initialFields });
  }, [initialFields]);

  const projectTypes = useMemo(
    () => [
      '',
      ...Array.from(new Set(engelabProjects.map((project) => project.category))),
      ...specialProjectTypes,
    ],
    []
  );

  const preview = useMemo(() => buildPromptPreview(fields), [fields]);
  const agentRoute = resolveAgentRoute(fields.disciplina, fields.tipoProjeto);

  const qualityChecks = {
    contexto: Boolean(fields.contexto || fields.tipoProjeto || fields.disciplina),
    objetivo: Boolean(fields.objetivo),
    formato: Boolean(fields.formatoSaida || fields.nivelDetalhe),
    restricoes: Boolean(fields.restricoes),
  };

  const showToast = (message: string) => {
    onToast?.(message);
  };

  const handleCopy = async () => {
    if (!preview.trim()) return;

    await navigator.clipboard.writeText(preview);
    showToast('Prompt copiado');
  };

  const handleSave = () => {
    if (!preview.trim()) return;

    const prompt = {
      id: Date.now(),
      title: fields.objetivo || 'Prompt personalizado',
      content: preview,
    };

    savePrompt(prompt);
    onSavePrompt?.(prompt);
    showToast('Prompt salvo');
  };

  const handleSendToGpt = async () => {
    if (preview.trim()) {
      await navigator.clipboard.writeText(preview);
    }

    localStorage.setItem(
      'lastGptDispatch',
      JSON.stringify({
        at: new Date().toISOString(),
        agent: agentRoute.label,
        discipline: fields.disciplina,
        projectType: fields.tipoProjeto,
      })
    );

    window.open(agentRoute.url, '_blank', 'noopener,noreferrer');
    showToast(`Prompt copiado. Abrindo ${agentRoute.label}`);
  };

  return (
    <div className={compact ? 'grid gap-4' : 'grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]'}>
      <section id="prompt-builder" className={compact ? 'grid gap-4' : 'surface-card p-5'}>
        <div className="mb-1">
          <p className="page-kicker">Builder guiado</p>
          <h2 className="section-title mt-1">Monte o pedido central</h2>
          <p className="section-copy mt-2">
            Selecione tipo e disciplina, complete o contexto e envie para o agente mais adequado.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="field-objetivo" className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
              {fieldLabels.objetivo}
            </label>
            <input
              id="field-objetivo"
              type="text"
              value={fields.objetivo}
              onChange={(event) => setFields({ ...fields, objetivo: event.target.value })}
              className="input-field"
              placeholder="Ex: gerar memorial conceitual"
            />
          </div>

          <div>
            <label htmlFor="field-tipoProjeto" className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
              {fieldLabels.tipoProjeto}
            </label>
            <select
              id="field-tipoProjeto"
              value={fields.tipoProjeto}
              onChange={(event) => setFields({ ...fields, tipoProjeto: event.target.value })}
              className="select-field"
            >
              <option value="">Selecionar tipo</option>
              {projectTypes.filter(Boolean).map((projectType) => (
                <option key={projectType} value={projectType}>
                  {projectType}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="field-disciplina" className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
              {fieldLabels.disciplina}
            </label>
            <select
              id="field-disciplina"
              value={fields.disciplina}
              onChange={(event) => setFields({ ...fields, disciplina: event.target.value })}
              className="select-field"
            >
              <option value="">Selecionar disciplina</option>
              {disciplines.map((discipline) => (
                <option key={discipline} value={discipline}>
                  {discipline}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="field-nivelDetalhe" className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
              {fieldLabels.nivelDetalhe}
            </label>
            <select
              id="field-nivelDetalhe"
              value={fields.nivelDetalhe}
              onChange={(event) => setFields({ ...fields, nivelDetalhe: event.target.value })}
              className="select-field"
            >
              <option value="">Selecionar nível</option>
              {detailLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="field-formatoSaida" className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
              {fieldLabels.formatoSaida}
            </label>
            <select
              id="field-formatoSaida"
              value={fields.formatoSaida}
              onChange={(event) => setFields({ ...fields, formatoSaida: event.target.value })}
              className="select-field"
            >
              <option value="">Selecionar formato</option>
              {outputFormats.map((format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </div>

          <div className="surface-card-soft p-3">
            <p className="text-xs font-bold uppercase text-[var(--text-muted)]">Agente roteado</p>
            <p className="mt-1 text-sm font-extrabold text-[var(--text-primary)]">{agentRoute.label}</p>
            <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">{agentRoute.category}</p>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="field-contexto" className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
              {fieldLabels.contexto}
            </label>
            <textarea
              id="field-contexto"
              value={fields.contexto}
              onChange={(event) => setFields({ ...fields, contexto: event.target.value })}
              className="textarea-field"
              placeholder="Descreva o projeto, o público, premissas, restrições e o resultado esperado."
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="field-restricoes" className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
              {fieldLabels.restricoes}
            </label>
            <textarea
              id="field-restricoes"
              value={fields.restricoes}
              onChange={(event) => setFields({ ...fields, restricoes: event.target.value })}
              className="textarea-field"
              placeholder="Inclua limites normativos, caráter conceitual, validações e pontos que a IA deve evitar."
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={handleCopy} className="btn-secondary">
            Copiar prompt
          </button>
          <button type="button" onClick={handleSave} className="btn-secondary">
            Salvar prompt
          </button>
          <button type="button" onClick={handleSendToGpt} className="btn-primary">
            Enviar ao GPT
          </button>
          <button type="button" onClick={() => setFields(emptyFields)} className="btn-ghost">
            Limpar
          </button>
        </div>
      </section>

      <aside className="space-y-4">
        {!compact && <PromptQualityScore checks={qualityChecks} />}

        <section className={compact ? 'surface-card-soft p-4' : 'surface-section p-4'}>
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="section-title">Preview</h2>
            <span className="badge">{preview.length} caracteres</span>
          </div>
          <div className="surface-card-soft max-h-[360px] min-h-[220px] overflow-auto p-4">
            <p className="whitespace-pre-line text-sm leading-6 text-[var(--text-secondary)]">
              {preview || 'Preencha os campos para montar o prompt.'}
            </p>
          </div>
        </section>

        {compact && <PromptQualityScore checks={qualityChecks} />}

        <section className="surface-card-soft p-4">
          <p className="text-xs font-bold uppercase text-[var(--text-muted)]">Rotas configuradas</p>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            {Object.keys(agentRouting).length} contextos direcionam o aluno para o GPT correto.
          </p>
        </section>
      </aside>
    </div>
  );
}
