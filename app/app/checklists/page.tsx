/*
 * Biblioteca de Checklists com seleção clara e área de revisão dedicada.
 */
'use client';

import { useEffect, useState } from 'react';
import { checklists } from '../../../data/checklists';
import ChecklistProgress from '../../../components/features/checklists/ChecklistProgress';
import EmptyState from '../../../components/ui/EmptyState';
import Toast from '../../../components/ui/Toast';

interface ItemStatus {
  [checklistId: string]: boolean[];
}

export default function ChecklistsPage() {
  const [activeId, setActiveId] = useState<string | null>(checklists[0]?.id ?? null);
  const [itemStatus, setItemStatus] = useState<ItemStatus>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('checklistStatus');
      if (stored) {
        setItemStatus(JSON.parse(stored));
      }
      const storedNotes = localStorage.getItem('checklistNotes');
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('checklistStatus', JSON.stringify(itemStatus));

      const completedCount = Object.entries(itemStatus).filter(([id, statuses]) => {
        const list = checklists.find((checklist) => checklist.id === id);
        return list && statuses.length === list.items.length && statuses.every(Boolean);
      }).length;

      localStorage.setItem('checklistsCompleted', completedCount.toString());
    }
  }, [itemStatus]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('checklistNotes', JSON.stringify(notes));
    }
  }, [notes]);

  const toggleItem = (checklistId: string, index: number) => {
    setItemStatus((prev) => {
      const statuses = prev[checklistId] || [];
      const newStatuses = [...statuses];
      newStatuses[index] = !newStatuses[index];

      return { ...prev, [checklistId]: newStatuses };
    });
  };

  const activeChecklist = checklists.find((checklist) => checklist.id === activeId);

  function checklistProgress(checklistId: string, itemsLength: number) {
    const statuses = itemStatus[checklistId] || [];
    const done = statuses.filter(Boolean).length;
    return {
      done,
      percent: itemsLength === 0 ? 0 : Math.round((done / itemsLength) * 100),
      completed: itemsLength > 0 && done === itemsLength,
    };
  }

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2400);
  };

  const activeProgress = activeChecklist
    ? checklistProgress(activeChecklist.id, activeChecklist.items.length)
    : null;

  const copySummary = () => {
    if (!activeChecklist || !activeProgress) return;

    const summary = [
      `Checklist: ${activeChecklist.title}`,
      `Progresso: ${activeProgress.done}/${activeChecklist.items.length}`,
      notes[activeChecklist.id] ? `Observação: ${notes[activeChecklist.id]}` : '',
      '',
      ...activeChecklist.items.map((item, index) => {
        const checked = itemStatus[activeChecklist.id]?.[index] ?? false;
        return `${checked ? '[x]' : '[ ]'} ${item}`;
      }),
    ]
      .filter(Boolean)
      .join('\n');

    navigator.clipboard.writeText(summary);
    showToast('Resumo copiado');
  };

  const clearChecklist = () => {
    if (!activeChecklist) return;

    setItemStatus((prev) => ({ ...prev, [activeChecklist.id]: [] }));
    setNotes((prev) => ({ ...prev, [activeChecklist.id]: '' }));
    showToast('Checklist limpa');
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <p className="page-kicker">Checklists</p>
        <h1 className="app-title">Revisão conceitual guiada</h1>
        <p className="page-copy">
          Use listas de validação para revisar respostas de IA, materiais de estudo
          e decisões preliminares.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="space-y-3">
          {checklists.map((checklist) => {
            const progress = checklistProgress(checklist.id, checklist.items.length);
            const active = activeId === checklist.id;

            return (
              <button
                key={checklist.id}
                type="button"
                onClick={() => setActiveId(checklist.id)}
                className={`surface-card flex w-full items-start gap-3 p-4 text-left transition ${
                  active ? 'border-[var(--brand-primary-border)] bg-[var(--brand-primary-soft)]' : ''
                }`}
              >
                <span className="icon-tile !h-11 !w-11 !text-lg">
                  {progress.completed ? '✓' : '▤'}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-extrabold text-[var(--text-primary)]">
                    {checklist.title}
                  </span>
                  <span className="mt-1 block text-xs font-semibold text-[var(--text-muted)]">
                    {checklist.category}
                  </span>
                  <ChecklistProgress done={progress.done} total={checklist.items.length} />
                </span>
              </button>
            );
          })}
        </section>

        <section className="surface-card p-5">
          {activeChecklist ? (
            <>
              <div className="mb-5">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="badge badge-blue">{activeChecklist.category}</span>
                  <span className="badge">
                    {activeProgress?.percent ?? 0}% concluído
                  </span>
                </div>
                <h2 className="section-title">{activeChecklist.title}</h2>
                <p className="section-copy mt-2">
                  Marque os itens concluídos durante sua revisão. Use a observação
                  para registrar contexto, dúvida ou decisão tomada.
                </p>
              </div>

              {activeProgress?.completed && (
                <div className="mb-5 rounded-2xl border border-[rgba(34,211,238,0.26)] bg-[rgba(34,211,238,0.08)] p-4">
                  <h3 className="text-sm font-extrabold text-[var(--text-primary)]">
                    Checklist concluído
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                    Você revisou {activeProgress.done}/{activeChecklist.items.length} pontos.
                    Salve esta revisão ou copie o resumo.
                  </p>
                </div>
              )}

              <ul className="space-y-3">
                {activeChecklist.items.map((item, index) => {
                  const statuses = itemStatus[activeChecklist.id] || [];
                  const checked = statuses[index] || false;

                  return (
                    <li key={item} className="surface-item p-3">
                      <label className="flex min-h-12 cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleItem(activeChecklist.id, index)}
                          className="mt-1 h-5 w-5 rounded border-[var(--border-strong)] bg-transparent"
                        />
                        <span className={`text-sm leading-6 ${checked ? 'text-[var(--text-muted)] line-through' : 'text-[var(--text-secondary)]'}`}>
                          {item}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-5">
                <label
                  htmlFor="checklist-note"
                  className="mb-2 block text-sm font-bold text-[var(--text-primary)]"
                >
                  Adicionar observação
                </label>
                <textarea
                  id="checklist-note"
                  value={notes[activeChecklist.id] ?? ''}
                  onChange={(event) =>
                    setNotes((prev) => ({
                      ...prev,
                      [activeChecklist.id]: event.target.value,
                    }))
                  }
                  className="textarea-field"
                  placeholder="Registre uma decisão, pendência ou ponto que precisa de validação."
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button type="button" onClick={() => showToast('Revisão salva')} className="btn-primary">
                  Salvar revisão
                </button>
                <button type="button" onClick={copySummary} className="btn-secondary">
                  Copiar resumo
                </button>
                <button type="button" onClick={clearChecklist} className="btn-ghost">
                  Limpar checklist
                </button>
              </div>
            </>
          ) : (
            <EmptyState
              title="Selecione uma checklist"
              description="Escolha uma lista para iniciar a revisão."
            />
          )}
        </section>
      </div>

      <Toast message={toast} />
    </div>
  );
}
