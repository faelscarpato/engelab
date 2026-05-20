/*
 * Trilha inicial com cards mais legíveis e status visual claro.
 */
'use client';

import { useEffect, useState } from 'react';
import { lessons } from '../../../data/lessons';

interface LessonStatus {
  [id: number]: 'not-started' | 'in-progress' | 'completed';
}

function statusLabel(status: LessonStatus[number]) {
  if (status === 'completed') return 'Concluída';
  if (status === 'in-progress') return 'Em andamento';
  return 'Não iniciada';
}

function statusClass(status: LessonStatus[number]) {
  if (status === 'completed') return 'badge badge-cyan';
  if (status === 'in-progress') return 'badge badge-yellow';
  return 'badge';
}

export default function ComecarPage() {
  const [statusMap, setStatusMap] = useState<LessonStatus>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lessonStatus');
      if (stored) {
        setStatusMap(JSON.parse(stored));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lessonStatus', JSON.stringify(statusMap));
      const completedCount = Object.values(statusMap).filter(
        (status) => status === 'completed'
      ).length;
      localStorage.setItem('lessonsCompleted', completedCount.toString());
    }
  }, [statusMap]);

  const handleToggle = (id: number) => {
    setStatusMap((prev) => {
      const current = prev[id] || 'not-started';
      const next =
        current === 'not-started'
          ? 'in-progress'
          : current === 'in-progress'
          ? 'completed'
          : 'completed';

      return { ...prev, [id]: next };
    });
  };

  const introLessons = lessons
    .filter((lesson) => lesson.moduleId === 1)
    .sort((a, b) => a.orderIndex - b.orderIndex);

  const completed = introLessons.filter(
    (lesson) => statusMap[lesson.id] === 'completed'
  ).length;
  const currentLesson =
    introLessons.find((lesson) => statusMap[lesson.id] !== 'completed') ??
    introLessons[introLessons.length - 1];

  return (
    <div className="page-shell">
      <section className="surface-hero p-5 md:p-7">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div className="page-header">
            <p className="page-kicker">Comece aqui</p>
            <h1 className="app-title">Primeiros passos na ENGELAB</h1>
            <p className="page-copy">
              Uma trilha curta para entender como usar os modelos, prompts e
              checklists com método e responsabilidade.
            </p>
          </div>
          <div className="surface-card-soft min-w-[180px] p-4 text-center">
            <p className="text-3xl font-extrabold text-white">
              {completed}/{introLessons.length}
            </p>
            <p className="text-xs font-semibold text-[var(--text-muted)]">
              aulas concluídas
            </p>
          </div>
        </div>
      </section>

      <div className="roadmap">
        {introLessons.map((lesson) => {
          const status = statusMap[lesson.id] || 'not-started';
          const isCurrent = currentLesson?.id === lesson.id && status !== 'completed';
          const isNext = lesson.orderIndex === (currentLesson?.orderIndex ?? 0) + 1;

          return (
            <article key={lesson.id} className="roadmap-item">
              <div
                className={`roadmap-marker ${
                  status === 'completed' || isCurrent ? 'roadmap-marker-active' : ''
                }`}
              >
                {status === 'completed' ? '✓' : lesson.orderIndex}
              </div>

              <div className="surface-item p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="badge badge-blue">Aula {lesson.orderIndex}</span>
                      <span className={statusClass(status)}>
                        {isCurrent ? 'Aula atual' : statusLabel(status)}
                      </span>
                      {isNext && <span className="badge">Próximo passo</span>}
                    </div>
                    <h2 className="text-base font-extrabold text-[var(--text-primary)]">
                      {lesson.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                      {lesson.summary}
                    </p>
                    <p className="mt-2 text-xs font-semibold text-[var(--text-muted)]">
                      {lesson.estimatedMinutes} min de estudo
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggle(lesson.id)}
                    className={isCurrent ? 'btn-primary shrink-0' : 'btn-secondary shrink-0'}
                  >
                    {status === 'completed'
                      ? 'Rever'
                      : status === 'in-progress'
                      ? 'Concluir'
                      : 'Iniciar'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}

        {['Prompts técnicos do zero', 'Documentação técnica com IA'].map((title, index) => (
          <article key={title} className="roadmap-item opacity-75">
            <div className="roadmap-marker">{introLessons.length + index + 1}</div>
            <div className="surface-item p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="badge badge-purple">Em breve</span>
                    <span className="badge">Roadmap compacto</span>
                  </div>
                  <h2 className="text-sm font-extrabold text-[var(--text-primary)]">{title}</h2>
                </div>
                <span className="btn-secondary pointer-events-none !min-h-10 opacity-70">
                  Bloqueado
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
