/*
 * Página de trilhas de aprendizado com cards alinhados ao design system.
 */
'use client';

import { useEffect, useState } from 'react';
import { trails } from '../../../data/trails';
import { lessons } from '../../../data/lessons';

export default function TrilhasPage() {
  const [lessonsStatus, setLessonsStatus] = useState<{ [id: number]: string }>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lessonStatus');
      if (stored) {
        setLessonsStatus(JSON.parse(stored));
      }
    }
  }, []);

  function calculateProgress(trailId: number, totalLessons: number) {
    if (trailId !== 1) return 0;

    const completed = lessons
      .filter((lesson) => lesson.moduleId === 1)
      .filter((lesson) => lessonsStatus[lesson.id] === 'completed').length;

    return Math.min(1, completed / totalLessons);
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <p className="page-kicker">Trilhas</p>
        <h1 className="app-title">Aprendizado guiado</h1>
        <p className="page-copy">
          Percursos organizados para reduzir a sensação de arquivos soltos e
          orientar o estudo por etapas.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {trails.map((trail) => {
          const progress = calculateProgress(trail.id, trail.lessons);
          const progressPercent = Math.round(progress * 100);
          const available = trail.id === 1;

          return (
            <article key={trail.id} className="surface-card p-5">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="badge badge-blue">{trail.level}</span>
                <span className="badge">{trail.lessons} aulas</span>
                {!available && <span className="badge badge-purple">Em breve</span>}
              </div>

              <h2 className="section-title">{trail.title}</h2>
              <p className="section-copy mt-2">{trail.description}</p>

              <div className="meta-row mt-4">
                <span>{trail.estimatedMinutes} min</span>
                <span className="meta-dot" />
                <span>Progresso: {progressPercent}%</span>
              </div>

              <div className="progress-track mt-4">
                <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>

              <a
                href={available ? '/app/comecar' : '#'}
                className={`mt-5 ${available ? 'btn-primary' : 'btn-secondary pointer-events-none opacity-60'}`}
                aria-disabled={!available}
              >
                {available ? 'Continuar trilha' : 'Indisponível'}
              </a>
            </article>
          );
        })}
      </div>
    </div>
  );
}
