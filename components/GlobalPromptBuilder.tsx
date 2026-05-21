'use client';

import { useCallback, useState } from 'react';
import PromptBuilder from './features/prompts/PromptBuilder';
import AccessibleDialog from './ui/AccessibleDialog';
import Toast from './ui/Toast';

export default function GlobalPromptBuilder() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState('');
  const close = useCallback(() => setOpen(false), []);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2400);
  };

  return (
    <>
      <button
        type="button"
        className="prompt-builder-fab focus-ring"
        onClick={() => setOpen(true)}
        aria-label="Abrir Builder de Prompts"
      >
        <span aria-hidden="true">✦</span>
        <span>Builder</span>
      </button>

      {open && (
        <AccessibleDialog titleId="global-prompt-builder-title" onClose={close}>
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="page-kicker">Builder global</p>
              <h2 id="global-prompt-builder-title" className="section-title mt-1">
                Monte o pedido central
              </h2>
              <p className="section-copy mt-1">
                Gere, copie, salve e envie um prompt sem sair da página atual.
              </p>
            </div>
            <button type="button" onClick={close} className="btn-ghost !min-h-10" aria-label="Fechar">
              Fechar
            </button>
          </div>

          <PromptBuilder compact onToast={showToast} />
        </AccessibleDialog>
      )}

      <Toast message={toast} />
    </>
  );
}
