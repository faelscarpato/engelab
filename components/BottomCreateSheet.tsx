'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';
import AccessibleDialog from './ui/AccessibleDialog';

const items = [
  { label: 'Início', href: '/app', icon: '⌂' },
  { label: 'Projetos', href: '/app/biblioteca', icon: '▦' },
  { label: 'Prompts', href: '/app/prompts', icon: '✦' },
  { label: 'Perfil', href: '/app/perfil', icon: '◉' },
];

const createActions = [
  {
    title: 'Novo projeto',
    description: 'Use um modelo técnico como ponto de partida.',
    href: '/app/biblioteca',
    icon: '▦',
  },
  {
    title: 'Gerar prompt',
    description: 'Monte um prompt técnico por disciplina.',
    href: '/app/prompts',
    icon: '✦',
  },
  {
    title: 'Analisar checklist',
    description: 'Revise uma resposta ou etapa conceitual.',
    href: '/app/checklists',
    icon: '✓',
  },
  {
    title: 'Abrir agente IA',
    description: 'Escolha um assistente para uma tarefa específica.',
    href: '/app/agentes',
    icon: '◎',
  },
];

function active(pathname: string, href: string) {
  if (href === '/app') return pathname === '/app';
  return pathname.startsWith(href);
}

export default function BottomCreateSheet() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <nav className="mobile-bottom-nav" aria-label="Navegação principal mobile">
        <Link
          href={items[0].href}
          className={`mobile-nav-link ${active(pathname, items[0].href) ? 'mobile-nav-link-active' : ''}`}
        >
          <span>{items[0].icon}</span>
          <span>{items[0].label}</span>
        </Link>
        <Link
          href={items[1].href}
          className={`mobile-nav-link ${active(pathname, items[1].href) ? 'mobile-nav-link-active' : ''}`}
        >
          <span>{items[1].icon}</span>
          <span>{items[1].label}</span>
        </Link>

        <button
          type="button"
          className="flex flex-col items-center gap-1 text-[11px] font-bold text-[var(--text-primary)] focus-ring"
          onClick={() => setOpen(true)}
          aria-label="Criar"
        >
          <span className="create-fab">+</span>
          <span>Criar</span>
        </button>

        <Link
          href={items[2].href}
          className={`mobile-nav-link ${active(pathname, items[2].href) ? 'mobile-nav-link-active' : ''}`}
        >
          <span>{items[2].icon}</span>
          <span>{items[2].label}</span>
        </Link>
        <Link
          href={items[3].href}
          className={`mobile-nav-link ${active(pathname, items[3].href) ? 'mobile-nav-link-active' : ''}`}
        >
          <span>{items[3].icon}</span>
          <span>{items[3].label}</span>
        </Link>
      </nav>

      {open && (
        <AccessibleDialog titleId="create-sheet-title" onClose={close}>
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="page-kicker">Criar com IA</p>
                <h2 id="create-sheet-title" className="section-title mt-1">
                  O que você quer fazer agora?
                </h2>
                <p className="section-copy mt-1">
                  Escolha uma ação clara para continuar sem perder contexto.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="btn-ghost !min-h-10 !px-3"
                aria-label="Fechar"
              >
                ×
              </button>
            </div>

            <div className="grid gap-3">
              {createActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="surface-card-soft flex items-center gap-3 p-3 transition hover:border-[var(--border-strong)]"
                  onClick={close}
                >
                  <span className="icon-tile !h-11 !w-11 !text-lg">{action.icon}</span>
                  <span>
                    <span className="block text-sm font-bold text-[var(--text-primary)]">
                      {action.title}
                    </span>
                    <span className="block text-xs leading-5 text-[var(--text-secondary)]">
                      {action.description}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
        </AccessibleDialog>
      )}
    </>
  );
}
