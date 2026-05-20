'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { createClient } from '../../lib/supabase/client';

function RedefinirSenhaForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function exchangeCode() {
      setError('');

      const authError = searchParams.get('error_description');
      if (authError) {
        setError('O link de redefinição expirou ou é inválido.');
        setReady(true);
        return;
      }

      const code = searchParams.get('code');
      if (!code) {
        setReady(true);
        return;
      }

      try {
        const supabase = createClient();
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

        if (exchangeError) {
          setError('O link de redefinição expirou ou é inválido.');
        }
      } catch (exchangeError) {
        setError(
          exchangeError instanceof Error
            ? exchangeError.message
            : 'Não foi possível validar o link de redefinição.'
        );
      } finally {
        setReady(true);
      }
    }

    exchangeCode();
  }, [searchParams]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Use uma senha com pelo menos 8 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não conferem.');
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        setError('Não foi possível atualizar a senha. Solicite um novo link.');
        return;
      }

      await supabase.auth.signOut();
      setSuccess(true);
      window.setTimeout(() => router.replace('/login'), 1800);
    } catch (updateError) {
      setError(
        updateError instanceof Error
          ? updateError.message
          : 'Não foi possível atualizar a senha.'
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
            <p className="page-kicker">Nova senha</p>
            <h1 className="app-title">Definir senha</h1>
            <p className="section-copy">
              Crie uma senha permanente para continuar acessando a ENGELAB.
            </p>
          </div>

          {!ready ? (
            <div className="surface-card-soft p-4 text-center text-sm font-semibold text-[var(--text-secondary)]">
              Validando link...
            </div>
          ) : success ? (
            <div className="rounded-2xl border border-[rgba(34,211,238,0.28)] bg-[rgba(34,211,238,0.08)] p-4 text-sm font-semibold text-[#b0ffff]">
              Senha atualizada. Redirecionando para o login.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
                  Nova senha
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={8}
                  className="input-field"
                  placeholder="Mínimo 8 caracteres"
                  autoComplete="new-password"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
                  Confirmar nova senha
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                  minLength={8}
                  className="input-field"
                  placeholder="Repita a senha"
                  autoComplete="new-password"
                />
              </div>

              {error && (
                <div className="rounded-2xl border border-[rgba(251,146,60,0.28)] bg-[rgba(251,146,60,0.10)] p-3 text-sm font-semibold text-[#ffc49e]">
                  {error}
                </div>
              )}

              <button type="submit" className="btn-primary w-full" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar nova senha'}
              </button>
            </form>
          )}

          <p className="mt-5 text-center text-sm text-[var(--text-secondary)]">
            <Link href="/login" className="font-bold text-[var(--brand-primary-hover)]">
              Voltar ao login
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default function RedefinirSenhaPage() {
  return (
    <Suspense fallback={<main className="min-h-screen" />}>
      <RedefinirSenhaForm />
    </Suspense>
  );
}
