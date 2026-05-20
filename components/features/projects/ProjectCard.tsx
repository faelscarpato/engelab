'use client';

import Link from 'next/link';
import { Project } from '../../../data/projects';
import { disciplineBadgeClass, disciplineIcon } from '../../../lib/design';

interface ProjectCardProps {
  project: Project;
  saved: boolean;
  onFavorite: (id: number) => void;
}

export default function ProjectCard({ project, saved, onFavorite }: ProjectCardProps) {
  return (
    <article className="surface-card p-4">
      <div className="flex gap-4">
        <div className="icon-tile mt-1">{disciplineIcon(project.discipline)}</div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className={disciplineBadgeClass(project.discipline)}>
              {project.discipline}
            </span>
            <span className="badge">{project.level}</span>
            <span className="badge">{project.estimatedMinutes} min</span>
          </div>

          <h2 className="text-base font-extrabold leading-snug text-[var(--text-primary)]">
            {project.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--text-secondary)]">
            {project.description}
          </p>

          <div className="meta-row mt-3">
            <span>Projeto {project.projectNumber}</span>
            <span className="meta-dot" />
            <span>{project.files.length} arquivos</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={`/app/projetos/${project.slug}`} className="btn-primary !min-h-10 !px-4">
              Abrir
            </Link>
            <Link href={`/app/projetos/${project.slug}`} className="btn-secondary !min-h-10 !px-4">
              Prévia
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
      </div>
    </article>
  );
}
