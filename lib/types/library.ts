export type FileType = 'pdf' | 'png' | 'webp' | 'md' | 'txt' | 'svg' | 'docx' | 'other';

export type Discipline = 'Estrutural' | 'Elétrico' | 'Hidrossanitário';

export type Level = 'Básico' | 'Intermediário' | 'Avançado';

export interface ProjectFile {
  label: string;
  url: string;
  type: FileType;
  subfolder: string;
}

export interface EngelabProject {
  id: string;
  code: string;
  number: number;
  title: string;
  discipline: Discipline;
  category: string;
  level: Level;
  slug: string;
  sourceFolder: string;
  previewImage: string | null;
  previewPdf: string | null;
  checklist: string | null;
  prompt: string | null;
  files: ProjectFile[];
}
