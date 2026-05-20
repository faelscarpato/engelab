export interface Download {
  id: number;
  title: string;
  category: string;
  description: string;
  whenToUse: string;
  howToStudy: string;
  relatedTrail: string;
  technicalNotice: string;
  fileUrl: string;
}

/**
 * Lista de materiais para download. No MVP esses downloads são apenas
 * placeholders e não apontam para arquivos reais. Quando a integração com
 * Supabase estiver pronta, será possível armazenar e servir os arquivos
 * correspondentes.
 */
export const downloads: Download[] = [
  {
    id: 1,
    title: 'Manual de uso responsável de IA',
    category: 'Manuais',
    description: 'Diretrizes para uso seguro e ético da IA em engenharia.',
    whenToUse: 'Antes de iniciar seus estudos',
    howToStudy: 'Leia o manual e consulte durante o curso.',
    relatedTrail: 'Primeiros passos',
    technicalNotice: 'Material educacional e conceitual.',
    fileUrl: '#',
  },
  {
    id: 2,
    title: 'Projeto estrutural conceitual 70 m²',
    category: 'Projetos‑modelo',
    description: 'Estudo conceitual de estrutura para residência de 70 m².',
    whenToUse: 'Ao estudar projetos estruturais',
    howToStudy: 'Siga a trilha “Estudos estruturais conceituais”.',
    relatedTrail: 'Estudos estruturais conceituais',
    technicalNotice: 'Este material é uma referência preliminar.',
    fileUrl: '#',
  },
  {
    id: 3,
    title: 'Prompt base para projetos elétricos',
    category: 'Prompts',
    description: 'Prompt inicial para elaborar estudos conceituais de projetos elétricos.',
    whenToUse: 'Ao criar ou adaptar prompts elétricos',
    howToStudy: 'Utilize no Laboratório de Prompts.',
    relatedTrail: 'Prompts técnicos do zero',
    technicalNotice: 'Requer adaptação ao contexto real.',
    fileUrl: '#',
  },
  {
    id: 4,
    title: 'Checklist de revisão de IA',
    category: 'Checklists',
    description: 'Checklist para revisar respostas de IA.',
    whenToUse: 'Após receber uma resposta da IA',
    howToStudy: 'Use na área de Checklists.',
    relatedTrail: 'Documentação técnica com IA',
    technicalNotice: 'Não substitui revisão profissional.',
    fileUrl: '#',
  },
  {
    id: 5,
    title: 'Pacote de arquivos bônus',
    category: 'Bônus',
    description: 'Materiais extras para aprofundar seu aprendizado.',
    whenToUse: 'Quando quiser explorar além do conteúdo principal',
    howToStudy: 'Leia os materiais e veja as referências.',
    relatedTrail: 'Módulos Plus',
    technicalNotice: 'Conteúdo complementar.',
    fileUrl: '#',
  },
  {
    id: 6,
    title: 'Módulo 10 – Compatibilização técnica com IA',
    category: 'Módulos Plus',
    description: 'Conteúdo avançado sobre compatibilização de disciplinas com apoio de IA.',
    whenToUse: 'Após concluir a biblioteca básica',
    howToStudy: 'Siga a trilha dos Módulos Plus.',
    relatedTrail: 'Módulos Plus',
    technicalNotice: 'Bloqueado no plano atual.',
    fileUrl: '#',
  },
];