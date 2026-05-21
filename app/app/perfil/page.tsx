'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import Toast from '../../../components/ui/Toast';

interface StudentProfile {
  fullName: string;
  cpf: string;
  address: string;
  birthDate: string;
  profession: string;
}

const emptyProfile: StudentProfile = {
  fullName: '',
  cpf: '',
  address: '',
  birthDate: '',
  profession: '',
};

const fields: Array<{
  key: keyof StudentProfile;
  label: string;
  type?: string;
  placeholder: string;
}> = [
  { key: 'fullName', label: 'Nome completo', placeholder: 'Nome do aluno' },
  { key: 'cpf', label: 'CPF', placeholder: '000.000.000-00' },
  { key: 'address', label: 'Endereço', placeholder: 'Rua, número, cidade e UF' },
  { key: 'birthDate', label: 'Data de nascimento', type: 'date', placeholder: '' },
  { key: 'profession', label: 'Profissão', placeholder: 'Engenheiro, estudante, arquiteto...' },
];

function readProfile() {
  try {
    return JSON.parse(localStorage.getItem('studentProfile') || 'null') as StudentProfile | null;
  } catch {
    return null;
  }
}

export default function PerfilPage() {
  const [profile, setProfile] = useState<StudentProfile>(emptyProfile);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const stored = readProfile();
    if (stored) setProfile({ ...emptyProfile, ...stored });
  }, []);

  const completedFields = useMemo(
    () => Object.values(profile).filter((value) => value.trim()).length,
    [profile]
  );

  const completion = Math.round((completedFields / fields.length) * 100);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2400);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('studentProfile', JSON.stringify(profile));
    showToast('Perfil salvo');
  };

  return (
    <div className="page-shell">
      <section className="surface-hero p-5 md:p-7">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div className="page-header">
            <p className="page-kicker">Perfil do aluno</p>
            <h1 className="app-title">Dados para certificados</h1>
            <p className="page-copy">
              Mantenha seus dados atualizados para emissão futura de certificados
              e identificação no histórico de evolução.
            </p>
          </div>
          <div className="surface-card-soft min-w-[180px] p-4 text-center">
            <p className="text-3xl font-extrabold text-white">{completion}%</p>
            <p className="text-xs font-semibold text-[var(--text-muted)]">perfil completo</p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <form onSubmit={handleSubmit} className="surface-card p-5">
          <div className="mb-5">
            <p className="page-kicker">Cadastro</p>
            <h2 className="section-title mt-1">Informações pessoais</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field) => {
              const isWide = field.key === 'address';

              return (
                <div key={field.key} className={isWide ? 'md:col-span-2' : ''}>
                  <label
                    htmlFor={`profile-${field.key}`}
                    className="mb-2 block text-sm font-bold text-[var(--text-primary)]"
                  >
                    {field.label}
                  </label>
                  <input
                    id={`profile-${field.key}`}
                    type={field.type ?? 'text'}
                    value={profile[field.key]}
                    onChange={(event) =>
                      setProfile({ ...profile, [field.key]: event.target.value })
                    }
                    className="input-field"
                    placeholder={field.placeholder}
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button type="submit" className="btn-primary">
              Salvar perfil
            </button>
            <Link href="/app/progresso" className="btn-secondary">
              Ver minha evolução
            </Link>
          </div>
        </form>

        <aside className="space-y-5">
          <section className="surface-card p-5">
            <h2 className="section-title">Status do certificado</h2>
            <p className="section-copy mt-2">
              Os dados do perfil serão usados no PDF de conclusão quando a etapa
              de certificação estiver ativa.
            </p>
            <div className="mt-4 grid gap-2">
              {fields.map((field) => {
                const done = Boolean(profile[field.key].trim());

                return (
                  <div key={field.key} className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold text-[var(--text-secondary)]">{field.label}</span>
                    <span className={`badge ${done ? 'badge-cyan' : 'badge-orange'}`}>
                      {done ? 'ok' : 'pendente'}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="surface-card p-5">
            <h2 className="section-title">Privacidade</h2>
            <p className="section-copy mt-2">
              Nesta versão, os dados ficam apenas neste navegador. A versão com
              Supabase deve gravar o perfil por `user_id` com RLS.
            </p>
            <Link href="/app/responsabilidade" className="btn-secondary mt-4">
              Ver termos
            </Link>
          </section>
        </aside>
      </section>

      <Toast message={toast} />
    </div>
  );
}
