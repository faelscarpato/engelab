/*
 * Prompts Modulares como ferramenta: templates na lateral, builder no centro
 * e preview/score sempre visíveis em telas largas.
 */
'use client';

import { useEffect, useMemo, useState } from 'react';
import { prompts } from '../../../data/prompts';
import { disciplineBadgeClass } from '../../../lib/design';
import PromptBuilder, {
  type BuilderFields,
  type SavedPrompt,
} from '../../../components/features/prompts/PromptBuilder';
import EmptyState from '../../../components/ui/EmptyState';
import Toast from '../../../components/ui/Toast';

const filters = ['Todos', 'Geral', 'Estrutural', 'Elétrica', 'Hidrossanitário', 'Documentação', 'Revisão'];

export default function PromptsPage() {
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [builderFields, setBuilderFields] = useState<Partial<BuilderFields>>({});
  const [builderVersion, setBuilderVersion] = useState(0);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('myPrompts');
      if (stored) {
        setSavedPrompts(JSON.parse(stored));
      }
    }
  }, []);

  const filteredPrompts = useMemo(
    () =>
      prompts.filter((prompt) => {
        return activeFilter === 'Todos' || prompt.discipline === activeFilter;
      }),
    [activeFilter]
  );

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2400);
  };

  const handleCopy = (content: string) => {
    if (!content.trim()) return;

    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(content);
      showToast('Prompt copiado');
    }
  };

  const applyTemplate = (prompt: (typeof prompts)[number]) => {
    const normalizedDiscipline = prompt.discipline === 'Elétrica' ? 'Elétrico' : prompt.discipline;

    setBuilderFields({
      objetivo: prompt.title,
      contexto: prompt.content,
      tipoProjeto: prompt.relatedProjectId ? `Projeto modelo ${prompt.relatedProjectId}` : '',
      disciplina: normalizedDiscipline,
      nivelDetalhe: prompt.level,
      formatoSaida: prompt.promptType,
      restricoes: 'Manter caráter conceitual, indicar pontos de validação e evitar conclusões executivas.',
    });
    setBuilderVersion((current) => current + 1);
    showToast('Template aplicado ao builder');
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <p className="page-kicker">Prompts Modulares</p>
        <h1 className="app-title">Prompt Builder técnico</h1>
        <p className="page-copy">
          Use templates como presets, complete o contexto no builder e valide o
          prompt antes de copiar ou salvar.
        </p>
      </div>

      <div className="grid min-w-0 gap-5 xl:grid-cols-[300px_minmax(0,1fr)] xl:items-start">
        <aside className="min-w-0 space-y-4 xl:sticky xl:top-24">
          <section className="surface-section min-w-0 overflow-hidden p-4">
            <h2 className="section-title">Templates</h2>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 xl:flex-wrap">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`chip ${activeFilter === filter ? 'chip-active' : ''}`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="mt-4 grid gap-3">
              {filteredPrompts.map((prompt) => (
                <button
                  key={prompt.id}
                  type="button"
                  onClick={() => applyTemplate(prompt)}
                  className="surface-item min-w-0 p-3 text-left focus-ring"
                >
                  <span className="mb-2 flex flex-wrap gap-2">
                    <span className={disciplineBadgeClass(prompt.discipline)}>
                      {prompt.discipline}
                    </span>
                    <span className="badge">{prompt.level}</span>
                  </span>
                  <span className="block min-w-0 break-words text-sm font-extrabold text-[var(--text-primary)]">
                    {prompt.title}
                  </span>
                  <span className="mt-1 line-clamp-2 block min-w-0 break-words text-xs leading-5 text-[var(--text-secondary)]">
                    {prompt.howToUse}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="surface-section min-w-0 overflow-hidden p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="section-title">Prompts salvos</h2>
              <span className="badge badge-blue">{savedPrompts.length}</span>
            </div>

            {savedPrompts.length === 0 ? (
              <EmptyState
                title="Nenhum prompt salvo"
                description="Salve um template ou o preview gerado pelo builder."
              />
            ) : (
              <div className="grid gap-3">
                {savedPrompts.map((prompt) => (
                  <div key={prompt.id} className="surface-item p-3">
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">
                      {prompt.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-xs leading-5 text-[var(--text-secondary)]">
                      {prompt.content}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleCopy(prompt.content)}
                      className="btn-secondary mt-3 !min-h-10 !px-4"
                    >
                      Copiar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </aside>

        <PromptBuilder
          key={builderVersion}
          initialFields={builderFields}
          onSavePrompt={(prompt) => setSavedPrompts((prev) => [...prev, prompt])}
          onToast={showToast}
        />
      </div>

      <Toast message={toast} />
    </div>
  );
}
