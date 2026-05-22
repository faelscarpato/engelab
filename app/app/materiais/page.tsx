'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import EmptyState from '../../../components/ui/EmptyState';
import { downloads } from '../../../data/downloads';
import { engelabProjects } from '../../../lib/data/engelab-projects';

type SavedPrompt = {
  id: number;
  title: string;
  content: string;
};

function readJsonArray<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T[]) : [];
  } catch {
    return [];
  }
}

const fallbackPrompts: SavedPrompt[] = [
  {
    id: 101,
    title: 'Prompt hidrossanitário',
    content: 'Crie um estudo conceitual de instalação hidrossanitária para uma residência de 150 m², identificando demanda, dimensionamento e pontos de consumo.',
  },
];

const quickLinks = [
  ['Explorar trilhas', 'Continuar aprendendo', '/app/trilhas'],
  ['Buscar materiais', 'Encontrar conteúdos salvos', '/app/biblioteca'],
  ['Meus certificados', 'Ver conquistas', '/app/perfil'],
  ['Histórico de estudos', 'Retomar de onde parou', '/app/progresso'],
];

export default function MateriaisPage() {
  const [favoriteProjectIds, setFavoriteProjectIds] = useState<string[]>([]);
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);

  useEffect(() => {
    setFavoriteProjectIds(readJsonArray<string | number>('favoriteProjects').map(String));
    const storedPrompts = readJsonArray<SavedPrompt>('myPrompts');
    setSavedPrompts(storedPrompts.length ? storedPrompts : fallbackPrompts);
  }, []);

  const favoriteProjects = useMemo(() => {
    const result = engelabProjects.filter((project) =>
      favoriteProjectIds.includes(project.id) || favoriteProjectIds.includes(String(project.number))
    );
    return result.length ? result.slice(0, 5) : engelabProjects.slice(0, 5);
  }, [favoriteProjectIds]);

  const manualMaterials = downloads
    .filter((item) => ['Manuais', 'Módulos Plus', 'Bônus'].includes(item.category))
    .slice(0, 3);

  const curatedMaterials = [
    { title: 'Checklist de estudo geral', tag: 'Checklist', href: '/app/checklists' },
    { title: 'Manual de uso responsável de IA', tag: 'Manual', href: '/app/responsabilidade' },
    { title: 'Primeiros passos na ENGELAB', tag: 'Trilha', href: '/app/comecar' },
  ];

  const copyPrompt = (content: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(content);
    }
  };

  return (
    <div className="page-shell">
      <section className="grid gap-5 xl:grid-cols-[1fr_auto] xl:items-end">
        <div>
          <p className="page-kicker">Meus materiais</p>
          <h1 className="app-title mt-2">Sua mesa de estudos organizada</h1>
          <p className="page-copy mt-2">
            Acesse projetos, prompts, manuais e materiais curados sem perder o fio da aprendizagem.
          </p>
        </div>
        <Link href="/app/trilhas" className="btn-primary">
          Continuar estudando
        </Link>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Projetos favoritados', favoriteProjects.length, '▦'],
          ['Prompts salvos', savedPrompts.length, '✦'],
          ['Manuais e guias', manualMaterials.length, '◧'],
          ['Materiais curados', curatedMaterials.length, '✓'],
        ].map(([label, count, icon]) => (
          <article key={label} className="surface-card p-5">
            <span className="icon-tile mb-4">{icon}</span>
            <h2 className="text-sm font-extrabold text-white">{label}</h2>
            <p className="mt-2 text-3xl font-black text-white">{count}</p>
            <Link href="/app/materiais" className="mt-2 inline-flex text-xs font-bold text-[var(--brand-primary-hover)]">
              Ver todos →
            </Link>
          </article>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_280px]">
        <div className="space-y-5">
          <section className="surface-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="page-kicker">Projetos favoritados</p>
                <h2 className="section-title mt-1">Referências para continuar estudando</h2>
              </div>
              <Link href="/app/biblioteca" className="btn-ghost">Ver todos</Link>
            </div>

            {favoriteProjects.length === 0 ? (
              <EmptyState
                title="Nenhum projeto favorito"
                description="Use o botão salvar nos cards da biblioteca para montar sua coleção."
              />
            ) : (
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                {favoriteProjects.map((project) => (
                  <Link key={project.id} href={`/app/biblioteca/${project.slug}`} className="surface-item overflow-hidden">
                    <div className="h-28 bg-[var(--brand-primary-soft)]">
                      {project.previewImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={project.previewImage} alt="" className="h-full w-full object-cover opacity-75" />
                      ) : (
                        <div className="grid h-full place-items-center text-3xl">▦</div>
                      )}
                    </div>
                    <div className="p-3">
                      <span className="badge badge-blue">{project.discipline}</span>
                      <h3 className="mt-2 line-clamp-2 text-sm font-extrabold text-white">{project.title}</h3>
                      <p className="mt-1 text-xs text-[var(--text-muted)]">Salvo para estudo</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          <section className="surface-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="page-kicker">Prompts salvos</p>
                <h2 className="section-title mt-1">Comandos prontos para reaproveitar</h2>
              </div>
              <Link href="/app/prompts" className="btn-ghost">Criar prompt</Link>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {savedPrompts.slice(0, 4).map((prompt) => (
                <article key={prompt.id} className="surface-item p-4">
                  <span className="badge badge-purple">Prompt</span>
                  <h3 className="mt-3 line-clamp-2 text-sm font-extrabold text-white">{prompt.title}</h3>
                  <p className="mt-2 line-clamp-4 text-xs leading-5 text-[var(--text-secondary)]">{prompt.content}</p>
                  <div className="mt-4 flex gap-2">
                    <button type="button" onClick={() => copyPrompt(prompt.content)} className="btn-secondary !min-h-9 !px-3 !text-xs">
                      Copiar
                    </button>
                    <Link href="/app/prompts" className="btn-secondary !min-h-9 !px-3 !text-xs">
                      Abrir
                    </Link>
                  </div>
                </article>
              ))}
              <Link href="/app/prompts" className="surface-item grid min-h-[180px] place-items-center border-dashed p-4 text-center">
                <span>
                  <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-white/[0.04] text-2xl">+</span>
                  <span className="block text-sm font-extrabold text-white">Salvar novo prompt</span>
                  <span className="mt-1 block text-xs leading-5 text-[var(--text-secondary)]">
                    Use um prompt e salve aqui para acessar depois.
                  </span>
                </span>
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-[var(--text-muted)]">
              <span>Ações rápidas:</span>
              <span>Copiar prompt</span>
              <span>Abrir no chat</span>
              <span>Remover dos salvos</span>
            </div>
          </section>

          <div className="grid gap-5 xl:grid-cols-2">
            <section className="surface-card p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="section-title">Manuais e guias salvos</h2>
                <Link href="/app/downloads" className="btn-ghost">Ver todos</Link>
              </div>
              {manualMaterials.length === 0 ? (
                <EmptyState title="Nenhum manual salvo" description="Quando encontrar um manual útil, salve aqui." />
              ) : (
                <div className="grid gap-3">
                  {manualMaterials.map((item) => (
                    <article key={item.id} className="surface-item p-4">
                      <span className="badge badge-purple">{item.category}</span>
                      <h3 className="mt-2 text-sm font-extrabold text-white">{item.title}</h3>
                      <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">{item.description}</p>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section className="surface-card p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="section-title">Materiais curados</h2>
                <Link href="/app/trilhas" className="btn-ghost">Ver todos</Link>
              </div>
              <div className="grid gap-3">
                {curatedMaterials.map((item) => (
                  <Link key={item.title} href={item.href} className="surface-item flex items-center justify-between gap-3 p-4">
                    <span>
                      <span className="badge badge-blue">{item.tag}</span>
                      <span className="mt-2 block text-sm font-extrabold text-white">{item.title}</span>
                    </span>
                    <span className="text-[var(--brand-primary-hover)]">→</span>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>

        <aside className="space-y-5">
          <section className="surface-card p-5">
            <h2 className="section-title">Acesso rápido</h2>
            <div className="mt-4 grid gap-3">
              {quickLinks.map(([title, text, href]) => (
                <Link key={title} href={href} className="surface-item p-3">
                  <span className="block text-sm font-extrabold text-white">{title}</span>
                  <span className="mt-1 block text-xs text-[var(--text-secondary)]">{text}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="surface-card p-5">
            <p className="page-kicker">Dica ENGELAB</p>
            <h2 className="section-title mt-1">Organize por objetivo</h2>
            <p className="section-copy mt-2">
              Separe materiais por estudo, projeto, disciplina e validação. Assim, cada item salvo ajuda a próxima ação.
            </p>
          </section>
        </aside>
      </section>
    </div>
  );
}
