export interface Checklist {
  id: string;
  title: string;
  category: string;
  items: string[];
  relatedProjectIds?: number[];
  relatedPromptIds?: number[];
}

/**
 * Checklists disponíveis na plataforma. As checklists ajudam o estudante a
 * revisar respostas geradas por IA e a estruturar estudos preliminares. Os
 * campos relatedProjectIds e relatedPromptIds apontam para projetos e
 * prompts relevantes que se beneficiam daquele checklist.
 */
export const checklists: Checklist[] = [
  {
    id: 'ia-review',
    title: 'Revisão de resposta de IA',
    category: 'Revisão',
    items: [
      'A resposta aborda todos os requisitos?',
      'Existem inconsistências técnicas evidentes?',
      'Foi respeitado o contexto definido no prompt?',
      'Há informações inventadas ou fora do escopo?',
      'É necessário ajustar ou refazer o prompt?',
    ],
  },
  {
    id: 'preliminar-estrutural',
    title: 'Estudo preliminar estrutural',
    category: 'Estrutural',
    items: [
      'Definir programa e área construída',
      'Identificar cargas principais',
      'Considerar sistema estrutural adequado',
      'Checar compatibilização com arquitetura e instalações',
      'Listar normas e referências aplicáveis',
    ],
  },
  {
    id: 'preliminar-eletrico',
    title: 'Estudo preliminar elétrico',
    category: 'Elétrica',
    items: [
      'Listar equipamentos e demandas elétricas',
      'Definir localização de quadros e circuitos',
      'Considerar normas de segurança elétrica',
      'Checar compatibilização com demais disciplinas',
      'Verificar possibilidade de expansão futura',
    ],
  },
  {
    id: 'preliminar-hidrossanitario',
    title: 'Estudo preliminar hidrossanitário',
    category: 'Hidrossanitário',
    items: [
      'Identificar demanda de água e esgoto',
      'Definir dimensionamento de tubulações',
      'Verificar pontos de consumo e esgotamento',
      'Checar compatibilização com estrutura e arquitetura',
      'Considerar normas de saneamento',
    ],
  },
  {
    id: 'compatibilizacao',
    title: 'Compatibilização',
    category: 'Compatibilização',
    items: [
      'Comparar layouts das disciplinas',
      'Identificar interferências físicas',
      'Avaliar conflitos de prazos ou sequências',
      'Registrar incompatibilidades e soluções',
      'Atualizar modelos conforme ajustes',
    ],
  },
];