/*
 * Central de agentes refinada: menos repetição visual e mais escolha orientada por tarefa.
 */
'use client';

import { useMemo, useState } from 'react';
import { agents } from '../../../data/agents';
import AccessibleDialog from '../../../components/ui/AccessibleDialog';
import Toast from '../../../components/ui/Toast';

const categories = [
  'Todos',
  'Engenharia & Arquitetura',
  'CAD, BIM e Documentação Técnica',
  'Prompts',
  'Planejamento',
  'Documentação',
  'Estratégia e Direcionamento',
];

const featuredAgentIds = ['engenlab-ia', 'biblioteca-50', 'prompt-tecnico'];

function levelBadge(level: string) {
  if (level.toLowerCase().includes('avançado')) return 'badge-purple';
  if (level.toLowerCase().includes('intermedi')) return 'badge-blue';
  return 'badge-cyan';
}

export default function AgentesPage() {
  const [activeAgentId, setActiveAgentId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');
  const [toast, setToast] = useState('');

  const activeAgent = agents.find((agent) => agent.id === activeAgentId);

  const filteredAgents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return agents.filter((agent) => {
      const matchesSearch =
        !query ||
        agent.name.toLowerCase().includes(query) ||
        agent.category.toLowerCase().includes(query) ||
        agent.whenToUse.toLowerCase().includes(query) ||
        agent.delivers.toLowerCase().includes(query);
      const matchesCategory = category === 'Todos' || agent.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [category, search]);

  const recommendedAgents = agents.filter((agent) => featuredAgentIds.includes(agent.id));

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2400);
  };

  const openAgent = (agentUrl: string, prompt: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(prompt);
    }
    window.open(agentUrl, '_blank', 'noopener,noreferrer');
    showToast('Prompt do agente copiado e página aberta');
  };

  return (
    <div className="page-shell">
      <section className="surface-hero p-5 md:p-7">
        <div className="grid gap-5 xl:grid-cols-[1fr_360px] xl:items-center">
          <div>
            <p className="page-kicker">Central de agentes</p>
            <h1 className="mt-2 text-3xl font-black tracking-[-0.03em] text-white md:text-4xl">
              Agentes especializados para estudar e produzir com método.
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--text-secondary)]">
              Escolha o agente pela tarefa. Use como apoio de estudo, organização e revisão preliminar, nunca como substituto da validação técnica.
            </p>
          </div>
          <div className="surface-card-soft p-4">
            <p className="page-kicker">Recomendados para começar</p>
            <div className="mt-3 grid gap-2">
              {recommendedAgents.map((agent) => (
                <button
                  type="button"
                  key={agent.id}
                  onClick={() => setActiveAgentId(agent.id)}
                  className="surface-item flex items-center justify-between gap-3 p-3 text-left"
                >
                  <span>
                    <span className="block text-sm font-extrabold text-white">{agent.name}</span>
                    <span className="block text-xs text-[var(--text-secondary)]">{agent.category}</span>
                  </span>
                  <span className="text-[var(--brand-primary-hover)]">→</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            ['Especialistas em engenharia', 'Focados em áreas e tarefas técnicas.'],
            ['Sempre disponíveis', 'Atendimento 24/7 para seus estudos.'],
            ['Aprendizado contínuo', 'Use, revise e evolua suas solicitações.'],
          ].map(([title, text]) => (
            <div key={title} className="surface-card-soft p-4">
              <h2 className="text-sm font-extrabold text-white">{title}</h2>
              <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-card p-4 md:p-5">
        <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_260px]">
          <label className="sr-only" htmlFor="agent-search">
            Buscar agente
          </label>
          <input
            id="agent-search"
            className="input-field"
            placeholder="Buscar agente por nome, habilidade ou descrição..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="select-field">
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.slice(0, 7).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`chip ${category === item ? 'chip-active' : ''}`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filteredAgents.slice(0, 16).map((agent) => (
          <article key={agent.id} className="surface-card p-5">
            <div className="mb-4 flex items-start justify-between gap-3">
              <span className="icon-tile">{agent.icon}</span>
              <span className={`badge ${agent.status === 'active' ? 'badge-cyan' : 'badge-orange'}`}>
                {agent.status === 'active' ? 'Disponível' : 'Em breve'}
              </span>
            </div>

            <div className="mb-3 flex flex-wrap gap-2">
              <span className="badge badge-blue">{agent.category}</span>
              <span className={`badge ${levelBadge(agent.recommendedLevel)}`}>{agent.recommendedLevel}</span>
            </div>

            <h2 className="text-lg font-extrabold text-white">{agent.name}</h2>
            <p className="mt-2 min-h-[72px] text-sm leading-6 text-[var(--text-secondary)]">
              {agent.whenToUse}
            </p>

            <div className="mt-4 flex items-center justify-between gap-2 text-xs font-semibold text-[var(--text-muted)]">
              <span>Uso: apoio técnico</span>
              <span className={agent.status === 'active' ? 'text-[#56E609]' : 'text-[#ffb86b]'}>
                ● {agent.status === 'active' ? 'ativo' : 'planejado'}
              </span>
            </div>

            <div className="mt-5 grid gap-2">
              <button
                type="button"
                onClick={() =>
                  agent.status === 'active'
                    ? openAgent(agent.agentUrl, agent.initialPrompt)
                    : setActiveAgentId(agent.id)
                }
                className="btn-primary w-full"
              >
                {agent.status === 'active' ? 'Abrir agente →' : 'Ver detalhes'}
              </button>
              <button type="button" onClick={() => setActiveAgentId(agent.id)} className="btn-secondary w-full">
                Detalhes
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="surface-card p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="section-title">Não encontrou o que precisa?</h2>
            <p className="section-copy mt-1">
              Solicite um agente personalizado para sua necessidade de estudo ou produção conceitual.
            </p>
          </div>
          <button type="button" className="btn-secondary">
            Solicitar novo agente →
          </button>
        </div>
      </section>

      {activeAgent && (
        <AccessibleDialog titleId="agent-modal-title" onClose={() => setActiveAgentId(null)}>
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="page-kicker">{activeAgent.category}</p>
              <h2 id="agent-modal-title" className="section-title mt-1">
                {activeAgent.name}
              </h2>
              <p className="section-copy mt-1">Nível recomendado: {activeAgent.recommendedLevel}</p>
            </div>
            <button
              type="button"
              className="btn-ghost !min-h-10 !px-3"
              onClick={() => setActiveAgentId(null)}
              aria-label="Fechar"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div className="surface-card-soft p-4">
              <h3 className="text-sm font-bold text-white">Quando usar</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{activeAgent.whenToUse}</p>
            </div>

            <div className="surface-card-soft p-4">
              <h3 className="text-sm font-bold text-white">Entrada sugerida</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{activeAgent.initialPrompt}</p>
            </div>

            <div className="surface-card-soft p-4">
              <h3 className="text-sm font-bold text-white">O que entrega</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{activeAgent.delivers}</p>
            </div>

            <button
              type="button"
              onClick={() => openAgent(activeAgent.agentUrl, activeAgent.initialPrompt)}
              className="btn-primary w-full"
              disabled={activeAgent.status !== 'active'}
            >
              {activeAgent.status === 'active' ? 'Abrir agente' : 'Agente em breve'}
            </button>

            <button
              type="button"
              onClick={() => {
                if (typeof navigator !== 'undefined') {
                  navigator.clipboard.writeText(activeAgent.initialPrompt);
                  showToast('Prompt do agente copiado');
                }
              }}
              className="btn-secondary w-full"
            >
              Copiar prompt inicial
            </button>
          </div>
        </AccessibleDialog>
      )}

      <Toast message={toast} />
    </div>
  );
}
