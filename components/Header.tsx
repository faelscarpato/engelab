import Link from 'next/link';
import LogoutButton from './LogoutButton';

export default function Header() {
  return (
    <header className="topbar">
      <Link href="/app" className="flex items-center gap-3 focus-ring md:hidden">
        <span className="brand-mark !h-10 !w-10">E</span>
        <span>
          <span className="block text-sm font-extrabold tracking-[0.18em] text-white">
            ENGELAB
          </span>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Engenharia com IA
          </span>
        </span>
      </Link>

      <div className="hidden md:block">
        <p className="page-kicker">Biblioteca técnica</p>
        <p className="text-sm font-semibold text-[var(--text-secondary)]">
          Busque, use, gere, salve e continue estudando.
        </p>
      </div>

      <nav className="ml-auto flex items-center gap-2 text-sm">
        <Link href="/app/perfil" className="btn-ghost hidden sm:inline-flex">
          Perfil
        </Link>
        <Link href="/app/responsabilidade" className="btn-ghost hidden sm:inline-flex">
          Uso responsável
        </Link>
        <LogoutButton />
      </nav>
    </header>
  );
}
