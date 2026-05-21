'use client';

import { Agent } from '../../../data/agents';

interface AgentCardProps {
  agent: Agent;
  onDetails: (id: string) => void;
}

export default function AgentCard({ agent, onDetails }: AgentCardProps) {
  const active = agent.status === 'active';

  const openAgent = () => {
    if (!active) return;
    window.open(agent.agentUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <article className="agent-card">
      <div className="agent-card-visual">
        <span className="agent-card-icon">{agent.icon}</span>
        <span className={`badge ${active ? 'badge-cyan' : 'badge-orange'}`}>
          {active ? 'Ativo' : 'Em breve'}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="badge badge-orange">{agent.category}</span>
            <span className="badge">{agent.recommendedLevel}</span>
          </div>
          <h2 className="text-base font-extrabold text-[var(--text-primary)]">
            {agent.name}
          </h2>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--text-secondary)]">
            {agent.whenToUse}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          <button
            type="button"
            onClick={openAgent}
            disabled={!active}
            className={active ? 'btn-primary' : 'btn-secondary opacity-60'}
          >
            {active ? 'Abrir agente' : 'Em breve'}
          </button>
          <button type="button" onClick={() => onDetails(agent.id)} className="btn-ghost">
            Detalhes
          </button>
        </div>
      </div>
    </article>
  );
}
