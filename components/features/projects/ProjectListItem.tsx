'use client';

import Link from 'next/link';
import { Project } from '../../../data/projects';
import { disciplineBadgeClass } from '../../../lib/design';

interface ProjectListItemProps {
  project: Project;
  saved: boolean;
  onFavorite: (id: number) => void;
}

export default function ProjectListItem({ project, saved, onFavorite }: ProjectListItemProps) {
  return (
    <article className="surface-item p-3">
      <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className={disciplineBadgeClass(project.discipline)}>
              {project.discipline}
            </span>
            <span className="badge">{project.level}</span>
            <span className="badge">{project.estimatedMinutes} min</span>
          </div>
          <h2 className="text-sm font-extrabold text-[var(--text-primary)]">
            {project.title}
          </h2>
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-[var(--text-secondary)]">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 md:justify-end">
          <Link href={`/app/projetos/${project.slug}`} className="btn-secondary !min-h-10 !px-4">
            Prévia
          </Link>
          <Link href={`/app/projetos/${project.slug}`} className="btn-primary !min-h-10 !px-4">
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
