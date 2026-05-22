import DocTree from '../../../components/DocTree';
import { docTree } from '../../../lib/data/doc-tree';

export default function TrilhasPage() {
  return (
    <div className="page-shell">
      <section className="surface-hero p-5 md:p-7">
        <p className="page-kicker">Biblioteca técnica › Trilhas</p>
        <h1 className="app-title mt-2">Árvore de documentos guiados</h1>
        <p className="page-copy mt-2">
          Navegue por um roteiro hierárquico que conecta primeiros passos, prompts modulares,
          documentos da biblioteca e projetos-modelo. A ordem sugerida reduz dispersão e mantém o foco do aluno.
        </p>
      </section>

      <DocTree nodes={docTree} />
    </div>
  );
}
