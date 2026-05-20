export interface Project {
  id: number;
  title: string;
  slug: string;
  projectNumber: number;
  discipline: string;
  description: string;
  learningGoal: string;
  level: string;
  estimatedMinutes: number;
  files: string[];
  recommendedPrompt: string;
  checklist: string;
  relatedMaterials: string[];
  challenge: string;
}

/**
 * Coleção de 50 projetos‑modelo mockados.
 */
export const projects: Project[] = [];
// Função auxiliar para criar um projeto com parâmetros básicos
function createProject(
  id: number,
  projectNumber: number,
  title: string,
  discipline: string,
  level: string,
  estimatedMinutes: number,
  description: string
): Project {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9áàâãäåéèêëíìîïóòôõöúùûüçñ\s]/g, '')
    .replace(/\s+/g, '-');
  return {
    id,
    projectNumber,
    title,
    slug,
    discipline,
    description,
    learningGoal: `Aprender sobre ${discipline.toLowerCase()}.`,
    level,
    estimatedMinutes,
    files: ['planta.pdf', 'relatorio.pdf'],
    recommendedPrompt: `Elabore um estudo conceitual de ${discipline.toLowerCase()} para ${title}.`,
    checklist: discipline === 'Estrutural' ? 'preliminar-estrutural' : discipline === 'Elétrica' ? 'preliminar-eletrico' : discipline === 'Hidrossanitário' ? 'preliminar-hidrossanitario' : 'compatibilizacao',
    relatedMaterials: ['manual-uso-ia'],
    challenge: `Adapte o projeto ${projectNumber} para um contexto diferente.`,
  };
}
// 10 projetos estruturais
projects.push(
  createProject(1, 1, 'Residência térrea 70 m²', 'Estrutural', 'Iniciante', 60, 'Projeto conceitual de estrutura para residência térrea de 70 m².'),
  createProject(2, 2, 'Residência térrea 100 m²', 'Estrutural', 'Iniciante', 70, 'Projeto conceitual de estrutura para residência térrea de 100 m².'),
  createProject(3, 3, 'Sobrado 120 m²', 'Estrutural', 'Intermediário', 80, 'Estudo conceitual de estrutura para sobrado de 120 m².'),
  createProject(4, 4, 'Sobrado 180 m²', 'Estrutural', 'Intermediário', 90, 'Estudo conceitual de estrutura para sobrado de 180 m².'),
  createProject(5, 5, 'Edícula', 'Estrutural', 'Iniciante', 50, 'Estudo conceitual de edícula.'),
  createProject(6, 6, 'Garagem', 'Estrutural', 'Iniciante', 45, 'Estudo conceitual de garagem.'),
  createProject(7, 7, 'Fundações', 'Estrutural', 'Intermediário', 80, 'Conceitos de fundações.'),
  createProject(8, 8, 'Vigas', 'Estrutural', 'Intermediário', 70, 'Estudo de vigas e dimensionamento.'),
  createProject(9, 9, 'Pilares', 'Estrutural', 'Intermediário', 70, 'Estudo de pilares e dimensionamento.'),
  createProject(10, 10, 'Lajes', 'Estrutural', 'Intermediário', 75, 'Estudo de lajes e sistemas de pisos.')
);
// 10 projetos elétricos
for (let i = 11; i <= 20; i++) {
  const idx = i - 10;
  projects.push(
    createProject(
      i,
      i,
      `Projeto elétrico ${idx}`,
      'Elétrica',
      i % 2 === 0 ? 'Intermediário' : 'Iniciante',
      60 + (i % 3) * 20,
      `Estudo conceitual de instalação elétrica ${idx}.`
    )
  );
}
// 10 projetos hidrossanitários
for (let i = 21; i <= 30; i++) {
  const idx = i - 20;
  projects.push(
    createProject(
      i,
      i,
      `Projeto hidrossanitário ${idx}`,
      'Hidrossanitário',
      i % 2 === 0 ? 'Intermediário' : 'Iniciante',
      60 + (i % 3) * 20,
      `Estudo conceitual de instalação hidrossanitária ${idx}.`
    )
  );
}
// 10 projetos de compatibilização
for (let i = 31; i <= 40; i++) {
  const idx = i - 30;
  projects.push(
    createProject(
      i,
      i,
      `Projeto de compatibilização ${idx}`,
      'Compatibilização',
      i % 2 === 0 ? 'Intermediário' : 'Avançado',
      70 + (i % 3) * 20,
      `Estudo conceitual de compatibilização ${idx}.`
    )
  );
}
// 5 checklists
for (let i = 41; i <= 45; i++) {
  const idx = i - 40;
  projects.push(
    createProject(
      i,
      i,
      `Checklist ${idx}`,
      'Checklists',
      'Iniciante',
      30 + (i % 3) * 10,
      `Checklist técnico ${idx}.`
    )
  );
}
// 5 bônus
for (let i = 46; i <= 50; i++) {
  const idx = i - 45;
  projects.push(
    createProject(
      i,
      i,
      `Projeto bônus ${idx}`,
      'Bônus',
      'Iniciante',
      40 + (i % 3) * 10,
      `Projeto bônus conceitual ${idx}.`
    )
  );
}