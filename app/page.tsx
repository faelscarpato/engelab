import Link from 'next/link';

const valueProps = [
  'Modelos prontos por disciplina',
  'Prompts técnicos organizados',
  'Apoio para estudo e apresentação',
];

const modules = [
  {
    title: 'Projetos Modelo',
    description: 'Biblioteca conceitual para consultar, estudar e adaptar com responsabilidade.',
    icon: '▦',
  },
  {
    title: 'Prompts Modulares',
    description: 'Prompts por disciplina para estruturar análises, pranchas e estudos.',
    icon: '✦',
  },
  {
    title: 'Checklists',
    description: 'Listas de revisão para reduzir esquecimento e melhorar a validação.',
    icon: '✓',
  },
  {
    title: 'Agentes IA',
    description: 'Assistentes orientados a tarefas para acelerar o raciocínio técnico.',
    icon: '◎',
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto flex min-h-[88vh] w-full max-w-6xl flex-col justify-center px-5 py-10 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="page-header">
            <Link href="/" className="mb-5 flex items-center gap-3 focus-ring">
              <span className="brand-mark !h-12 !w-12 !text-2xl">E</span>
              <span>
                <span className="block text-xl font-extrabold tracking-[0.22em] text-white">
                  ENGELAB
                </span>
                <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Biblioteca de engenharia com IA
                </span>
              </span>
            </Link>

            <p className="page-kicker">Engenharia civil + IA</p>
            <h1 className="page-title">
              Engenharia civil com modelos, prompts e IA em um só lugar.
            </h1>
            <p className="page-copy text-base md:text-lg">
              Acesse projetos conceituais, prompts técnicos e materiais de apoio
              para estudar, criar e apresentar melhor, sem perder o limite
              profissional do uso de IA.
            </p>

            <div className="grid gap-3 pt-2 sm:grid-cols-3">
              {valueProps.map((item) => (
                <div key={item} className="surface-card-soft p-3">
                  <span className="mb-2 block text-lg text-[var(--brand-primary-hover)]">✓</span>
                  <p className="text-sm font-semibold leading-5 text-[var(--text-primary)]">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <Link href="/login" className="btn-primary">
                Entrar na plataforma <span aria-hidden="true">→</span>
              </Link>
              <Link href="/recuperar-senha" className="btn-secondary">
                Recuperar senha
              </Link>
            </div>

            <div className="legal-note mt-2 max-w-xl">
              <span aria-hidden="true">⚠</span>
              <span>
                Conteúdo conceitual para estudo e referência. Não substitui
                projeto executivo, cálculo técnico, laudo, ART/RRT ou revisão de
                profissional habilitado.
              </span>
            </div>
          </div>

          <div className="surface-section p-5 md:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="page-kicker">Dashboard</p>
                <h2 className="section-title mt-1">O que você quer fazer agora?</h2>
              </div>
              <span className="badge badge-blue">v1.1</span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {modules.map((module) => (
                <div key={module.title} className="surface-item p-4">
                  <span className="icon-tile mb-4 !h-11 !w-11 !text-lg">{module.icon}</span>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    {module.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {module.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-3 rounded-2xl border border-[var(--border-default)] bg-black/10 p-4 sm:grid-cols-3">
              <div>
                <p className="text-2xl font-extrabold text-white">50</p>
                <p className="text-xs font-semibold text-[var(--text-muted)]">
                  projetos-modelo
                </p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">7+</p>
                <p className="text-xs font-semibold text-[var(--text-muted)]">
                  prompts iniciais
                </p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">IA</p>
                <p className="text-xs font-semibold text-[var(--text-muted)]">
                  apoio ao estudo
                </p>
              </div>
            </div>
          </div>
        </div>

        <section id="como-funciona" className="mt-10 surface-section p-4">
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ['01', 'Busque', 'Encontre por disciplina, nível ou tipo de material.'],
              ['02', 'Use', 'Abra modelos, copie prompts e siga checklists com ações claras.'],
              ['03', 'Revise', 'Valide o uso conceitual antes de qualquer aplicação real.'],
            ].map(([step, title, copy]) => (
              <div key={step} className="surface-item p-4">
                <p className="page-kicker">{step}</p>
                <h2 className="section-title mt-2">{title}</h2>
                <p className="section-copy mt-2">{copy}</p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
