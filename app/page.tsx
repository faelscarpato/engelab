import Link from 'next/link';

const whatsappUrl =
  'https://wa.me/5519995466902?text=Ol%C3%A1%2C%20Rafael.%20Quero%20conhecer%20a%20ENGELAB%20e%20solicitar%20acesso%20%C3%A0%20biblioteca.';

const stats = [
  ['50', 'projetos-modelo'],
  ['IA', 'prompts aplicados'],
  ['✓', 'checklists técnicos'],
  ['LAB', 'agentes de estudo'],
];

const modules = [
  {
    code: 'MOD / 01',
    title: 'Projetos Modelo',
    description:
      'Base conceitual por disciplina para estudar soluções, organizar ideias e acelerar a estruturação inicial de materiais técnicos.',
  },
  {
    code: 'MOD / 02',
    title: 'Prompts Técnicos',
    description:
      'Comandos organizados para orientar a IA na criação de análises, estudos, pranchas conceituais e materiais de apoio.',
  },
  {
    code: 'MOD / 03',
    title: 'Checklists de Revisão',
    description:
      'Listas de conferência para reduzir esquecimentos, padronizar revisões e reforçar o uso responsável dos conteúdos.',
  },
  {
    code: 'MOD / 04',
    title: 'Agentes IA',
    description:
      'Assistentes orientados a tarefas para apoiar estudo, interpretação, organização e desenvolvimento preliminar com IA.',
  },
];

const process = [
  ['01', 'Escolha o modelo', 'Acesse a biblioteca por disciplina, nível ou finalidade do material.'],
  ['02', 'Use o prompt', 'Copie a estrutura orientada e adapte os dados ao estudo desejado.'],
  ['03', 'Gere o estudo', 'Transforme croquis, ideias e requisitos em materiais conceituais organizados.'],
  ['04', 'Revise com checklist', 'Confira limites, coerência, responsabilidade técnica e pontos de validação.'],
];

const audiences = [
  'Estudantes de engenharia civil',
  'Engenheiros e projetistas',
  'Técnicos e professores',
  'Profissionais que querem usar IA com método',
];

const packages = [
  {
    name: 'Acesso Inicial',
    tag: 'Para começar',
    items: ['Biblioteca base', 'Prompts principais', 'Checklists essenciais'],
  },
  {
    name: 'Acesso Profissional',
    tag: 'Mais indicado',
    featured: true,
    items: ['50 projetos-modelo', 'Prompts por disciplina', 'Agentes IA e trilhas de uso'],
  },
  {
    name: 'Acesso Premium',
    tag: 'Expansão',
    items: ['Módulos Plus', 'Atualizações comerciais', 'Materiais extras de apoio'],
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="mx-auto w-full max-w-7xl px-5 py-6 md:px-8 lg:px-10">
        <header className="flex flex-col gap-4 rounded-3xl border border-[var(--border-default)] bg-black/10 px-4 py-4 backdrop-blur md:flex-row md:items-center md:justify-between md:px-5">
          <Link href="/" className="flex items-center gap-3 focus-ring">
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

          <nav className="flex flex-wrap items-center gap-2 text-sm font-bold text-[var(--text-secondary)]">
            <a href="#biblioteca" className="btn-ghost">
              Biblioteca
            </a>
            <a href="#processo" className="btn-ghost">
              Como funciona
            </a>
            <Link href="/login" className="btn-secondary">
              Área do aluno
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary">
              Solicitar acesso
            </a>
          </nav>
        </header>

        <section className="grid items-center gap-10 py-14 lg:grid-cols-[1.04fr_0.96fr] lg:py-20">
          <div className="page-header max-w-3xl">
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-blue">ENGELAB v1.2 comercial</span>
              <span className="badge">50 projetos-modelo</span>
              <span className="badge">Prompts + checklists + agentes</span>
            </div>

            <p className="page-kicker mt-5">Engenharia civil + inteligência artificial</p>
            <h1 className="page-title text-[clamp(34px,6vw,68px)]">
              Transforme croquis, ideias e demandas técnicas em estudos organizados com IA.
            </h1>
            <p className="page-copy text-base md:text-lg">
              A ENGELAB reúne projetos-modelo, prompts técnicos, checklists e agentes IA
              para acelerar o aprendizado e a produção conceitual em engenharia civil,
              mantendo o limite profissional e a revisão de especialista.
            </p>

            <div className="grid gap-3 pt-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map(([value, label]) => (
                <div key={label} className="surface-card-soft p-4">
                  <p className="text-2xl font-extrabold text-white">{value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-5 sm:flex-row">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary">
                Falar com Rafael no WhatsApp <span aria-hidden="true">→</span>
              </a>
              <a href="#exemplos" className="btn-secondary">
                Ver antes e depois
              </a>
            </div>

            <p className="max-w-2xl text-sm leading-6 text-[var(--text-muted)]">
              Produto digital para estudo, organização técnica e produção preliminar.
              Não é projeto executivo automatizado.
            </p>
          </div>

          <div className="surface-hero relative p-5 md:p-6">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[rgba(17,103,255,0.2)] blur-3xl" />
            <div className="relative rounded-2xl border border-[var(--border-default)] bg-[#07101f]/90 p-4 shadow-2xl">
              <div className="mb-4 flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
                <div>
                  <p className="page-kicker">Painel da biblioteca</p>
                  <h2 className="section-title mt-1">Estudo conceitual guiado</h2>
                </div>
                <span className="badge badge-cyan">IA assistida</span>
              </div>

              <div className="grid gap-3">
                {[
                  ['Croqui de entrada', 'ideia inicial, medidas, objetivo'],
                  ['Prompt técnico', 'contexto, disciplina, nível, entrega esperada'],
                  ['Prancha conceitual', 'organização visual, notas, legenda e revisão'],
                ].map(([title, copy], index) => (
                  <div key={title} className="surface-item flex items-center gap-4 p-4">
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-2xl border border-[var(--brand-primary-border)] bg-[var(--brand-primary-soft)] text-sm font-black text-white">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-sm font-extrabold text-white">{title}</h3>
                      <p className="mt-1 text-sm leading-5 text-[var(--text-secondary)]">{copy}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-dashed border-[var(--brand-primary-border)] bg-black/20 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    Resultado esperado
                  </span>
                  <span className="text-xs font-bold text-[var(--brand-primary-hover)]">
                    revisão obrigatória
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  <span className="col-span-3 h-20 rounded-xl bg-white/[0.08]" />
                  <span className="col-span-2 h-20 rounded-xl border border-white/10 bg-white/5" />
                  <span className="col-span-2 h-12 rounded-xl border border-white/10 bg-white/5" />
                  <span className="col-span-3 h-12 rounded-xl bg-[var(--brand-primary-soft)]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="biblioteca" className="py-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="page-kicker">O que vem dentro</p>
              <h2 className="mt-2 text-3xl font-extrabold text-white md:text-4xl">
                Uma biblioteca para estudar, criar e revisar com mais método.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[var(--text-secondary)]">
              A plataforma mantém a área interna dos alunos organizada por projetos,
              prompts, checklists, trilhas, downloads e agentes IA.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {modules.map((module) => (
              <article key={module.title} className="surface-card-soft p-5">
                <p className="page-kicker">{module.code}</p>
                <h3 className="mt-4 text-xl font-extrabold text-white">{module.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                  {module.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="exemplos" className="grid gap-5 py-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="surface-section p-5 md:p-6">
            <p className="page-kicker">Antes e depois</p>
            <h2 className="mt-2 text-3xl font-extrabold text-white">
              Do rabisco técnico ao material conceitual organizado.
            </h2>
            <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
              A proposta da ENGELAB é ensinar o usuário a estruturar melhor o pensamento:
              partir de um croqui ou demanda simples, usar prompts com contexto e revisar
              o resultado com critérios técnicos.
            </p>
            <div className="mt-5 grid gap-2">
              {audiences.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-white/[0.025] p-3">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--brand-primary-soft)] text-sm font-black text-[var(--brand-primary-hover)]">
                    ✓
                  </span>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="surface-card-soft p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="page-kicker">Antes</p>
                <span className="badge">croqui</span>
              </div>
              <div className="h-72 rounded-2xl border border-dashed border-white/15 bg-[#0a1020] p-5">
                <div className="h-full rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="h-16 w-28 rotate-[-8deg] rounded-[2rem] border-2 border-white/20" />
                  <div className="mt-6 h-px w-44 rotate-[-6deg] bg-white/20" />
                  <div className="mt-7 h-px w-36 rotate-[7deg] bg-white/15" />
                  <div className="ml-10 mt-8 h-14 w-28 rounded-xl border border-white/15" />
                  <p className="mt-7 max-w-[180px] rotate-[-3deg] text-xs leading-5 text-[var(--text-muted)]">
                    medidas soltas · ideia inicial · observações rápidas
                  </p>
                </div>
              </div>
            </div>

            <div className="surface-card-soft p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="page-kicker">Depois</p>
                <span className="badge badge-blue">prancha conceitual</span>
              </div>
              <div className="h-72 rounded-2xl border border-[var(--brand-primary-border)] bg-[#081326] p-4">
                <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-black uppercase tracking-[0.16em] text-white">
                      PRJ-MODELO
                    </span>
                    <span className="text-[10px] font-bold text-[var(--text-muted)]">ENGELAB</span>
                  </div>
                  <div className="grid grid-cols-[1.3fr_0.7fr] gap-3">
                    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
                      <div className="h-20 rounded-lg border border-[var(--brand-primary-border)] bg-[var(--brand-primary-soft)]" />
                      <div className="mt-3 h-2 w-4/5 rounded-full bg-white/20" />
                      <div className="mt-2 h-2 w-2/3 rounded-full bg-white/10" />
                    </div>
                    <div className="grid gap-2">
                      <span className="rounded-lg border border-white/10 bg-white/[0.035]" />
                      <span className="rounded-lg border border-white/10 bg-white/[0.035]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="h-8 rounded-lg bg-white/10" />
                    <span className="h-8 rounded-lg bg-white/10" />
                    <span className="h-8 rounded-lg bg-[var(--brand-primary-soft)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="processo" className="py-8">
          <div className="surface-section p-5 md:p-6">
            <div className="mb-6 max-w-2xl">
              <p className="page-kicker">Método de uso</p>
              <h2 className="mt-2 text-3xl font-extrabold text-white md:text-4xl">
                Um fluxo simples para usar IA sem perder responsabilidade técnica.
              </h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {process.map(([step, title, copy]) => (
                <div key={step} className="surface-item p-5">
                  <p className="text-4xl font-black text-white/15">{step}</p>
                  <h3 className="mt-3 text-lg font-extrabold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="acesso" className="py-10">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="page-kicker">Acesso à plataforma</p>
              <h2 className="mt-2 text-3xl font-extrabold text-white md:text-4xl">
                Planos comerciais para liberar a biblioteca aos alunos.
              </h2>
            </div>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary">
              Consultar disponibilidade
            </a>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {packages.map((plan) => (
              <article
                key={plan.name}
                className={
                  plan.featured
                    ? 'surface-card border-[var(--brand-primary-border)] p-5 ring-1 ring-[var(--brand-primary-border)]'
                    : 'surface-card-soft p-5'
                }
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-extrabold text-white">{plan.name}</h3>
                  <span className={plan.featured ? 'badge badge-blue' : 'badge'}>{plan.tag}</span>
                </div>
                <ul className="mt-5 grid gap-3">
                  {plan.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]">
                      <span className="mt-1 text-[var(--brand-primary-hover)]">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-5 pb-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="legal-note !rounded-3xl !p-5 md:!p-6">
            <span aria-hidden="true" className="text-lg">⚠</span>
            <span>
              <strong className="text-white">Responsabilidade técnica:</strong> os conteúdos da
              ENGELAB são materiais conceituais para estudo, referência e produção preliminar.
              Não substituem projeto executivo, cálculo técnico, laudo, parecer, ART/RRT,
              normas aplicáveis ou revisão de profissional legalmente habilitado.
            </span>
          </div>

          <div className="surface-card-soft p-5 md:p-6">
            <p className="page-kicker">Contato</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white">Rafael Scarpato</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              Solicite acesso, tire dúvidas comerciais ou peça uma demonstração da biblioteca.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary">
                WhatsApp 19 9.9546-6902
              </a>
              <Link href="/login" className="btn-secondary">
                Entrar como aluno
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}