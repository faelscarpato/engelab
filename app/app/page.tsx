/*
 * Dashboard focado em aprendizado guiado.
 * Regra de calor visual: a próxima ação é sempre o único P0 da tela.
 */
'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

interface ProgressStats {
  lessonsCompleted: number;
  projectsStudied: number;
  promptsSaved: number;
  checklistsCompleted: number;
}

const quickActions = [
  {
    title: 'Buscar projeto modelo',
    description: 'Encontre uma referência por disciplina ou nível.',
    href: '/app/biblioteca',
    icon: '▦',
  },
  {
    title: 'Gerar prompt técnico',
    description: 'Estruture contexto, formato e restrições.',
    href: '/app/prompts',
    icon: '✦',
  },
  {
    title: 'Analisar checklist',
    description: 'Revise limites, evidências e pendências.',
    href: '/app/checklists',
    icon: '✓',
  },
  {
    title: 'Abrir agentes IA',
    description: 'Receba apoio para uma tarefa específica.',
    href: '/app/agentes',
    icon: '✧',
  },
];

const disciplines = [
  { label: 'Estrutural', meta: '20 modelos', icon: '▦', href: '/app/biblioteca?disciplina=Estrutural' },
  { label: 'Elétrico', meta: '10 modelos', icon: '⚡', href: '/app/biblioteca?disciplina=Elétrico' },
  { label: 'Hidrossanitário', meta: '10 modelos', icon: '💧', href: '/app/biblioteca?disciplina=Hidrossanitário' },
  { label: 'Documentação', meta: 'memoriais e relatórios', icon: '◧', href: '/app/trilhas' },
  { label: 'Prompts', meta: 'engenharia com IA', icon: '✦', href: '/app/prompts' },
  { label: 'Revisão', meta: 'checklists técnicos', icon: '✓', href: '/app/checklists' },
];

const recentProjects = [
  { title: 'Residência térrea 70 m²', meta: 'Estrutural · Nível básico', href: '/app/biblioteca/residencia-terrea-70-m2' },
  { title: 'Projeto elétrico de edícula gourmet', meta: 'Elétrica · Nível básico', href: '/app/biblioteca/projeto-eletrico-de-edicula-gourmet' },
  { title: 'Projeto hidrossanitário de sobrado', meta: 'Hidrossanitário · Nível básico', href: '/app/biblioteca/projeto-hidrossanitario-de-sobrado' },
];

const savedMaterials = [
  { title: 'Prompt hidrossanitário', tag: 'Prompt', href: '/app/materiais' },
  { title: 'Manual de uso responsável de IA', tag: 'Manual', href: '/app/responsabilidade' },
  { title: 'Checklist de estudo geral', tag: 'Checklist', href: '/app/checklists' },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<ProgressStats>({
    lessonsCompleted: 0,
    projectsStudied: 0,
    promptsSaved: 0,
    checklistsCompleted: 0,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setStats({
        lessonsCompleted: parseInt(localStorage.getItem('lessonsCompleted') || '0', 10),
        projectsStudied: parseInt(localStorage.getItem('projectsStudied') || '0', 10),
        promptsSaved: parseInt(localStorage.getItem('promptsSaved') || '0', 10),
        checklistsCompleted: parseInt(localStorage.getItem('checklistsCompleted') || '0', 10),
      });
    }
  }, []);

  const focusPercent = useMemo(() => {
    const total = stats.lessonsCompleted + stats.projectsStudied + stats.promptsSaved + stats.checklistsCompleted;
    return Math.min(100, Math.round((total / 20) * 100));
  }, [stats]);

  const nextLessonLabel = stats.lessonsCompleted > 0 ? `Aula ${Math.min(stats.lessonsCompleted + 1, 7)} de 7` : 'Aula 1 de 7';

  return (
    <div className="page-shell">
      <section className="grid gap-5 xl:grid-cols-[1fr_340px]">
        <div className="surface-hero p-5 md:p-7">
          <div className="grid gap-6 lg:grid-cols-[1fr_260px] lg:items-center">
            <div>
              <p className="page-kicker">Início</p>
              <h1 className="app-title mt-2">Olá, Rafael! 👋</h1>
              <p className="page-copy mt-2">
                Continue pelo caminho recomendado. A plataforma prioriza o próximo passo para você estudar sem se perder.
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <Link href="/app/comecar" className="btn-primary">
                  Continuar de onde parei
                </Link>
                <Link href="/app/trilhas" className="btn-secondary">
                  Ver trilhas
                </Link>
              </div>
            </div>

            <div className="hidden min-h-[160px] rounded-3xl border border-[var(--border-default)] bg-[radial-gradient(circle_at_50%_40%,rgba(17,103,255,0.42),transparent_55%)] p-4 lg:block">
              <div className="h-full rounded-2xl border border-dashed border-[var(--brand-primary-border)] bg-black/10 p-4">
                <div className="mb-4 h-3 w-28 rounded-full bg-[var(--brand-primary-soft)]" />
                <div className="grid grid-cols-3 gap-2">
                  <span className="col-span-2 h-16 rounded-xl border border-white/10 bg-white/5" />
                  <span className="h-16 rounded-xl bg-white/[0.07]" />
                  <span className="h-10 rounded-xl bg-white/[0.05]" />
                  <span className="col-span-2 h-10 rounded-xl bg-[var(--brand-primary-soft)]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          {[
            ['Projetos estudados', stats.projectsStudied, '↑ 2 esta semana'],
            ['Prompts salvos', stats.promptsSaved, 'Ver prompts'],
            ['Checklists concluídos', stats.checklistsCompleted, 'Ver checklists'],
          ].map(([label, value, meta]) => (
            <div key={label} className="surface-card-soft p-4">
              <p className="text-3xl font-black text-white">{value}</p>
              <p className="mt-1 text-sm font-bold text-[var(--text-secondary)]">{label}</p>
              <p className="mt-2 text-xs font-semibold text-[var(--brand-primary-hover)]">{meta}</p>
            </div>
          ))}
        </aside>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="focus-card p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="page-kicker">Próxima ação recomendada</p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-white">
                {stats.lessonsCompleted > 0
                  ? 'Continue: biblioteca técnica e materiais salvos'
                  : 'Comece: o que é a Biblioteca 50 Projetos-Modelo'}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
                Entenda o papel dos modelos conceituais, registre evidências e use IA como apoio sem perder responsabilidade técnica.
              </p>
            </div>
            <span className="badge badge-blue">{nextLessonLabel}</span>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <div className="meta-row">
                <span>10 min de estudo</span>
                <span className="meta-dot" />
                <span>Nível iniciante</span>
                <span className="meta-dot" />
                <span>Evidência: 3 aprendizados + 1 validação</span>
              </div>
              <div className="progress-track mt-4">
                <div className="progress-fill" style={{ width: `${Math.min(100, Math.max(8, stats.lessonsCompleted * 14))}%` }} />
              </div>
            </div>
            <Link href="/app/comecar" className="btn-primary px-7">
              Continuar aula
            </Link>
          </div>
        </article>

        <aside className="surface-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="section-title">Seu progresso</h2>
            <Link href="/app/progresso" className="text-sm font-bold text-[var(--brand-primary-hover)]">
              Ver evolução →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-[120px_1fr] sm:items-center">
            <div className="mx-auto grid h-28 w-28 place-items-center rounded-full border-[10px] border-[rgba(17,103,255,0.22)] bg-black/20">
              <span className="text-3xl font-black text-white">{focusPercent}%</span>
            </div>
            <div className="grid gap-3 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-[var(--text-secondary)]">Aulas concluídas</span>
                <strong>{stats.lessonsCompleted}/7</strong>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[var(--text-secondary)]">Projetos estudados</span>
                <strong>{stats.projectsStudied}/25</strong>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[var(--text-secondary)]">Checklists concluídos</span>
                <strong>{stats.checklistsCompleted}/10</strong>
              </div>
              <p className="mt-1 text-xs font-bold text-[#ffb86b]">🔥 Sequência atual: 2 dias</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_0.7fr]">
        <div className="surface-card p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="page-kicker">Áreas de aprendizagem</p>
              <h2 className="section-title">Escolha uma disciplina quando precisar explorar</h2>
            </div>
            <Link href="/app/biblioteca" className="btn-ghost">Ver todas</Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {disciplines.map((discipline) => (
              <Link key={discipline.label} href={discipline.href} className="surface-item p-4">
                <span className="icon-tile mb-3 !h-10 !w-10 !text-base">{discipline.icon}</span>
                <h3 className="text-sm font-extrabold text-white">{discipline.label}</h3>
                <p className="mt-1 text-xs font-semibold text-[var(--text-muted)]">{discipline.meta}</p>
              </Link>
            ))}
          </div>
        </div>

        <aside className="surface-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="section-title">Atalhos rápidos</h2>
            <span className="badge">apoio</span>
          </div>
          <div className="grid gap-3">
            {quickActions.map((action) => (
              <Link key={action.title} href={action.href} className="surface-item flex items-start gap-3 p-3">
                <span className="icon-tile !h-10 !w-10 !text-base">{action.icon}</span>
                <span>
                  <span className="block text-sm font-bold text-white">{action.title}</span>
                  <span className="mt-1 block text-xs leading-5 text-[var(--text-secondary)]">{action.description}</span>
                </span>
              </Link>
            ))}
          </div>
        </aside>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <div className="surface-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="section-title">Projetos recentes</h2>
            <Link href="/app/biblioteca" className="btn-ghost">Ver todos</Link>
          </div>
          <div className="grid gap-3">
            {recentProjects.map((project) => (
              <Link key={project.title} href={project.href} className="surface-item flex items-center justify-between gap-3 p-3">
                <span>
                  <span className="block text-sm font-bold text-white">{project.title}</span>
                  <span className="block text-xs font-semibold text-[var(--text-muted)]">{project.meta}</span>
                </span>
                <span aria-hidden="true" className="text-[var(--brand-primary-hover)]">→</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="surface-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="section-title">Materiais salvos</h2>
            <Link href="/app/materiais" className="btn-ghost">Ver todos</Link>
          </div>
          <div className="grid gap-3">
            {savedMaterials.map((item) => (
              <Link key={item.title} href={item.href} className="surface-item flex items-center justify-between gap-3 p-3">
                <span>
                  <span className="block text-sm font-bold text-white">{item.title}</span>
                  <span className="mt-1 inline-flex rounded-full bg-[var(--brand-primary-soft)] px-2 py-1 text-[11px] font-bold text-[var(--brand-primary-hover)]">
                    {item.tag}
                  </span>
                </span>
                <span aria-hidden="true" className="text-[var(--brand-primary-hover)]">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-hero p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="page-kicker">Aprenda com método</p>
            <h2 className="section-title mt-1">Trilhas guiadas de aprendizado</h2>
            <p className="section-copy mt-1">
              Siga uma sequência clara com objetivos, atividades, checklists e evidências.
            </p>
          </div>
          <Link href="/app/trilhas" className="btn-primary">
            Explorar trilhas →
          </Link>
        </div>
      </section>
    </div>
  );
}
