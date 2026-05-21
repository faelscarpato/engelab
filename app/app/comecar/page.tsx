/*
 * Trilha inicial com cards mais legíveis e status visual claro.
 */
'use client';

import { useEffect, useState } from 'react';
import DocModal from '../../../components/DocModal';
import { lessons } from '../../../data/lessons';
import type { FileType } from '../../../lib/types/library';

interface LessonStatus {
  [id: number]: 'not-started' | 'in-progress' | 'completed';
}

interface LessonDocument {
  lessonId: number;
  title: string;
  fileUrl: string;
  fileType: FileType;
}

const RAW_BASE = 'https://raw.githubusercontent.com/faelscarpato/engelab_doc/main';

function rawUrl(path: string) {
  return `${RAW_BASE}/${path.split('/').map(encodeURIComponent).join('/')}`;
}

const lessonDocuments: LessonDocument[] = [
  {
    lessonId: 1,
    title: 'Apostila Dominando a Biblioteca de 50 Projetos-Modelo',
    fileUrl: rawUrl('00_0_Manual Operacional/Apostila Dominando a Biblioteca de 50 projetos-modelo.pdf'),
    fileType: 'pdf',
  },
  {
    lessonId: 2,
    title: 'Como usar a Biblioteca',
    fileUrl: rawUrl('00_GUIA_DE_USO/01_Como_Usar_A_Biblioteca.pdf'),
    fileType: 'pdf',
  },
  {
    lessonId: 3,
    title: 'Índice da Biblioteca',
    fileUrl: rawUrl('00_GUIA_DE_USO/03_Indice_Da_Biblioteca.pdf'),
    fileType: 'pdf',
  },
  {
    lessonId: 4,
    title: 'Catálogo de Prompts Modulares',
    fileUrl: rawUrl('04_PROMPTS_MODULARES/Catalogo_De_Prompts_Modulares.pdf'),
    fileType: 'pdf',
  },
  {
    lessonId: 5,
    title: 'Prompt Base Geral',
    fileUrl: rawUrl('04_PROMPTS_MODULARES/Prompt_Base_Geral.txt'),
    fileType: 'txt',
  },
  {
    lessonId: 6,
    title: 'Checklist de Estudo Geral',
    fileUrl: rawUrl('00_GUIA_DE_USO/04_Checklist_De_Estudo_Geral.pdf'),
    fileType: 'pdf',
  },
  {
    lessonId: 7,
    title: 'Manual Oficial Biblioteca 50 Projetos',
    fileUrl: rawUrl('00_0_Manual Operacional/Manual_Oficial_Biblioteca_50_Projetos_Modelo_V02_Limpo.pdf'),
    fileType: 'pdf',
  },
];

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
  const [activeDocument, setActiveDocument] = useState<LessonDocument | null>(null);

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

  const markCompleted = (id: number) => {
    setStatusMap((prev) => {
      return { ...prev, [id]: 'completed' };
    });
  };

  const openLesson = (id: number) => {
    const document = lessonDocuments.find((item) => item.lessonId === id);

    setStatusMap((prev) => {
      if (prev[id] === 'completed') return prev;
      return { ...prev, [id]: 'in-progress' };
    });

    if (document) setActiveDocument(document);
  };

  const closeDocument = () => {
    if (activeDocument) markCompleted(activeDocument.lessonId);
    setActiveDocument(null);
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
                    onClick={() => openLesson(lesson.id)}
                    className={isCurrent ? 'btn-primary shrink-0' : 'btn-secondary shrink-0'}
                  >
                    {status === 'completed'
                      ? 'Rever'
                      : status === 'in-progress'
                      ? 'Continuar'
                      : 'Começar'}
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

      <DocModal
        isOpen={Boolean(activeDocument)}
        onClose={closeDocument}
        title={activeDocument?.title ?? 'Aula'}
        fileUrl={activeDocument?.fileUrl ?? null}
        fileType={activeDocument?.fileType ?? 'pdf'}
      />
    </div>
  );
}
