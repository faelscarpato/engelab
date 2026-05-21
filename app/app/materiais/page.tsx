'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import EmptyState from '../../../components/ui/EmptyState';
import { downloads } from '../../../data/downloads';
import { engelabProjects } from '../../../lib/data/engelab-projects';

type SavedPrompt = {
  id: number;
  title: string;
  content: string;
};

function readJsonArray<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T[]) : [];
  } catch {
    return [];
  }
}

export default function MateriaisPage() {
  const [favoriteProjectIds, setFavoriteProjectIds] = useState<string[]>([]);
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);

  useEffect(() => {
    setFavoriteProjectIds(readJsonArray<string | number>('favoriteProjects').map(String));
    setSavedPrompts(readJsonArray<SavedPrompt>('myPrompts'));
  }, []);

  const favoriteProjects = useMemo(
    () =>
      engelabProjects.filter((project) =>
        favoriteProjectIds.includes(project.id) || favoriteProjectIds.includes(String(project.number))
      ),
    [favoriteProjectIds]
  );

  const manualMaterials = downloads.filter((item) =>
    ['Manuais', 'Módulos Plus', 'Bônus'].includes(item.category)
  );

  const hasMaterials =
    favoriteProjects.length > 0 || savedPrompts.length > 0 || manualMaterials.length > 0;

  return (
    <div className="page-shell">
      <div className="page-header">
        <p className="page-kicker">Meus Materiais</p>
        <h1 className="app-title">Favoritos e materiais salvos</h1>
        <p className="page-copy">
          Centralize projetos, prompts e manuais para continuar o estudo sem
          baixar arquivos soltos.
        </p>
      </div>

      {!hasMaterials ? (
        <EmptyState
          title="Nenhum material salvo"
          description="Favoritos de projetos e prompts aparecerão aqui conforme você estudar."
        />
      ) : (
        <div className="grid gap-5">
          <section className="surface-section p-4 md:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="page-kicker">Projetos</p>
                <h2 className="section-title">Projetos favoritados</h2>
              </div>
              <span className="badge">{favoriteProjects.length}</span>
            </div>

            {favoriteProjects.length === 0 ? (
              <EmptyState
                title="Nenhum projeto favorito"
                description="Use o botão Salvar nos cards da biblioteca."
              />
            ) : (
              <div className="grid gap-3 lg:grid-cols-2">
                {favoriteProjects.map((project) => (
                  <article key={project.id} className="surface-item p-4">
                    <div className="mb-2 flex flex-wrap gap-2">
                      <span className="badge badge-blue">{project.discipline}</span>
                      <span className="badge">{project.level}</span>
                    </div>
                    <h3 className="text-sm font-extrabold text-[var(--text-primary)]">
                      {project.code} · {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--text-secondary)]">
                      {project.category} · {project.files.length} arquivos
                    </p>
                    <Link href={`/app/biblioteca/${project.slug}`} className="btn-secondary mt-4">
                      Abrir projeto
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="surface-section p-4 md:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="page-kicker">Prompts</p>
                <h2 className="section-title">Prompts salvos</h2>
              </div>
              <span className="badge">{savedPrompts.length}</span>
            </div>

            {savedPrompts.length === 0 ? (
              <EmptyState
                title="Nenhum prompt salvo"
                description="Salve prompts gerados no Builder para consultá-los aqui."
              />
            ) : (
              <div className="grid gap-3 lg:grid-cols-2">
                {savedPrompts.map((prompt) => (
                  <article key={prompt.id} className="surface-item p-4">
                    <h3 className="text-sm font-extrabold text-[var(--text-primary)]">
                      {prompt.title}
                    </h3>
                    <p className="mt-2 line-clamp-4 text-sm leading-6 text-[var(--text-secondary)]">
                      {prompt.content}
                    </p>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(prompt.content)}
                      className="btn-secondary mt-4"
                    >
                      Copiar prompt
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="surface-section p-4 md:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="page-kicker">Manuais</p>
                <h2 className="section-title">Materiais de apoio</h2>
              </div>
              <span className="badge">{manualMaterials.length}</span>
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              {manualMaterials.map((item) => (
                <article key={item.id} className="surface-item p-4">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="badge badge-purple">{item.category}</span>
                    <span className="badge">{item.relatedTrail}</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
