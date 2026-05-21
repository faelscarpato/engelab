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
      {
        label: 'Projetos Modelo',
        href: '/app/biblioteca',
        icon: '▦',
        match: ['/app/biblioteca', '/app/projetos'],
      },
      { label: 'Meus Materiais', href: '/app/materiais', icon: '◧' },
    ],
  },
  {
    label: 'Criar',
    items: [
      { label: 'Prompts', href: '/app/prompts', icon: '✦' },
      { label: 'Agentes IA', href: '/app/agentes', icon: '◎' },
    ],
  },
  {
    label: 'Revisar',
    items: [{ label: 'Checklists', href: '/app/checklists', icon: '✓' }],
  },
  {
    label: 'Conta',
    items: [
      { label: 'Perfil do Aluno', href: '/app/perfil', icon: '◉' },
      { label: 'Minha evolução', href: '/app/progresso', icon: '◌' },
      { label: 'Administração', href: '/app/admin', icon: '▣', adminOnly: true },
      { label: 'Módulos Plus', href: '/app/modulos-plus', icon: '◆' },
      { label: 'Responsabilidade', href: '/app/responsabilidade', icon: '!' },
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
      <Link href="/app" className="sidebar-brand focus-ring">
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
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="sidebar-group-label">{group.label}</p>
            <div className="space-y-1">
              {group.items.map((item) => {
                if (item.adminOnly && !isAdmin) return null;

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
        ))}
      </nav>

      <div className="p-4">
        <div className="legal-note">
          <span aria-hidden="true">⚠</span>
          <span>
            Conteúdo conceitual para estudo e referência. Não substitui profissional
            habilitado.
          </span>
        </div>
      </div>
    </aside>
  );
}
