export default function ResponsabilidadePage() {
  const terms = [
    {
      title: 'Contrato de compra',
      copy:
        'Registra as condições comerciais do estudo adquirido, incluindo acesso, escopo educacional, vigência e limites de uso dos materiais.',
    },
    {
      title: 'Termo de inscrição LGPD',
      copy:
        'Informa como dados pessoais do aluno são tratados para cadastro, acesso, suporte, progresso, certificados e comunicações necessárias.',
    },
    {
      title: 'Termos de uso da plataforma',
      copy:
        'Define regras de acesso, conduta, propriedade intelectual, uso dos prompts, restrições de compartilhamento e responsabilidades do usuário.',
    },
    {
      title: 'Responsabilidade técnica',
      copy:
        'Declara que todo conteúdo é educacional e conceitual, sem substituir projeto executivo, cálculo, laudo, ART/RRT ou validação de profissional habilitado.',
    },
  ];

  return (
    <div className="page-shell">
      <section className="surface-hero p-5 md:p-7">
        <div className="page-header">
          <p className="page-kicker">Uso responsável</p>
          <h1 className="app-title">Responsabilidade técnica</h1>
          <p className="page-copy">
            A ENGELAB oferece conteúdos educacionais e conceituais para apoiar o
            estudo de engenharia. Os materiais não substituem profissionais
            habilitados, validações técnicas ou documentos oficiais.
          </p>
        </div>
      </section>

      <section className="surface-card p-5 md:p-6">
        <h2 className="section-title">Documentos de aceite obrigatório</h2>
        <p className="section-copy mt-2">
          O aceite unificado cobre os quatro documentos abaixo e deve ficar
          vinculado ao perfil do aluno quando a persistência de perfil estiver ativa.
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {terms.map((term, index) => (
            <div key={term.title} className="surface-card-soft p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="badge badge-blue">{index + 1}</span>
                <h3 className="text-sm font-extrabold text-[var(--text-primary)]">
                  {term.title}
                </h3>
              </div>
              <p className="text-sm leading-6 text-[var(--text-secondary)]">
                {term.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-card p-5 md:p-6">
        <h2 className="section-title">Declaração resumida</h2>
        <div className="mt-4 grid gap-3">
          {[
            'Os materiais da ENGELAB servem para estudo, referência e organização conceitual.',
            'Projetos, prompts, checklists e respostas de IA exigem validação técnica independente.',
            'A plataforma não emite ART/RRT e não assume responsabilidade por decisões de obra.',
            'O aluno deve respeitar normas técnicas, legislação aplicável e orientação profissional habilitada.',
          ].map((statement) => (
            <p key={statement} className="surface-card-soft p-4 text-sm leading-6 text-[var(--text-secondary)]">
              {statement}
            </p>
          ))}
        </div>
      </section>

      <div className="legal-note">
        <span aria-hidden="true">⚠</span>
        <span>
          Use a ENGELAB para aprender, explorar e estruturar estudos. Para
          decisões que impactam segurança, funcionalidade, obra ou conformidade,
          procure profissionais habilitados.
        </span>
      </div>
    </div>
  );
}
