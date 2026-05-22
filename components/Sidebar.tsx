'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '../lib/supabase/client';

type NavItem = {
  label: string;
  href: string;
  icon: string;
  match?: string[];
  adminOnly?: boolean;
};

const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: 'Estudar',
    items: [
      { label: 'Início', href: '/app', icon: '⌂' },
      { label: 'Comece Aqui', href: '/app/comecar', icon: '▶' },
      { label: 'Trilhas', href: '/app/trilhas', icon: '◫' },
      { label: 'Biblioteca Técnica', href: '/app/biblioteca', icon: '▦', match: ['/app/biblioteca', '/app/projetos'] },
      { label: 'Meus Materiais', href: '/app/materiais', icon: '◧' },
      { label: 'Evolução', href: '/app/progresso', icon: '◌' },
      { label: 'Certificados', href: '/app/perfil', icon: '◎' },
    ],
  },
  {
    label: 'Criar com IA',
    items: [
      { label: 'Prompts', href: '/app/prompts', icon: '✦' },
      { label: 'Agentes IA', href: '/app/agentes', icon: '✧' },
      { label: 'Checklists', href: '/app/checklists', icon: '✓' },
    ],
  },
  {
    label: 'Suporte',
    items: [
      { label: 'Uso responsável', href: '/app/responsabilidade', icon: '!' },
      { label: 'Módulos Plus', href: '/app/modulos-plus', icon: '◆' },
      { label: 'Downloads', href: '/app/downloads', icon: '⇩' },
    ],
  },
  {
    label: 'Administração',
    items: [
      { label: 'Usuários e financeiro', href: '/app/admin', icon: '▣', adminOnly: true },
    ],
  },
];

function matches(pathname: string, item: NavItem) {
  const patterns = item.match ?? [item.href];

  return patterns.some((pattern) => {
    if (pattern === '/app') return pathname === '/app';
    return pathname === pattern || pathname.startsWith(`${pattern}/`);
  });
}

function isAdminRole(appMetadata: Record<string, unknown> | null | undefined) {
  const role = appMetadata?.role;
  const roles = appMetadata?.roles;

  return role === 'admin' || (Array.isArray(roles) && roles.includes('admin'));
}

export default function Sidebar() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadRole() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (active) {
        setIsAdmin(isAdminRole(user?.app_metadata));
      }
    }

    loadRole().catch(() => {
      if (active) setIsAdmin(false);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <aside className="sidebar" aria-label="Navegação principal">
      <Link href="/app" className="sidebar-brand focus-ring" aria-label="Ir para o início">
        <span className="brand-mark">E</span>
        <span>
          <span className="block text-[17px] font-extrabold tracking-[0.18em] text-white">
            ENGELAB
          </span>
          <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Engenharia com IA
          </span>
        </span>
      </Link>

      <nav className="flex-1 overflow-y-auto p-4" aria-label="Seções da plataforma">
        {navGroups.map((group) => {
          const visibleItems = group.items.filter((item) => !(item.adminOnly && !isAdmin));
          if (visibleItems.length === 0) return null;

          return (
            <div key={group.label}>
              <p className="sidebar-group-label">{group.label}</p>
              <div className="space-y-1">
                {visibleItems.map((item) => {
                  const active = matches(pathname, item);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`sidebar-link ${active ? 'sidebar-link-active' : ''}`}
                      aria-current={active ? 'page' : undefined}
                    >
                      <span className="w-5 text-center text-[15px]" aria-hidden="true">
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      <div className="p-4">
        <div className="surface-card-soft p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="badge badge-cyan">Ativo</span>
            <span className="text-sm font-extrabold text-white">Plano Plus</span>
          </div>
          <p className="text-xs leading-5 text-[var(--text-secondary)]">
            Ambiente de estudo guiado. Use IA como apoio e valide aplicações reais.
          </p>
          <Link href="/app/responsabilidade" className="mt-3 inline-flex text-xs font-bold text-[var(--brand-primary-hover)]">
            Regras de uso →
          </Link>
        </div>
      </div>
    </aside>
  );
}
