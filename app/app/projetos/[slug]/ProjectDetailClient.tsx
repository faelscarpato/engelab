'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { projects } from '../../../../data/projects';
import { checklists } from '../../../../data/checklists';
import { disciplineBadgeClass, disciplineIcon } from '../../../../lib/design';

export default function ProjectDetailClient({ slug }: { slug: string }) {
  const project = projects.find((item) => item.slug === slug);

  useEffect(() => {
    if (project && typeof window !== 'undefined') {
      const studied = JSON.parse(
        localStorage.getItem('studiedProjects') || '[]'
      ) as number[];

      if (!studied.includes(project.id)) {
        studied.push(project.id);
        localStorage.setItem('studiedProjects', JSON.stringify(studied));

        const currentCount = parseInt(
          localStorage.getItem('projectsStudied') || '0',
          10
        );

        localStorage.setItem('projectsStudied', (currentCount + 1).toString());
      }
    }
  }, [project]);

  if (!project) {
    return (
      <div className="empty-state">
        <h1 className="section-title">Projeto não encontrado</h1>
        <p className="section-copy mx-auto mt-2 max-w-md">
          O item pode ter sido removido ou o link pode estar incorreto.
        </p>
        <Link href="/app/biblioteca" className="btn-primary mt-5">
          Voltar para projetos
        </Link>
      </div>
    );
  }

  const checklist = checklists.find((item) => item.id === project.checklist);

  const handleCopyPrompt = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(project.recommendedPrompt);
      alert('Prompt copiado!');
    }
  };

  return (
    <div className="page-shell">
      <section className="surface-hero p-5 md:p-7">
        <div className="grid gap-5 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <span className="icon-tile !h-16 !w-16 !text-3xl">
            {disciplineIcon(project.discipline)}
          </span>

          <div className="page-header">
            <div className="flex flex-wrap gap-2">
              <span className={disciplineBadgeClass(project.discipline)}>
                {project.discipline}
              </span>
              <span className="badge">{project.level}</span>
              <span className="badge">{project.estimatedMinutes} min</span>
            </div>
            <h1 className="app-title">
              {project.projectNumber}. {project.title}
            </h1>
            <p className="page-copy">{project.description}</p>
          </div>

          <Link href="/app/biblioteca" className="btn-secondary">
            ← Biblioteca
          </Link>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="surface-card p-5">
          <h2 className="section-title">Como estudar este projeto</h2>
          <p className="section-copy mt-2">
            Utilize os arquivos como referência conceitual, leia o objetivo de
            aprendizagem e siga a checklist para revisar respostas de IA.
          </p>

          <div className="mt-5 grid gap-3">
            <div className="surface-card-soft p-4">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                Objetivo de aprendizagem
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {project.learningGoal}
              </p>
            </div>

            <div className="surface-card-soft p-4">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                Arquivos disponíveis
              </p>
              <ul className="mt-3 grid gap-2">
                {project.files.map((file) => (
                  <li key={file} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="badge">PDF</span>
                    <span>{file}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-card-soft p-4">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                Desafio prático
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {project.challenge}
              </p>
            </div>
          </div>
        </section>

        <aside className="space-y-5">
          <section className="surface-card p-5">
            <h2 className="section-title">Prompt recomendado</h2>
            <p className="section-copy mt-2">
              Use como ponto de partida e adapte ao contexto real do estudo.
            </p>

            <div className="surface-card-soft mt-4 p-4">
              <p className="whitespace-pre-line text-sm leading-6 text-[var(--text-secondary)]">
                {project.recommendedPrompt}
              </p>
            </div>

            <button type="button" onClick={handleCopyPrompt} className="btn-primary mt-4 w-full">
              Copiar prompt
            </button>
          </section>

          {checklist && (
            <section className="surface-card p-5">
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="badge badge-purple">Checklist</span>
                <span className="badge">{checklist.items.length} itens</span>
              </div>

              <h2 className="section-title">{checklist.title}</h2>
              <ul className="mt-4 space-y-3">
                {checklist.items.slice(0, 5).map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]">
                    <span className="text-[var(--brand-primary-hover)]">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/app/checklists" className="btn-secondary mt-5 w-full">
                Abrir checklist completa
              </Link>
            </section>
          )}
        </aside>
      </div>

      <div className="legal-note">
        <span aria-hidden="true">!</span>
        <span>
          Este material é educacional, conceitual e de apoio ao estudo. Não
          substitui projeto executivo, cálculo técnico, laudo, ART/RRT ou revisão
          de profissional habilitado.
        </span>
      </div>
    </div>
  );
}
