'use client';

import { Agent } from '../../../data/agents';

interface AgentCardProps {
  agent: Agent;
  onOpen: (id: string) => void;
}

export default function AgentCard({ agent, onOpen }: AgentCardProps) {
  return (
    <article className="surface-card p-4">
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-start gap-4">
          <span className="icon-tile mt-1">◎</span>
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="badge badge-orange">{agent.category}</span>
              <span className="badge">{agent.recommendedLevel}</span>
            </div>
            <h2 className="text-base font-extrabold text-[var(--text-primary)]">
              {agent.name}
            </h2>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="surface-item p-3">
            <p className="text-xs font-bold uppercase text-[var(--text-muted)]">Use quando</p>
            <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
              {agent.whenToUse}
            </p>
          </div>
          <div className="surface-item p-3">
            <p className="text-xs font-bold uppercase text-[var(--text-muted)]">Entrada</p>
            <p className="mt-1 line-clamp-2 text-sm leading-6 text-[var(--text-secondary)]">
              {agent.initialPrompt}
            </p>
          </div>
          <div className="surface-item p-3">
            <p className="text-xs font-bold uppercase text-[var(--text-muted)]">Entrega</p>
            <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
              {agent.delivers}
            </p>
          </div>
        </div>

        <button type="button" onClick={() => onOpen(agent.id)} className="btn-primary mt-auto">
          Abrir agente
        </button>
      </div>
    </article>
  );
}
