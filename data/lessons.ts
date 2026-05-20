export interface Lesson {
  id: number;
  moduleId: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  videoUrl?: string;
  estimatedMinutes: number;
  orderIndex: number;
  challenge?: string;
  relatedProjectId?: number;
}

export const lessons: Lesson[] = [
  {
    id: 1,
    moduleId: 1,
    title: 'O que é a Biblioteca 50 Projetos‑Modelo',
    slug: 'biblioteca-50-projetos-modelo',
    summary: 'Entenda o propósito da biblioteca.',
    content:
      'Nesta aula você aprenderá sobre a proposta e o funcionamento da biblioteca de projetos‑modelo, incluindo suas limitações e responsabilidades.',
    estimatedMinutes: 10,
    orderIndex: 1,
    challenge: 'Explique para um colega o que é um projeto‑modelo.',
  },
  {
    id: 2,
    moduleId: 1,
    title: 'Como navegar sem se perder',
    slug: 'como-navegar-sem-se-perder',
    summary: 'Aprenda a usar filtros, busca e favoritos.',
    content:
      'A navegação eficiente na plataforma envolve o uso de busca, filtros e favoritos para organizar seus estudos.',
    estimatedMinutes: 10,
    orderIndex: 2,
    challenge: 'Use a biblioteca para encontrar um projeto estrutural de seu interesse.',
  },
  {
    id: 3,
    moduleId: 1,
    title: 'O que é projeto‑modelo',
    slug: 'o-que-e-projeto-modelo',
    summary: 'Conceitos sobre projetos conceituais.',
    content:
      'Projetos‑modelo são estudos conceituais que servem como referência para aprendizado e inspiração, sem substituir projetos executivos.',
    estimatedMinutes: 8,
    orderIndex: 3,
    challenge: 'Liste as diferenças entre estudo conceitual e projeto executivo.',
  },
  {
    id: 4,
    moduleId: 1,
    title: 'Como usar IA com engenharia',
    slug: 'como-usar-ia-com-engenharia',
    summary: 'Boas práticas para interação com IA.',
    content:
      'Esta aula discute princípios de uso responsável de IA na engenharia, incluindo limitações técnicas e éticas.',
    estimatedMinutes: 12,
    orderIndex: 4,
    challenge: 'Crie um prompt para estudar um projeto elétrico conceitual.',
  },
  {
    id: 5,
    moduleId: 1,
    title: 'Como copiar e adaptar prompts',
    slug: 'como-copiar-e-adaptar-prompts',
    summary: 'Dicas para reaproveitar prompts de forma segura.',
    content:
      'Aprenda a identificar elementos essenciais de um prompt e adaptá‑los ao seu contexto específico.',
    estimatedMinutes: 10,
    orderIndex: 5,
    challenge: 'Adapte um prompt de estrutura para um projeto de 90 m².',
  },
  {
    id: 6,
    moduleId: 1,
    title: 'Como revisar com checklist',
    slug: 'como-revisar-com-checklist',
    summary: 'Use checklists para validar suas respostas.',
    content:
      'Explique o papel das checklists na revisão de respostas geradas por IA e como utilizá‑las.',
    estimatedMinutes: 8,
    orderIndex: 6,
    challenge: 'Crie uma checklist personalizada para um projeto hidrossanitário.',
  },
  {
    id: 7,
    moduleId: 1,
    title: 'Como evoluir seus próprios prompts',
    slug: 'como-evoluir-seus-proprios-prompts',
    summary: 'Aprenda a melhorar continuamente seus prompts.',
    content:
      'Dicas e estratégias para iterar em seus prompts com base em feedback e resultados obtidos com IA.',
    estimatedMinutes: 10,
    orderIndex: 7,
    challenge: 'Melhore um prompt fraco utilizando as técnicas aprendidas.',
  },
];