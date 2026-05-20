'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { createClient } from '../../lib/supabase/client';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/app';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError('E-mail ou senha inválidos.');
        return;
      }

      router.replace(redirectTo.startsWith('/app') ? redirectTo : '/app');
      router.refresh();
    } catch (authError) {
      setError(
        authError instanceof Error
          ? authError.message
          : 'Não foi possível entrar agora.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-3 focus-ring">
          <span className="brand-mark">E</span>
          <span>
            <span className="block text-lg font-extrabold tracking-[0.2em] text-white">
              ENGELAB
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Engenharia com IA
            </span>
          </span>
        </Link>

        <section className="surface-card p-6 sm:p-8">
          <div className="page-header mb-6 text-center">
            <p className="page-kicker">Acesso do aluno</p>
            <h1 className="app-title">Entrar</h1>
            <p className="section-copy">
              Use o e-mail cadastrado e a senha provisória enviada pela ENGELAB.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="input-field"
                placeholder="voce@email.com"
                autoComplete="email"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label htmlFor="password" className="block text-sm font-bold text-[var(--text-primary)]">
                  Senha
                </label>
                <Link href="/recuperar-senha" className="text-xs font-bold text-[var(--brand-primary-hover)] focus-ring">
                  Recuperar senha
                </Link>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="input-field"
                placeholder="Sua senha"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-[rgba(251,146,60,0.28)] bg-[rgba(251,146,60,0.10)] p-3 text-sm font-semibold text-[#ffc49e]">
                {error}
              </div>
            )}

            <div className="legal-note">
              <span aria-hidden="true">!</span>
              <span>
                O acesso é liberado manualmente pela ENGELAB após confirmação do
                pagamento. Não há criação pública de conta.
              </span>
            </div>

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="min-h-screen" />}>
      <LoginForm />
    </Suspense>
  );
}
