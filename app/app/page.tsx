/*
 * Dashboard inicial da área autenticada. A home prioriza tarefas
 * principais antes dos resumos de progresso, reduzindo fricção para
 * usuários recorrentes.
 */
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ProgressStats {
  lessonsCompleted: number;
  projectsStudied: number;
  promptsSaved: number;
  checklistsCompleted: number;
}

const actions = [
  {
    title: 'Buscar projeto modelo',
    description: 'Encontre referências por disciplina, nível ou tipo de prancha.',
    href: '/app/biblioteca',
    icon: '▦',
  },
  {
    title: 'Gerar prompt técnico',
    description: 'Monte ou copie prompts orientados a engenharia civil.',
    href: '/app/prompts',
    icon: '✦',
  },
  {
    title: 'Analisar checklist',
    description: 'Revise respostas e etapas com listas de validação.',
    href: '/app/checklists',
    icon: '✓',
  },
  {
    title: 'Abrir agentes IA',
    description: 'Use um agente para uma tarefa técnica específica.',
    href: '/app/agentes',
    icon: '◎',
  },
];

const disciplines = [
  { label: 'Estrutural', meta: '20 modelos', icon: '▦', className: 'badge-blue' },
  { label: 'Elétrico', meta: '10 modelos', icon: '⚡', className: 'badge-yellow' },
  { label: 'Hidrossanitário', meta: '10 modelos', icon: '💧', className: 'badge-cyan' },
];

const recentProjects = [
  { title: 'Residência térrea 70 m²', meta: 'Estrutural · Nível iniciante' },
  { title: 'Projeto elétrico 1', meta: 'Elétrica · Nível iniciante' },
  { title: 'Projeto hidrossanitário 1', meta: 'Hidrossanitário · Nível iniciante' },
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

  const focusPercent = Math.min(
    100,
    Math.round(((stats.lessonsCompleted + stats.projectsStudied + stats.promptsSaved + stats.checklistsCompleted) / 12) * 100)
  );

  return (
    <div className="page-shell">
      <section className="surface-hero p-5 md:p-7">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="page-header">
            <p className="page-kicker">Início</p>
            <h1 className="app-title">Olá, Engenheiro</h1>
            <p className="page-copy">
              Continue de onde parou ou escolha uma ferramenta para estudar com método.
            </p>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Link href="/app/comecar" className="btn-primary">
                Continuar trilha
              </Link>
              <Link href="/app/biblioteca" className="btn-secondary">
                Buscar projeto
              </Link>
              <Link href="/app/prompts" className="btn-secondary">
                Criar prompt
              </Link>
            </div>
          </div>

          <div className="surface-card-soft p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-bold text-[var(--text-primary)]">
                Seu progresso hoje
              </p>
              <span className="badge badge-blue">{focusPercent}% foco</span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xl font-extrabold text-white">{stats.projectsStudied}</p>
                <p className="text-[11px] font-semibold text-[var(--text-muted)]">
                  projetos
                </p>
              </div>
              <div>
                <p className="text-xl font-extrabold text-white">{stats.promptsSaved}</p>
                <p className="text-[11px] font-semibold text-[var(--text-muted)]">
                  prompts
                </p>
              </div>
              <div>
                <p className="text-xl font-extrabold text-white">{stats.checklistsCompleted}</p>
                <p className="text-[11px] font-semibold text-[var(--text-muted)]">
                  checklists
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
          <div className="surface-card-soft p-4">
            <p className="page-kicker">Próxima ação recomendada</p>
            <h2 className="section-title mt-2">
              Comece pela Aula 1: O que é a Biblioteca 50 Projetos-Modelo
            </h2>
            <p className="section-copy mt-2">
              Entenda o papel dos modelos conceituais antes de abrir a biblioteca completa.
            </p>
            <Link href="/app/comecar" className="btn-primary mt-4">
              Iniciar agora
            </Link>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="section-title">Atalhos secundários</h2>
              <span className="badge">{actions.length} ferramentas</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {actions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="surface-item group p-3 focus-ring"
                >
                  <div className="flex items-start gap-3">
                    <span className="icon-tile !h-10 !w-10 !text-lg transition group-hover:scale-105">
                      {action.icon}
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-[var(--text-primary)]">
                        {action.title}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-[var(--text-secondary)]">
                        {action.description}
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="section-title">Disciplinas</h2>
            <Link href="/app/biblioteca" className="btn-ghost">
              Ver todas
            </Link>
          </div>

          <div className="grid gap-3">
            {disciplines.map((discipline) => (
              <Link
                key={discipline.label}
                href={`/app/biblioteca`}
                className="surface-card-soft flex items-center justify-between gap-3 p-3"
              >
                <span className="flex items-center gap-3">
                  <span className="icon-tile !h-11 !w-11 !text-lg">{discipline.icon}</span>
                  <span>
                    <span className="block text-sm font-bold text-[var(--text-primary)]">
                      {discipline.label}
                    </span>
                    <span className="block text-xs font-semibold text-[var(--text-muted)]">
                      {discipline.meta}
                    </span>
                  </span>
                </span>
                <span className={`badge ${discipline.className}`}>Abrir</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="surface-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="section-title">Projetos recentes</h2>
            <Link href="/app/biblioteca" className="btn-ghost">
              Ver todos
            </Link>
          </div>

          <div className="grid gap-3">
            {recentProjects.map((project) => (
              <Link key={project.title} href="/app/biblioteca" className="surface-card-soft flex items-center justify-between gap-3 p-3">
                <span>
                  <span className="block text-sm font-bold text-[var(--text-primary)]">
                    {project.title}
                  </span>
                  <span className="block text-xs font-semibold text-[var(--text-muted)]">
                    {project.meta}
                  </span>
                </span>
                <span aria-hidden="true" className="text-[var(--text-muted)]">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-card p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="section-title">Comece por aqui</h2>
            <p className="section-copy mt-1">
              Trilha inicial para entender a plataforma e usar IA na engenharia
              com método e responsabilidade.
            </p>
          </div>
          <Link href="/app/comecar" className="btn-primary">
            Iniciar trilha
          </Link>
        </div>
      </section>
    </div>
  );
}
