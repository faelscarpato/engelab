/*
 * Prompts Modulares como ferramenta: templates na lateral, builder no centro
 * e preview/score sempre visíveis em telas largas.
 */
'use client';

import { useEffect, useMemo, useState } from 'react';
import { prompts } from '../../../data/prompts';
import { disciplineBadgeClass } from '../../../lib/design';
import PromptQualityScore from '../../../components/features/prompts/PromptQualityScore';
import EmptyState from '../../../components/ui/EmptyState';
import Toast from '../../../components/ui/Toast';

interface SavedPrompt {
  id: number;
  title: string;
  content: string;
  notes?: string;
}

const filters = ['Todos', 'Geral', 'Estrutural', 'Elétrica', 'Hidrossanitário', 'Documentação', 'Revisão'];

const fieldLabels = {
  objetivo: 'Objetivo',
  contexto: 'Contexto',
  tipoProjeto: 'Tipo de projeto',
  disciplina: 'Disciplina',
  nivelDetalhe: 'Nível de detalhe',
  formatoSaida: 'Formato de saída',
  restricoes: 'Restrições',
};

type BuilderFields = Record<keyof typeof fieldLabels, string>;

const emptyFields: BuilderFields = {
  objetivo: '',
  contexto: '',
  tipoProjeto: '',
  disciplina: '',
  nivelDetalhe: '',
  formatoSaida: '',
  restricoes: '',
};

export default function PromptsPage() {
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [builderFields, setBuilderFields] = useState<BuilderFields>(emptyFields);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('myPrompts');
      if (stored) {
        setSavedPrompts(JSON.parse(stored));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('myPrompts', JSON.stringify(savedPrompts));
      localStorage.setItem('promptsSaved', savedPrompts.length.toString());
    }
  }, [savedPrompts]);

  const filteredPrompts = useMemo(
    () =>
      prompts.filter((prompt) => {
        return activeFilter === 'Todos' || prompt.discipline === activeFilter;
      }),
    [activeFilter]
  );

  const preview = useMemo(() => {
    const parts = [
      builderFields.objetivo && `Objetivo: ${builderFields.objetivo}.`,
      builderFields.contexto && `Contexto: ${builderFields.contexto}.`,
      builderFields.tipoProjeto && `Tipo de projeto: ${builderFields.tipoProjeto}.`,
      builderFields.disciplina && `Disciplina: ${builderFields.disciplina}.`,
      builderFields.nivelDetalhe && `Nível de detalhe: ${builderFields.nivelDetalhe}.`,
      builderFields.formatoSaida && `Formato de saída: ${builderFields.formatoSaida}.`,
      builderFields.restricoes && `Restrições técnicas: ${builderFields.restricoes}.`,
      'Limite: este estudo é conceitual e não substitui cálculo técnico, projeto executivo ou revisão de profissional habilitado.',
    ].filter(Boolean);

    return parts.join('\n\n');
  }, [builderFields]);

  const qualityChecks = {
    contexto: Boolean(builderFields.contexto || builderFields.tipoProjeto || builderFields.disciplina),
    objetivo: Boolean(builderFields.objetivo),
    formato: Boolean(builderFields.formatoSaida || builderFields.nivelDetalhe),
    restricoes: Boolean(builderFields.restricoes),
  };

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

  const handleSave = (content: string, title: string) => {
    if (!content.trim()) return;

    setSavedPrompts((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: title || 'Prompt personalizado',
        content,
      },
    ]);
    showToast('Prompt salvo');
  };

  const applyTemplate = (prompt: (typeof prompts)[number]) => {
    setBuilderFields({
      objetivo: prompt.title,
      contexto: prompt.content,
      tipoProjeto: prompt.relatedProjectId ? `Projeto modelo ${prompt.relatedProjectId}` : '',
      disciplina: prompt.discipline,
      nivelDetalhe: prompt.level,
      formatoSaida: prompt.promptType,
      restricoes: 'Manter caráter conceitual, indicar pontos de validação e evitar conclusões executivas.',
    });
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

      <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)_330px] xl:items-start">
        <aside className="space-y-4 xl:sticky xl:top-24">
          <section className="surface-section p-4">
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
                  className="surface-item p-3 text-left focus-ring"
                >
                  <span className="mb-2 flex flex-wrap gap-2">
                    <span className={disciplineBadgeClass(prompt.discipline)}>
                      {prompt.discipline}
                    </span>
                    <span className="badge">{prompt.level}</span>
                  </span>
                  <span className="block text-sm font-extrabold text-[var(--text-primary)]">
                    {prompt.title}
                  </span>
                  <span className="mt-1 line-clamp-2 block text-xs leading-5 text-[var(--text-secondary)]">
                    {prompt.howToUse}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="surface-section p-4">
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

        <section id="prompt-builder" className="surface-card p-5">
          <div className="mb-5">
            <p className="page-kicker">Builder guiado</p>
            <h2 className="section-title mt-1">Monte o pedido central</h2>
            <p className="section-copy mt-2">
              O preview atualiza ao vivo. Os campos de contexto, objetivo,
              formato e restrições alimentam o score da lateral.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {(Object.keys(fieldLabels) as Array<keyof BuilderFields>).map((field) => {
              const isLong = field === 'contexto' || field === 'restricoes';

              return (
                <div key={field} className={isLong ? 'md:col-span-2' : ''}>
                  <label
                    htmlFor={`field-${field}`}
                    className="mb-2 block text-sm font-bold text-[var(--text-primary)]"
                  >
                    {fieldLabels[field]}
                  </label>
                  {isLong ? (
                    <textarea
                      id={`field-${field}`}
                      value={builderFields[field]}
                      onChange={(event) =>
                        setBuilderFields({
                          ...builderFields,
                          [field]: event.target.value,
                        })
                      }
                      className="textarea-field"
                      placeholder={`Informe ${fieldLabels[field].toLowerCase()}`}
                    />
                  ) : (
                    <input
                      id={`field-${field}`}
                      type="text"
                      value={builderFields[field]}
                      onChange={(event) =>
                        setBuilderFields({
                          ...builderFields,
                          [field]: event.target.value,
                        })
                      }
                      className="input-field"
                      placeholder={`Informe ${fieldLabels[field].toLowerCase()}`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" onClick={() => handleCopy(preview)} className="btn-primary">
              Copiar prompt
            </button>
            <button
              type="button"
              onClick={() => handleSave(preview, builderFields.objetivo)}
              className="btn-secondary"
            >
              Salvar prompt
            </button>
            <button
              type="button"
              onClick={() => setBuilderFields(emptyFields)}
              className="btn-ghost"
            >
              Limpar
            </button>
          </div>
        </section>

        <aside className="space-y-4 xl:sticky xl:top-24">
          <PromptQualityScore checks={qualityChecks} />

          <section className="surface-section p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="section-title">Preview</h2>
              <span className="badge">{preview.length} caracteres</span>
            </div>
            <div className="surface-card-soft min-h-[260px] p-4">
              <p className="whitespace-pre-line text-sm leading-6 text-[var(--text-secondary)]">
                {preview}
              </p>
            </div>
          </section>
        </aside>
      </div>

      <Toast message={toast} />
    </div>
  );
}
