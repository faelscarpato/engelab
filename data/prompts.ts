export interface PromptDefinition {
  id: number;
  title: string;
  slug: string;
  discipline: string;
  promptType: string;
  content: string;
  howToUse: string;
  level: string;
  relatedProjectId?: number;
}

export const prompts: PromptDefinition[] = [
  {
    id: 1,
    title: 'Prompt base geral',
    slug: 'prompt-base-geral',
    discipline: 'Geral',
    promptType: 'Base',
    content:
      'Crie um estudo conceitual para [tipo de projeto] explicando os elementos principais, as etapas de compatibilização e os pontos de revisão. Não substitui cálculo técnico ou projeto executivo.',
    howToUse:
      'Substitua [tipo de projeto] pelo contexto desejado e adapte conforme sua disciplina.',
    level: 'Iniciante',
  },
  {
    id: 2,
    title: 'Prompt estrutural',
    slug: 'prompt-estrutural',
    discipline: 'Estrutural',
    promptType: 'Estudo conceitual',
    content:
      'Elabore um estudo conceitual de solução estrutural para uma residência térrea de 70 m², explicando elementos principais, cuidados de compatibilização e pontos de revisão, sem caráter executivo.',
    howToUse: 'Altere o tamanho ou tipo de estrutura conforme seu projeto.',
    level: 'Iniciante',
    relatedProjectId: 1,
  },
  {
    id: 3,
    title: 'Prompt elétrico',
    slug: 'prompt-eletrico',
    discipline: 'Elétrica',
    promptType: 'Estudo conceitual',
    content:
      'Descreva um estudo conceitual de projeto elétrico para um sobrado de 120 m², incluindo posicionamento de pontos de energia, critérios de dimensionamento e normas de segurança.',
    howToUse: 'Altere o tipo de edificação e detalhes conforme seu contexto.',
    level: 'Intermediário',
    relatedProjectId: 13,
  },
  {
    id: 4,
    title: 'Prompt hidrossanitário',
    slug: 'prompt-hidrossanitario',
    discipline: 'Hidrossanitário',
    promptType: 'Estudo conceitual',
    content:
      'Crie um estudo conceitual de instalação hidrossanitária para uma residência de 150 m², identificando demanda, dimensionamento e pontos de consumo e esgotamento.',
    howToUse: 'Adapte a área e o tipo de edificação conforme seu projeto.',
    level: 'Intermediário',
    relatedProjectId: 23,
  },
  {
    id: 5,
    title: 'Prompt para relatórios',
    slug: 'prompt-relatorios',
    discipline: 'Documentação',
    promptType: 'Relatório',
    content:
      'Elabore um relatório conceitual de compatibilização entre projetos estrutural, elétrico e hidrossanitário, descrevendo interferências e soluções identificadas.',
    howToUse: 'Utilize após comparar as disciplinas em estudo preliminar.',
    level: 'Avançado',
  },
  {
    id: 6,
    title: 'Prompt para checklists',
    slug: 'prompt-checklists',
    discipline: 'Revisão',
    promptType: 'Checklist',
    content:
      'Crie uma checklist para revisar respostas de IA referentes a um projeto hidrossanitário conceitual.',
    howToUse: 'Liste todos os itens importantes que a resposta precisa cobrir.',
    level: 'Intermediário',
  },
  {
    id: 7,
    title: 'Prompt para estudo preliminar',
    slug: 'prompt-estudo-preliminar',
    discipline: 'Estrutural',
    promptType: 'Estudo preliminar',
    content:
      'Descreva os passos iniciais para realizar um estudo preliminar estrutural para um pequeno edifício comercial.',
    howToUse: 'Use como ponto de partida para se organizar antes de detalhar o estudo.',
    level: 'Iniciante',
  },
];