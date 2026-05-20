export interface Trail {
  id: number;
  title: string;
  description: string;
  level: string;
  lessons: number;
  estimatedMinutes: number;
}

export const trails: Trail[] = [
  {
    id: 1,
    title: 'Primeiros passos',
    description: 'Introdução à plataforma e aos conceitos básicos.',
    level: 'Iniciante',
    lessons: 7,
    estimatedMinutes: 60,
  },
  {
    id: 2,
    title: 'Usando IA com método',
    description: 'Aprenda a estruturar pedidos e validar respostas de IA.',
    level: 'Iniciante',
    lessons: 5,
    estimatedMinutes: 45,
  },
  {
    id: 3,
    title: 'Estudos estruturais conceituais',
    description: 'Aprofunde‑se em projetos estruturais.',
    level: 'Intermediário',
    lessons: 8,
    estimatedMinutes: 80,
  },
  {
    id: 4,
    title: 'Estudos elétricos conceituais',
    description: 'Explore projetos elétricos com IA.',
    level: 'Intermediário',
    lessons: 6,
    estimatedMinutes: 60,
  },
  {
    id: 5,
    title: 'Estudos hidrossanitários conceituais',
    description: 'Conceitos de projetos hidrossanitários.',
    level: 'Intermediário',
    lessons: 6,
    estimatedMinutes: 60,
  },
  {
    id: 6,
    title: 'Prompts técnicos do zero',
    description: 'Domine a criação de prompts técnicos.',
    level: 'Intermediário',
    lessons: 5,
    estimatedMinutes: 50,
  },
  {
    id: 7,
    title: 'Documentação técnica com IA',
    description: 'Crie e revise documentação técnica usando IA.',
    level: 'Avançado',
    lessons: 7,
    estimatedMinutes: 70,
  },
];