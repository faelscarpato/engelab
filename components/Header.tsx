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

      <div className="hidden min-w-[240px] md:block">
        <p className="page-kicker">Biblioteca técnica</p>
        <p className="text-sm font-semibold text-[var(--text-secondary)]">
          Busque, use, gere, salve e continue estudando.
        </p>
      </div>

      <div className="mx-auto hidden w-full max-w-md md:block">
        <label className="sr-only" htmlFor="global-search">Buscar na biblioteca</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">⌕</span>
          <input
            id="global-search"
            className="input-field !min-h-11 !rounded-2xl !pl-10 !pr-16"
            placeholder="Buscar na biblioteca..."
            aria-label="Buscar na biblioteca"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg border border-[var(--border-default)] px-2 py-1 text-[11px] font-bold text-[var(--text-muted)]">
            ⌘ K
          </span>
        </div>
      </div>

      <nav className="ml-auto flex items-center gap-2 text-sm">
        <Link href="/app/progresso" className="btn-ghost hidden lg:inline-flex">
          Evolução
        </Link>
        <Link href="/app/responsabilidade" className="btn-ghost hidden lg:inline-flex">
          Uso responsável
        </Link>
        <Link href="/app/perfil" className="hidden items-center gap-3 rounded-2xl border border-[var(--border-default)] bg-white/[0.03] px-3 py-2 text-left lg:flex">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--brand-primary-soft)] text-sm font-extrabold text-white">
            RS
          </span>
          <span>
            <span className="block text-xs font-extrabold text-white">Rafael Scarpato</span>
            <span className="block text-[11px] font-semibold text-[var(--text-muted)]">Estudante</span>
          </span>
        </Link>
        <LogoutButton />
      </nav>
    </header>
  );
}
