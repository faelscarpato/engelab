'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createClient } from '../../lib/supabase/client';

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/redefinir-senha`;
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (resetError) {
        setError('Não foi possível enviar o e-mail de recuperação agora.');
        return;
      }

      setMessage(
        'Se esse e-mail estiver cadastrado, enviaremos um link para definir uma nova senha.'
      );
    } catch (resetError) {
      setError(
        resetError instanceof Error
          ? resetError.message
          : 'Não foi possível enviar o e-mail de recuperação agora.'
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
            <p className="page-kicker">Recuperar acesso</p>
            <h1 className="app-title">Redefinir senha</h1>
            <p className="section-copy">
              Informe o e-mail cadastrado para receber o link de alteração de senha.
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

            {message && (
              <div className="rounded-2xl border border-[rgba(34,211,238,0.28)] bg-[rgba(34,211,238,0.08)] p-3 text-sm font-semibold text-[#b0ffff]">
                {message}
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-[rgba(251,146,60,0.28)] bg-[rgba(251,146,60,0.10)] p-3 text-sm font-semibold text-[#ffc49e]">
                {error}
              </div>
            )}

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar link'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-[var(--text-secondary)]">
            Lembrou a senha?{' '}
            <Link href="/login" className="font-bold text-[var(--brand-primary-hover)]">
              Voltar ao login
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
