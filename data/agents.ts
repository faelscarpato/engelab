export interface Agent {
  id: string;
  name: string;
  category: string;
  whenToUse: string;
  delivers: string;
  recommendedLevel: string;
  initialPrompt: string;
  relatedMaterials?: string[];
}

/**
 * Catálogo de agentes disponíveis no laboratório. Cada agente fornece
 * orientações específicas para navegar na plataforma, melhorar prompts ou
 * revisar respostas. O campo initialPrompt é um exemplo de como iniciar a
 * interação com o agente.
 */
export const agents: Agent[] = [
  {
    id: 'guia',
    name: 'Agente Guia da Biblioteca',
    category: 'Navegação',
    whenToUse: 'Quando você não sabe qual material usar',
    delivers: 'Sugestões de projetos, trilhas e checklists',
    recommendedLevel: 'Todos',
    initialPrompt:
      'Sou um aluno de engenharia em busca de um projeto‑modelo para começar a estudar. Quais materiais você recomenda?',
  },
  {
    id: 'prompt-tecnico',
    name: 'Agente Prompt Técnico',
    category: 'Prompts',
    whenToUse: 'Ao melhorar ou criar prompts técnicos',
    delivers: 'Dicas e exemplos de prompts aprimorados',
    recommendedLevel: 'Intermediário',
    initialPrompt:
      'Preciso melhorar um prompt para um estudo conceitual de instalação elétrica. Como posso deixá‑lo mais claro e completo?',
  },
  {
    id: 'checklist',
    name: 'Agente Checklist',
    category: 'Revisão',
    whenToUse: 'Ao revisar respostas de IA',
    delivers: 'Checklist de itens a validar em respostas de IA',
    recommendedLevel: 'Todos',
    initialPrompt:
      'Qual checklist devo usar para revisar a resposta de IA de um projeto hidrossanitário?',
  },
  {
    id: 'prancha',
    name: 'Agente Prancha Conceitual',
    category: 'Apresentação',
    whenToUse: 'Ao montar briefing para pranchas',
    delivers: 'Sugestões de elementos e estrutura para pranchas conceituais',
    recommendedLevel: 'Intermediário',
    initialPrompt:
      'Quais elementos devo incluir em uma prancha conceitual de estrutura?',
  },
  {
    id: 'memorial',
    name: 'Agente Memorial',
    category: 'Documentação',
    whenToUse: 'Ao estruturar memoriais educativos',
    delivers: 'Estrutura e itens de um memorial conceitual',
    recommendedLevel: 'Avançado',
    initialPrompt:
      'Como estruturar um memorial descritivo conceitual para um projeto de residência?',
  },
  {
    id: 'compatibilizacao',
    name: 'Agente Compatibilização',
    category: 'Coordenação',
    whenToUse: 'Ao comparar disciplinas preliminarmente',
    delivers: 'Orientações para identificar conflitos entre disciplinas',
    recommendedLevel: 'Avançado',
    initialPrompt:
      'O que devo verificar ao compatibilizar projetos estrutural, elétrico e hidrossanitário?',
  },
  {
    id: 'estruturas-ia',
    name: 'Agente Estruturas IA',
    category: 'Estudo conceitual',
    whenToUse: 'Ao estudar estruturas com apoio de IA',
    delivers: 'Explicações conceituais e pontos de atenção em estruturas',
    recommendedLevel: 'Intermediário',
    initialPrompt:
      'Quais são os principais elementos de uma estrutura para residência térrea?',
  },
  {
    id: 'relatorios',
    name: 'Agente Relatórios',
    category: 'Documentação',
    whenToUse: 'Ao organizar relatórios e registros',
    delivers: 'Estrutura de relatórios e registros conceituais',
    recommendedLevel: 'Todos',
    initialPrompt:
      'Como posso organizar um relatório conceitual de compatibilização?',
  },
  {
    id: 'plano-estudo',
    name: 'Agente Plano de Estudo',
    category: 'Planejamento',
    whenToUse: 'Ao definir seu caminho de aprendizado',
    delivers: 'Sugestões de trilhas e materiais com base no nível do aluno',
    recommendedLevel: 'Todos',
    initialPrompt:
      'Sou iniciante em engenharia civil. Por onde devo começar na plataforma?',
  },
];