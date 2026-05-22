/*
 * Evolução com foco em metas de aprendizagem e evidências.
 */
'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

interface Stats {
  lessonsCompleted: number;
  projectsStudied: number;
  promptsSaved: number;
  checklistsCompleted: number;
}

const statItems = [
  { key: 'lessonsCompleted', label: 'Aulas concluídas', icon: '▶', target: 7 },
  { key: 'projectsStudied', label: 'Projetos estudados', icon: '▦', target: 25 },
  { key: 'promptsSaved', label: 'Prompts salvos', icon: '✦', target: 10 },
  { key: 'checklistsCompleted', label: 'Checklists finalizados', icon: '✓', target: 10 },
] as const;

export default function ProgressoPage() {
  const [stats, setStats] = useState<Stats>({
    lessonsCompleted: 0,
    projectsStudied: 0,
    promptsSaved: 0,
    checklistsCompleted: 0,
  });
  const [profileName, setProfileName] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setStats({
        lessonsCompleted: parseInt(localStorage.getItem('lessonsCompleted') || '0', 10),
        projectsStudied: parseInt(localStorage.getItem('projectsStudied') || '0', 10),
        promptsSaved: parseInt(localStorage.getItem('promptsSaved') || '0', 10),
        checklistsCompleted: parseInt(localStorage.getItem('checklistsCompleted') || '0', 10),
      });

      try {
        const profile = JSON.parse(localStorage.getItem('studentProfile') || 'null') as { fullName?: string } | null;
        setProfileName(profile?.fullName ?? '');
      } catch {
        setProfileName('');
      }
    }
  }, []);

  const overallPercent = useMemo(() => {
    const total = stats.lessonsCompleted + stats.projectsStudied + stats.promptsSaved + stats.checklistsCompleted;
    return Math.min(100, Math.round((total / 52) * 100));
  }, [stats]);

  const badges: { title: string; achieved: boolean; detail: string }[] = [
    { title: 'Primeiro acesso', achieved: true, detail: 'Entrou na plataforma' },
    { title: 'Primeira aula concluída', achieved: stats.lessonsCompleted > 0, detail: 'Concluir uma aula da trilha inicial' },
    { title: 'Primeiro projeto estudado', achieved: stats.projectsStudied > 0, detail: 'Abrir e registrar um projeto-modelo' },
    { title: 'Primeiro prompt salvo', achieved: stats.promptsSaved > 0, detail: 'Salvar um prompt técnico' },
    { title: 'Primeiro checklist finalizado', achieved: stats.checklistsCompleted > 0, detail: 'Usar checklist como validação' },
  ];

  const nextGoal =
    stats.lessonsCompleted < 7
      ? 'Concluir a próxima aula da trilha inicial'
      : stats.checklistsCompleted < 1
      ? 'Finalizar pelo menos um checklist de estudo'
      : 'Escolher um projeto prático para consolidar a trilha';

  return (
    <div className="page-shell">
      <section className="surface-hero p-5 md:p-7">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="page-kicker">Evolução</p>
            <h1 className="app-title mt-2">Minha evolução</h1>
            <p className="page-copy mt-2">
              {profileName ? `${profileName}, acompanhe metas, evidências e próximos passos.` : 'Acompanhe metas, evidências e próximos passos da sua aprendizagem.'}
            </p>
          </div>
          <div className="surface-card-soft min-w-[180px] p-4 text-center">
            <p className="text-3xl font-extrabold text-white">{overallPercent}%</p>
            <p className="text-xs font-semibold text-[var(--text-muted)]">foco acumulado</p>
          </div>
        </div>
      </section>

      <section className="focus-card p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="page-kicker">Próxima meta pedagógica</p>
            <h2 className="section-title mt-1">{nextGoal}</h2>
            <p className="section-copy mt-1">
              A meta prioriza avanço real na trilha, não apenas navegação ou cliques.
            </p>
          </div>
          <Link href="/app/comecar" className="btn-primary">
            Continuar meta
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statItems.map((item) => {
          const value = stats[item.key];
          const percent = Math.min(100, Math.round((value / item.target) * 100));

          return (
            <div key={item.key} className="surface-card p-5">
              <span className="icon-tile mb-4">{item.icon}</span>
              <p className="text-3xl font-extrabold text-white">{value}</p>
              <p className="mt-1 text-sm font-semibold text-[var(--text-secondary)]">{item.label}</p>
              <div className="progress-track mt-4">
                <div className="progress-fill" style={{ width: `${percent}%` }} />
              </div>
              <p className="mt-2 text-xs font-semibold text-[var(--text-muted)]">{percent}% da meta inicial</p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
        <div className="surface-card p-5">
          <h2 className="section-title">Badges de aprendizagem</h2>
          <p className="section-copy mt-1">
            Marcos simples para reforçar continuidade e ações que deixam evidência.
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {badges.map((badge) => (
              <div key={badge.title} className="surface-item p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-extrabold text-white">{badge.title}</h3>
                  <span className={`badge ${badge.achieved ? 'badge-cyan' : ''}`}>
                    {badge.achieved ? '✓ concluído' : '○ pendente'}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">{badge.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="surface-card p-5">
          <h2 className="section-title">Certificados</h2>
          <p className="section-copy mt-2">
            A emissão em PDF depende da conclusão dos critérios, do perfil preenchido e de validação das evidências.
          </p>

          <div className="mt-5 grid gap-3 text-sm">
            <div className="flex justify-between gap-3">
              <span className="text-[var(--text-secondary)]">Trilha inicial</span>
              <strong>{stats.lessonsCompleted}/7</strong>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-[var(--text-secondary)]">Projeto prático</span>
              <strong>{stats.projectsStudied > 0 ? '1/1' : '0/1'}</strong>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-[var(--text-secondary)]">Checklist aplicado</span>
              <strong>{stats.checklistsCompleted > 0 ? '1/1' : '0/1'}</strong>
            </div>
          </div>

          <Link href="/app/perfil" className="btn-secondary mt-5 w-full">
            Completar perfil
          </Link>
        </aside>
      </section>
    </div>
  );
}
