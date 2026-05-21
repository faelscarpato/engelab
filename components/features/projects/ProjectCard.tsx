'use client';

import Link from 'next/link';
import type { EngelabProject } from '../../../lib/types/library';
import { disciplineBadgeClass, disciplineIcon } from '../../../lib/design';

interface ProjectCardProps {
  project: EngelabProject;
  saved: boolean;
  onFavorite: (id: string) => void;
  onPreview: (project: EngelabProject) => void;
}

export default function ProjectCard({ project, saved, onFavorite, onPreview }: ProjectCardProps) {
  return (
    <article className="surface-card p-4">
      <div className="grid gap-4 sm:grid-cols-[168px_1fr]">
        <div className="relative overflow-hidden rounded-[14px] border border-[var(--border-default)] bg-[var(--bg-card-soft)]">
          {project.previewImage ? (
            <img
              src={project.previewImage}
              alt={project.title}
              loading="lazy"
              className="aspect-[4/3] h-full w-full object-cover"
            />
          ) : (
            <div className="grid aspect-[4/3] place-items-center text-3xl">
              {disciplineIcon(project.discipline)}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className={disciplineBadgeClass(project.discipline)}>
              {project.discipline}
            </span>
            <span className="badge">{project.level}</span>
            <span className="badge">{project.category}</span>
          </div>

          <h2 className="text-base font-extrabold leading-snug text-[var(--text-primary)]">
            {project.code} ·{' '}
            {project.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--text-secondary)]">
            Prancha, memorial, checklist, prompt e aviso técnico servidos via GitHub raw.
          </p>

          <div className="meta-row mt-3">
            <span>Projeto {project.number}</span>
            <span className="meta-dot" />
            <span>{project.files.length} arquivos</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={`/app/biblioteca/${project.slug}`} className="btn-primary !min-h-10 !px-4">
              Abrir
            </Link>
            <button
              type="button"
              onClick={() => onPreview(project)}
              className="btn-secondary !min-h-10 !px-4"
            >
              Prévia
            </button>
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
