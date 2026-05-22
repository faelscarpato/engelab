/*
 * Trilha inicial com foco em orientação, evidência e avanço.
 */
'use client';

import { useEffect, useMemo, useState } from 'react';
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

function readStatus() {
  try {
    return JSON.parse(localStorage.getItem('lessonStatus') || '{}') as LessonStatus;
  } catch {
    return {};
  }
}

function statusLabel(status: LessonStatus[number]) {
  if (status === 'completed') return 'Concluída';
  if (status === 'in-progress') return 'Aula atual';
  return 'Não iniciada';
}

export default function ComecarPage() {
  const [statusMap, setStatusMap] = useState<LessonStatus>({});
  const [activeDocument, setActiveDocument] = useState<LessonDocument | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') setStatusMap(readStatus());
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lessonStatus', JSON.stringify(statusMap));
      const completedCount = Object.values(statusMap).filter((status) => status === 'completed').length;
      localStorage.setItem('lessonsCompleted', completedCount.toString());
    }
  }, [statusMap]);

  const introLessons = useMemo(
    () => lessons.filter((lesson) => lesson.moduleId === 1).sort((a, b) => a.orderIndex - b.orderIndex),
    []
  );

  const completed = introLessons.filter((lesson) => statusMap[lesson.id] === 'completed').length;
  const progress = Math.round((completed / introLessons.length) * 100);
  const currentLesson = introLessons.find((lesson) => statusMap[lesson.id] !== 'completed') ?? introLessons[introLessons.length - 1];

  const markCompleted = (id: number) => {
    setStatusMap((prev) => ({ ...prev, [id]: 'completed' }));
  };

  const openLesson = (id: number) => {
    const document = lessonDocuments.find((item) => item.lessonId === id);
    setStatusMap((prev) => (prev[id] === 'completed' ? prev : { ...prev, [id]: 'in-progress' }));
    if (document) setActiveDocument(document);
  };

  const closeDocument = () => {
    if (activeDocument) markCompleted(activeDocument.lessonId);
    setActiveDocument(null);
  };

  return (
    <div className="page-shell">
      <section className="grid gap-5 xl:grid-cols-[1fr_340px]">
        <div className="surface-hero p-5 md:p-7">
          <span className="badge badge-blue">Trilha</span>
          <h1 className="mt-4 text-3xl font-black tracking-[-0.03em] text-white md:text-4xl">
            Primeiros passos na ENGELAB
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--text-secondary)]">
            Seu caminho guiado para dominar a plataforma, encontrar materiais e aplicar IA na engenharia com método e responsabilidade.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['7 aulas', 'Conteúdo prático'],
              ['2h 10m', 'Duração total'],
              ['Básico', 'Nível de dificuldade'],
              ['Certificado', 'Ao concluir'],
            ].map(([title, text]) => (
              <div key={title} className="surface-card-soft p-3">
                <p className="text-sm font-extrabold text-white">{title}</p>
                <p className="mt-1 text-xs font-semibold text-[var(--text-muted)]">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="surface-card p-5">
          <p className="page-kicker">Seu progresso</p>
          <div className="mt-4 grid gap-4">
            <div className="grid h-28 w-28 place-items-center rounded-full border-[10px] border-[rgba(17,103,255,0.24)] bg-black/20">
              <span className="text-3xl font-black text-white">{progress}%</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-secondary)]">
                {completed} de {introLessons.length} aulas concluídas
              </p>
              <div className="progress-track mt-3">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <button type="button" className="btn-secondary w-full">
              Ver meu progresso
            </button>
          </div>
        </aside>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="surface-card p-5">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="page-kicker">Conteúdo da trilha</p>
              <h2 className="section-title mt-1">Siga a sequência recomendada</h2>
              <p className="section-copy mt-1">
                Cada aula abre um material, registra avanço e aproxima você de um uso mais seguro da biblioteca.
              </p>
            </div>
            <span className="badge badge-blue">{completed}/{introLessons.length} concluídas</span>
          </div>

          <div className="learning-timeline">
            {introLessons.map((lesson) => {
              const storedStatus = statusMap[lesson.id];
              const status = storedStatus ?? (lesson.id === currentLesson.id ? 'in-progress' : 'not-started');
              const isCurrent = currentLesson?.id === lesson.id && storedStatus !== 'completed';
              const locked = lesson.orderIndex > (currentLesson?.orderIndex ?? 1) + 1;

              return (
                <article
                  key={lesson.id}
                  className={`learning-row ${isCurrent ? 'learning-row-current' : ''} ${locked ? 'opacity-55' : ''}`}
                >
                  <div className={`learning-marker ${status === 'completed' ? 'learning-marker-done' : isCurrent ? 'learning-marker-current' : ''}`}>
                    {status === 'completed' ? '✓' : locked ? '🔒' : lesson.orderIndex}
                  </div>

                  <div className="surface-item flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="badge badge-blue">Aula {lesson.orderIndex}</span>
                        <span className={`badge ${status === 'completed' ? 'badge-cyan' : isCurrent ? 'badge-blue' : ''}`}>
                          {locked ? 'Bloqueada' : statusLabel(status)}
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold text-white">{lesson.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{lesson.summary}</p>
                      <p className="mt-2 text-xs font-semibold text-[var(--text-muted)]">
                        Objetivo: concluir a leitura, registrar uma dúvida e uma validação necessária.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 md:justify-end">
                      <span className="meta-row">{lesson.estimatedMinutes} min</span>
                      <button
                        type="button"
                        onClick={() => openLesson(lesson.id)}
                        disabled={locked}
                        className={isCurrent ? 'btn-primary' : 'btn-secondary'}
                      >
                        {status === 'completed' ? 'Rever' : isCurrent ? 'Continuar aula' : locked ? 'Bloqueada' : 'Começar'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="space-y-5">
          <section className="surface-card p-5">
            <h2 className="section-title">O que você vai aprender</h2>
            <div className="mt-4 grid gap-3 text-sm text-[var(--text-secondary)]">
              {[
                'Navegar pela plataforma com confiança',
                'Encontrar e aplicar conteúdos técnicos',
                'Usar agentes IA com prompts eficazes',
                'Criar registros de estudo e evidência',
                'Revisar entregas com responsabilidade',
              ].map((item) => (
                <div key={item} className="flex gap-2">
                  <span className="text-[#56E609]">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="surface-card p-5">
            <h2 className="section-title">Critérios para concluir</h2>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-[var(--text-secondary)]">Concluir todas as aulas</span>
                <strong>{completed}/{introLessons.length}</strong>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[var(--text-secondary)]">Registrar evidência mínima</span>
                <strong>1 por aula</strong>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[var(--text-secondary)]">Realizar projeto prático</span>
                <strong>0/1</strong>
              </div>
            </div>

            {currentLesson && (
              <div className="focus-card mt-5 p-4">
                <p className="page-kicker">Próxima aula</p>
                <h3 className="mt-2 text-base font-extrabold text-white">{currentLesson.title}</h3>
                <p className="mt-2 text-xs font-semibold text-[var(--text-muted)]">{currentLesson.estimatedMinutes} min</p>
                <button type="button" onClick={() => openLesson(currentLesson.id)} className="btn-primary mt-4 w-full">
                  Continuar aula
                </button>
              </div>
            )}
          </section>

          <section className="surface-card p-5">
            <h2 className="section-title">Certificado de conclusão</h2>
            <p className="section-copy mt-2">
              Liberado após conclusão da trilha, evidências mínimas e perfil preenchido.
            </p>
          </section>
        </aside>
      </section>

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
