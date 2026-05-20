/*
 * Página de Responsabilidade Técnica com leitura mais confortável.
 */
export default function ResponsabilidadePage() {
  const statements = [
    'O material fornecido tem finalidade estritamente educacional e não constitui projeto executivo ou documento técnico válido.',
    'Nenhuma resposta gerada por IA substitui o julgamento e a validação de um engenheiro civil ou arquiteto devidamente habilitado.',
    'Não emitimos ART/RRT nem assumimos responsabilidade por obras, projetos ou construções derivados do uso deste conteúdo.',
    'Qualquer adaptação de prompts ou projetos deve ser cuidadosamente revisada e validada conforme normas técnicas e legislações aplicáveis.',
    'Ao seguir checklists, você deve complementar com verificações específicas do seu contexto e buscar orientação profissional quando necessário.',
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
        <h2 className="section-title">Ao usar a plataforma, você declara entender que:</h2>

        <div className="mt-5 grid gap-3">
          {statements.map((statement, index) => (
            <div key={statement} className="surface-card-soft flex gap-3 p-4">
              <span className="badge badge-blue h-fit">{index + 1}</span>
              <p className="text-sm leading-6 text-[var(--text-secondary)]">
                {statement}
              </p>
            </div>
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
