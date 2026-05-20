/*
 * Página de progresso alinhada ao design system.
 */
'use client';

import { useEffect, useState } from 'react';

interface Stats {
  lessonsCompleted: number;
  projectsStudied: number;
  promptsSaved: number;
  checklistsCompleted: number;
}

const statItems = [
  { key: 'lessonsCompleted', label: 'Aulas concluídas', icon: '▶' },
  { key: 'projectsStudied', label: 'Projetos estudados', icon: '▦' },
  { key: 'promptsSaved', label: 'Prompts salvos', icon: '✦' },
  { key: 'checklistsCompleted', label: 'Checklists finalizados', icon: '✓' },
] as const;

export default function ProgressoPage() {
  const [stats, setStats] = useState<Stats>({
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

  const badges: { title: string; achieved: boolean }[] = [
    { title: 'Primeiro acesso', achieved: true },
    { title: 'Primeiro projeto estudado', achieved: stats.projectsStudied > 0 },
    { title: 'Primeiro prompt salvo', achieved: stats.promptsSaved > 0 },
    { title: 'Primeira trilha concluída', achieved: stats.lessonsCompleted >= 7 },
    { title: 'Primeiro checklist finalizado', achieved: stats.checklistsCompleted > 0 },
  ];

  const totalActivity =
    stats.lessonsCompleted + stats.projectsStudied + stats.promptsSaved + stats.checklistsCompleted;
  const overallPercent = Math.min(100, Math.round((totalActivity / 20) * 100));

  return (
    <div className="page-shell">
      <section className="surface-hero p-5 md:p-7">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div className="page-header">
            <p className="page-kicker">Perfil</p>
            <h1 className="app-title">Minha evolução</h1>
            <p className="page-copy">
              Acompanhe atividades concluídas e marcos de uso da plataforma.
            </p>
          </div>
          <div className="surface-card-soft min-w-[180px] p-4 text-center">
            <p className="text-3xl font-extrabold text-white">{overallPercent}%</p>
            <p className="text-xs font-semibold text-[var(--text-muted)]">
              foco acumulado
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statItems.map((item) => (
          <div key={item.key} className="surface-card p-5">
            <span className="icon-tile mb-4">{item.icon}</span>
            <p className="text-3xl font-extrabold text-white">{stats[item.key]}</p>
            <p className="mt-1 text-sm font-semibold text-[var(--text-secondary)]">
              {item.label}
            </p>
          </div>
        ))}
      </section>

      <section className="surface-card p-5">
        <h2 className="section-title">Badges</h2>
        <p className="section-copy mt-1">
          Marcos simples para sinalizar evolução e incentivar continuidade.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          {badges.map((badge) => (
            <span
              key={badge.title}
              className={`badge ${badge.achieved ? 'badge-cyan' : ''}`}
            >
              {badge.achieved ? '✓' : '○'} {badge.title}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
