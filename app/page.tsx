import Link from 'next/link';

const whatsappUrl =
  'https://wa.me/5519995466902?text=Ol%C3%A1%2C%20Rafael.%20Quero%20conhecer%20a%20ENGELAB%20e%20solicitar%20acesso%20%C3%A0%20biblioteca.';

const stats = [
  ['+50', 'Projetos-modelo'],
  ['+1.000', 'Prompts técnicos'],
  ['+200', 'Checklists'],
  ['24/7', 'IA especializada'],
];

const guidedSteps = [
  ['01', 'Escolha ou crie', 'Use um modelo, trilha ou descreva sua ideia.'],
  ['02', 'Receba orientação', 'A IA organiza estrutura, referências e próximos passos.'],
  ['03', 'Estude e produza', 'Acesse materiais e registre seu progresso.'],
  ['04', 'Revise e valide', 'Use checklists e agentes para elevar qualidade.'],
  ['05', 'Exporte e evolua', 'Gere materiais e continue aprendendo.'],
];

const features = [
  {
    icon: '▦',
    title: 'Biblioteca Técnica 50+',
    text: 'Projetos, aulas, pranchas e materiais organizados por disciplina e tema.',
    href: '#biblioteca',
    label: 'Explorar biblioteca',
  },
  {
    icon: '✦',
    title: 'Prompts e Agentes IA',
    text: 'Prompts prontos e assistentes especializados para tarefas técnicas.',
    href: '#metodo',
    label: 'Ver método',
  },
  {
    icon: '✓',
    title: 'Checklists e revisões',
    text: 'Listas de verificação para revisar entregas e registrar pendências.',
    href: '#metodo',
    label: 'Entender validação',
  },
  {
    icon: '◧',
    title: 'Seus materiais',
    text: 'Favoritos, prompts, documentos e histórico em um lugar organizado.',
    href: '/login',
    label: 'Acessar área',
  },
];

const workflow = [
  ['1. Escolha', 'Selecione um modelo, trilha ou ideia.'],
  ['2. Oriente-se', 'A IA estrutura o caminho de estudo.'],
  ['3. Estude e produza', 'Transforme conteúdo em entrega conceitual.'],
  ['4. Revise e valide', 'Use checklist, limites e evidências.'],
  ['5. Continue', 'Salve, exporte e avance na trilha.'],
];

const plans = [
  {
    name: 'Acesso Inicial',
    price: 'R$ 0',
    description: 'Para conhecer o método.',
    items: ['Biblioteca base', 'Trilhas iniciais', 'Prompts principais'],
    action: 'Criar conta',
  },
  {
    name: 'Acesso Profissional',
    price: 'R$ 49',
    description: 'Para estudar e produzir com método.',
    items: ['Biblioteca completa', 'Trilhas guiadas', 'Prompts e agentes IA', 'Checklists e revisões'],
    action: 'Assinar plano',
    featured: true,
  },
  {
    name: 'Acesso Premium',
    price: 'R$ 99',
    description: 'Para uso avançado e equipes.',
    items: ['Tudo do profissional', 'Materiais extras', 'Histórico avançado', 'Suporte prioritário'],
    action: 'Falar com especialista',
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
              <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                Engenharia com IA
              </span>
            </span>
          </Link>

          <nav className="flex flex-wrap items-center gap-2 text-sm font-bold text-[var(--text-secondary)]">
            <a href="#biblioteca" className="btn-ghost">Biblioteca</a>
            <a href="#metodo" className="btn-ghost">Como funciona</a>
            <a href="#planos" className="btn-ghost">Planos</a>
            <a href="#responsavel" className="btn-ghost">Uso responsável</a>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/login" className="btn-secondary">Entrar</Link>
            <Link href="/cadastro" className="btn-primary">Começar agora</Link>
          </div>
        </header>

        <section className="grid gap-8 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-16">
          <div>
            <span className="badge badge-blue">Plataforma de estudos e produção conceitual</span>
            <h1 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.04em] text-white md:text-6xl">
              Aprendizado guiado em engenharia com IA.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
              Organize seus estudos, transforme ideias em materiais técnicos e avance com método,
              evidência e responsabilidade profissional.
            </p>

            <div className="mt-6 grid gap-3 text-sm text-[var(--text-secondary)] sm:grid-cols-2">
              {[
                ['◫', 'Trilhas guiadas por objetivo'],
                ['✦', 'IA aplicada à engenharia'],
                ['✓', 'Checklists de validação'],
                ['◧', 'Histórico e materiais salvos'],
              ].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="icon-tile !h-9 !w-9 !text-base">{icon}</span>
                  <span className="font-semibold">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/cadastro" className="btn-primary px-7">Começar gratuitamente</Link>
              <a href={whatsappUrl} className="btn-secondary px-7">Falar com especialista</a>
            </div>
            <p className="mt-3 text-xs font-semibold text-[var(--text-muted)]">
              Produto educacional. Não substitui projeto executivo, cálculo final, laudo, ART/RRT ou norma vigente.
            </p>
          </div>

          <aside className="surface-card p-5 md:p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="page-kicker">Aprendizado guiado</p>
                <h2 className="section-title mt-1">Do rascunho à entrega conceitual</h2>
              </div>
              <span className="badge badge-cyan">5 passos</span>
            </div>

            <div className="grid gap-3">
              {guidedSteps.map(([number, title, text]) => (
                <div key={number} className="surface-item flex gap-3 p-3">
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-2xl border border-[var(--brand-primary-border)] bg-[var(--brand-primary-soft)] text-xs font-black text-white">
                    {number}
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold text-white">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">{text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-dashed border-[var(--brand-primary-border)] bg-black/20 p-4">
              <p className="page-kicker">Resultado esperado</p>
              <div className="mt-3 grid grid-cols-5 gap-2">
                <span className="col-span-3 h-16 rounded-xl bg-white/[0.08]" />
                <span className="col-span-2 h-16 rounded-xl border border-white/10 bg-white/5" />
                <span className="col-span-2 h-10 rounded-xl border border-white/10 bg-white/5" />
                <span className="col-span-3 h-10 rounded-xl bg-[var(--brand-primary-soft)]" />
              </div>
              <p className="mt-3 text-xs font-semibold text-[var(--text-muted)]">
                Material organizado, com checklist e pendências técnicas explícitas.
              </p>
            </div>
          </aside>
        </section>

        <section className="grid gap-3 rounded-3xl border border-[var(--border-default)] bg-white/[0.025] p-4 md:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={label} className="flex items-center gap-3 border-[var(--border-subtle)] py-2 md:border-r last:md:border-r-0">
              <span className="icon-tile !h-10 !w-10 !text-base">✦</span>
              <div>
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-xs font-semibold text-[var(--text-muted)]">{label}</p>
              </div>
            </div>
          ))}
        </section>

        <section id="biblioteca" className="py-10">
          <div className="mb-6 grid gap-3 md:grid-cols-[1fr_0.8fr] md:items-end">
            <div>
              <p className="page-kicker">O que há dentro</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-white">
                Um ambiente para estudar, criar e revisar com menos ruído.
              </h2>
            </div>
            <p className="text-sm leading-6 text-[var(--text-secondary)]">
              Biblioteca, trilhas, agentes, prompts e checklists trabalham juntos para conduzir o aluno da consulta à evidência de aprendizagem.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <article key={feature.title} className="surface-card-soft p-5">
                <span className="icon-tile mb-4">{feature.icon}</span>
                <h3 className="text-lg font-extrabold text-white">{feature.title}</h3>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-[var(--text-secondary)]">
                  {feature.text}
                </p>
                <a href={feature.href} className="mt-4 inline-flex text-sm font-bold text-[var(--brand-primary-hover)]">
                  {feature.label} →
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="surface-card p-6">
            <p className="page-kicker">Antes</p>
            <h2 className="section-title mt-1">Sem método, o aluno se dispersa.</h2>
            <div className="mt-5 grid gap-3">
              {['Busca desorganizada por conteúdo', 'Retrabalho ao montar entregas', 'Dúvidas sem registro', 'Validação técnica esquecida'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-semibold text-[var(--text-secondary)]">
                  <span className="badge badge-orange">×</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="surface-hero p-6">
            <p className="page-kicker">Depois</p>
            <h2 className="section-title mt-1">Com ENGELAB, cada passo gera evidência.</h2>
            <div className="mt-5 grid gap-3">
              {['Próxima ação clara', 'Materiais conectados à trilha', 'Checklist de validação', 'Histórico de estudo e produção'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-semibold text-white">
                  <span className="badge badge-cyan">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="metodo" className="py-10">
          <div className="surface-card p-6">
            <div className="mb-6 text-center">
              <p className="page-kicker">Método de uso</p>
              <h2 className="mt-2 text-2xl font-black text-white">Seu fluxo prático com a ENGELAB</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-5">
              {workflow.map(([title, text], index) => (
                <div key={title} className="surface-item p-4 text-center">
                  <span className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-2xl border border-[var(--brand-primary-border)] bg-[var(--brand-primary-soft)] text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <h3 className="text-sm font-extrabold text-white">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="planos" className="pb-10">
          <div className="mb-6 text-center">
            <p className="page-kicker">Planos</p>
            <h2 className="text-3xl font-black text-white">Escolha o acesso ideal para sua jornada</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`surface-card p-6 ${plan.featured ? 'ring-1 ring-[var(--brand-primary-border)]' : ''}`}
              >
                {plan.featured && <span className="badge badge-blue mb-4">Mais escolhido</span>}
                <h3 className="text-xl font-extrabold text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">{plan.description}</p>
                <p className="mt-5 text-4xl font-black text-white">
                  {plan.price}<span className="text-sm font-bold text-[var(--text-muted)]">/mês</span>
                </p>
                <ul className="mt-5 grid gap-2 text-sm text-[var(--text-secondary)]">
                  {plan.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[#56E609]">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/cadastro" className={plan.featured ? 'btn-primary mt-6 w-full' : 'btn-secondary mt-6 w-full'}>
                  {plan.action}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <footer id="responsavel" className="grid gap-4 border-t border-[var(--border-subtle)] py-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="legal-note">
            <span aria-hidden="true">⚠</span>
            <span>
              <strong>Uso responsável:</strong> a ENGELAB apoia estudo, organização técnica e produção conceitual.
              Não substitui projeto executivo, cálculo final, laudo, ART/RRT, normas vigentes ou validação profissional.
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={whatsappUrl} className="btn-primary">WhatsApp 19 9.9546-6902</a>
            <Link href="/login" className="btn-secondary">Entrar como aluno</Link>
          </div>
        </footer>
      </section>
    </main>
  );
}
