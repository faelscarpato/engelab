'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { checklists } from '../data/checklists';
import AccessibleDialog from './ui/AccessibleDialog';
import Toast from './ui/Toast';

type DispatchRecord = {
  at: string;
  agent: string;
  discipline: string;
  projectType: string;
};

function readDispatch() {
  try {
    return JSON.parse(localStorage.getItem('lastGptDispatch') || 'null') as DispatchRecord | null;
  } catch {
    return null;
  }
}

export default function ContextualChecklist() {
  const [dispatchRecord, setDispatchRecord] = useState<DispatchRecord | null>(null);
  const [checked, setChecked] = useState<boolean[]>([]);
  const [toast, setToast] = useState('');
  const checklist = useMemo(
    () => checklists.find((item) => item.id === 'ia-review') ?? checklists[0],
    []
  );

  const evaluateDispatch = useCallback(() => {
    const record = readDispatch();
    const reviewedAt = localStorage.getItem('reviewedGptDispatchAt');

    if (record && reviewedAt !== record.at) {
      setDispatchRecord(record);
      setChecked([]);
    }
  }, []);

  useEffect(() => {
    evaluateDispatch();

    window.addEventListener('focus', evaluateDispatch);
    window.addEventListener('gpt-dispatch', evaluateDispatch);

    return () => {
      window.removeEventListener('focus', evaluateDispatch);
      window.removeEventListener('gpt-dispatch', evaluateDispatch);
    };
  }, [evaluateDispatch]);

  const close = () => {
    if (dispatchRecord) {
      localStorage.setItem('reviewedGptDispatchAt', dispatchRecord.at);
    }
    setDispatchRecord(null);
  };

  const finish = () => {
    if (!dispatchRecord) return;

    localStorage.setItem('reviewedGptDispatchAt', dispatchRecord.at);
    localStorage.setItem('lastContextualChecklist', checklist.id);
    localStorage.setItem('checklistsCompleted', '1');
    setToast('Checklist contextual concluído');
    window.setTimeout(() => setToast(''), 2400);
    setDispatchRecord(null);
  };

  if (!dispatchRecord) {
    return <Toast message={toast} />;
  }

  const allChecked = checklist.items.length > 0 && checked.filter(Boolean).length === checklist.items.length;

  return (
    <>
      <AccessibleDialog titleId="contextual-checklist-title" onClose={close}>
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="page-kicker">Checklist contextual</p>
            <h2 id="contextual-checklist-title" className="section-title mt-1">
              Revisar retorno do GPT
            </h2>
            <p className="section-copy mt-1">
              Agente: {dispatchRecord.agent || 'GPT'} · {dispatchRecord.discipline || 'disciplina não informada'}
            </p>
          </div>
          <button type="button" onClick={close} className="btn-ghost !min-h-10" aria-label="Fechar">
            Fechar
          </button>
        </div>

        <div className="grid gap-3">
          {checklist.items.map((item, index) => (
            <label key={item} className="surface-item flex min-h-12 cursor-pointer items-start gap-3 p-3">
              <input
                type="checkbox"
                checked={checked[index] ?? false}
                onChange={() =>
                  setChecked((current) => {
                    const next = [...current];
                    next[index] = !next[index];
                    return next;
                  })
                }
                className="mt-1 h-5 w-5 rounded border-[var(--border-strong)] bg-transparent"
              />
              <span className="text-sm leading-6 text-[var(--text-secondary)]">{item}</span>
            </label>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={finish} className="btn-primary" disabled={!allChecked}>
            Concluir revisão
          </button>
          <button type="button" onClick={close} className="btn-secondary">
            Revisar depois
          </button>
        </div>
      </AccessibleDialog>

      <Toast message={toast} />
    </>
  );
}
