'use client';

import Link from 'next/link';
import type { EngelabProject } from '../../../lib/types/library';
import { disciplineBadgeClass } from '../../../lib/design';

interface ProjectListItemProps {
  project: EngelabProject;
  saved: boolean;
  onFavorite: (id: string) => void;
  onPreview: (project: EngelabProject) => void;
}

export default function ProjectListItem({ project, saved, onFavorite, onPreview }: ProjectListItemProps) {
  return (
    <article className="surface-item p-3">
      <div className="grid gap-3 md:grid-cols-[96px_1fr_auto] md:items-center">
        <div className="hidden overflow-hidden rounded-[12px] border border-[var(--border-subtle)] bg-[var(--bg-card-soft)] md:block">
          {project.previewImage ? (
            <img
              src={project.previewImage}
              alt={project.title}
              loading="lazy"
              className="aspect-[4/3] h-full w-full object-cover"
            />
          ) : (
            <div className="aspect-[4/3]" />
          )}
        </div>

        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className={disciplineBadgeClass(project.discipline)}>
              {project.discipline}
            </span>
            <span className="badge">{project.level}</span>
            <span className="badge">{project.category}</span>
          </div>
          <h2 className="text-sm font-extrabold text-[var(--text-primary)]">
            {project.code} ·{' '}
            {project.title}
          </h2>
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-[var(--text-secondary)]">
            {project.files.length} arquivos em {project.sourceFolder}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 md:justify-end">
          <button
            type="button"
            onClick={() => onPreview(project)}
            className="btn-secondary !min-h-10 !px-4"
          >
            Prévia
          </button>
          <Link href={`/app/biblioteca/${project.slug}`} className="btn-primary !min-h-10 !px-4">
            Abrir
          </Link>
          <button
            type="button"
            onClick={() => onFavorite(project.id)}
            className="btn-ghost !min-h-10 !px-3"
            aria-label={saved ? 'Remover dos salvos' : 'Salvar projeto'}
            aria-pressed={saved}
          >
            {saved ? 'Salvo' : 'Salvar'}
          </button>
        </div>
      </div>
    </article>
  );
}
