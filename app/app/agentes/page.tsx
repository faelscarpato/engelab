/*
 * Central de Agentes com cards escaneáveis e modal no visual system.
 */
'use client';

import { useCallback, useState } from 'react';
import { agents } from '../../../data/agents';
import AgentCard from '../../../components/features/agents/AgentCard';
import AccessibleDialog from '../../../components/ui/AccessibleDialog';
import Toast from '../../../components/ui/Toast';

export default function AgentesPage() {
  const [activeAgentId, setActiveAgentId] = useState<string | null>(null);
  const [toast, setToast] = useState('');

  const activeAgent = agents.find((agent) => agent.id === activeAgentId);
  const closeAgent = useCallback(() => setActiveAgentId(null), []);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2400);
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <p className="page-kicker">Agentes IA</p>
        <h1 className="app-title">Central de Agentes</h1>
        <p className="page-copy">
          Escolha um assistente por tarefa para receber orientação inicial,
          sempre com revisão técnica humana quando houver aplicação real.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onOpen={setActiveAgentId}
          />
        ))}
      </div>

      {activeAgent && (
        <AccessibleDialog titleId="agent-modal-title" onClose={closeAgent}>
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="page-kicker">{activeAgent.category}</p>
                <h2 id="agent-modal-title" className="section-title mt-1">
                  {activeAgent.name}
                </h2>
                <p className="section-copy mt-1">
                  Nível recomendado: {activeAgent.recommendedLevel}
                </p>
              </div>
              <button
                type="button"
                className="btn-ghost !min-h-10 !px-3"
                onClick={closeAgent}
                aria-label="Fechar"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="surface-card-soft p-4">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Quando usar</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {activeAgent.whenToUse}
                </p>
              </div>

              <div className="surface-card-soft p-4">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Entrada</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {activeAgent.initialPrompt}
                </p>
              </div>

              <div className="surface-card-soft p-4">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">O que entrega</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {activeAgent.delivers}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (typeof navigator !== 'undefined') {
                    navigator.clipboard.writeText(activeAgent.initialPrompt);
                    showToast('Prompt do agente copiado');
                  }
                }}
                className="btn-primary w-full"
              >
                Copiar prompt
              </button>
            </div>
        </AccessibleDialog>
      )}

      <Toast message={toast} />
    </div>
  );
}
