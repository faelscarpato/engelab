import DocTree from '../../../components/DocTree';
import { docTree } from '../../../lib/data/doc-tree';

export default function TrilhasPage() {

  return (
    <div className="page-shell">
      <div className="page-header">
        <p className="page-kicker">Trilhas</p>
        <h1 className="app-title">Árvore de Documentos</h1>
        <p className="page-copy">
          Navegue por um roteiro hierárquico que conecta primeiros passos,
          prompts modulares e os arquivos da Biblioteca 50 Projetos.
        </p>
      </div>

      <DocTree nodes={docTree} />
    </div>
  );
}
