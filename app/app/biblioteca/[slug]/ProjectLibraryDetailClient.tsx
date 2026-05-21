'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import DocModal from '../../../../components/DocModal';
import { engelabProjects } from '../../../../lib/data/engelab-projects';
import { disciplineBadgeClass } from '../../../../lib/design';
import type { EngelabProject, ProjectFile } from '../../../../lib/types/library';

interface ProjectLibraryDetailClientProps {
  project: EngelabProject;
}

function groupFiles(files: ProjectFile[]) {
  return files.reduce<Record<string, ProjectFile[]>>((groups, file) => {
    groups[file.subfolder] = groups[file.subfolder] ?? [];
    groups[file.subfolder].push(file);
    return groups;
  }, {});
}

async function copyTextFromUrl(url: string | null) {
  if (!url || typeof navigator === 'undefined') return false;

  const response = await fetch(url);
  if (!response.ok) return false;

  const text = await response.text();
  await navigator.clipboard.writeText(text);
  return true;
}

export default function ProjectLibraryDetailClient({
  project,
}: ProjectLibraryDetailClientProps) {
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null);
  const [favorite, setFavorite] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');

  useEffect(() => {
    const studied = JSON.parse(localStorage.getItem('studiedCatalogProjects') || '[]') as string[];

    if (!studied.includes(project.id)) {
      const next = [...studied, project.id];
      localStorage.setItem('studiedCatalogProjects', JSON.stringify(next));
      localStorage.setItem('projectsStudied', next.length.toString());
    }
  }, [project.id]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteProjects') || '[]') as Array<string | number>;
    setFavorite(favorites.map(String).includes(project.id));
  }, [project.id]);

  const filesByFolder = useMemo(() => groupFiles(project.files), [project.files]);
  const previewImage = project.previewImage;
  const previewPdf = project.files.find((file) => file.url === project.previewPdf);
  const checklistFile = project.files.find((file) => file.url === project.checklist);
  const promptFile = project.files.find((file) => file.url === project.prompt);
  const avisoFile = project.files.find((file) => file.subfolder === '07_Aviso_Tecnico');
  const relatedProjects = engelabProjects
    .filter((item) => item.id !== project.id && item.discipline === project.discipline)
    .slice(0, 3);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteProjects') || '[]') as Array<string | number>;
    const normalized = favorites.map(String);
    const next = normalized.includes(project.id)
      ? normalized.filter((item) => item !== project.id)
      : [...normalized, project.id];

    localStorage.setItem('favoriteProjects', JSON.stringify(next));
    setFavorite(next.includes(project.id));
  };

  const handleCopyPrompt = async () => {
    const copied = await copyTextFromUrl(project.prompt);
    setCopyStatus(copied ? 'Prompt copiado' : 'Não foi possível copiar o prompt');
    window.setTimeout(() => setCopyStatus(''), 2400);
  };

  return (
    <div className="page-shell">
      <section className="surface-hero p-5 md:p-7">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="page-header">
            <div className="flex flex-wrap gap-2">
              <span className={disciplineBadgeClass(project.discipline)}>
                {project.discipline}
              </span>
              <span className="badge">{project.level}</span>
              <span className="badge">{project.category}</span>
              <span className="badge">{project.files.length} arquivos</span>
            </div>
            <h1 className="app-title">
              {project.code} · {project.title}
            </h1>
            <p className="page-copy">
              Conteúdo carregado diretamente do repositório ENGELAB via URLs raw
              do GitHub, sem storage adicional.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            <Link href="/app/biblioteca" className="btn-secondary">
              Voltar para a Biblioteca
            </Link>
            <button type="button" onClick={toggleFavorite} className="btn-ghost">
              {favorite ? 'Remover favorito' : 'Favoritar'}
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="surface-card p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="page-kicker">Prancha</p>
              <h2 className="section-title">Prévia do projeto</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {previewPdf && (
                <button
                  type="button"
                  onClick={() => setSelectedFile(previewPdf)}
                  className="btn-secondary"
                >
                  Abrir PDF
                </button>
              )}
              {previewImage && (
                <button
                  type="button"
                  onClick={() =>
                    setSelectedFile({
                      label: 'Imagem da prancha A3',
                      url: previewImage,
                      type: previewImage.endsWith('.webp') ? 'webp' : 'png',
                      subfolder: '02_Imagem_Prancha_A3',
                    })
                  }
                  className="btn-secondary"
                >
                  Abrir imagem
                </button>
              )}
            </div>
          </div>

          {previewImage ? (
            <img
              src={previewImage}
              alt={project.title}
              loading="lazy"
              className="max-h-[560px] w-full rounded-[14px] border border-[var(--border-default)] object-contain"
            />
          ) : (
            <div className="empty-state">
              <h3 className="section-title">Imagem indisponível</h3>
              <p className="section-copy mt-2">Use a lista de arquivos para abrir a prancha.</p>
            </div>
          )}
        </div>

        <aside className="space-y-5">
          <section className="surface-card p-5">
            <h2 className="section-title">Estudo guiado</h2>
            <div className="mt-4 grid gap-3">
              {checklistFile && (
                <button
                  type="button"
                  onClick={() => setSelectedFile(checklistFile)}
                  className="surface-item p-3 text-left"
                >
                  <span className="badge badge-purple">Checklist</span>
                  <span className="mt-2 block text-sm font-bold text-[var(--text-primary)]">
                    Abrir checklist de estudo
                  </span>
                </button>
              )}

              {promptFile && (
                <div className="surface-item p-3">
                  <span className="badge badge-blue">Prompt</span>
                  <p className="mt-2 text-sm font-bold text-[var(--text-primary)]">
                    Prompt de geração do projeto
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedFile(promptFile)}
                      className="btn-secondary !min-h-10"
                    >
                      Ler
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyPrompt}
                      className="btn-primary !min-h-10"
                    >
                      Copiar
                    </button>
                  </div>
                  {copyStatus && (
                    <p className="mt-2 text-xs font-semibold text-[var(--text-secondary)]">
                      {copyStatus}
                    </p>
                  )}
                </div>
              )}

              {avisoFile && (
                <button
                  type="button"
                  onClick={() => setSelectedFile(avisoFile)}
                  className="surface-item p-3 text-left"
                >
                  <span className="badge badge-orange">Aviso técnico</span>
                  <span className="mt-2 block text-sm font-bold text-[var(--text-primary)]">
                    Ler aviso obrigatório
                  </span>
                </button>
              )}
            </div>
          </section>

          <section className="surface-card p-5">
            <h2 className="section-title">Relacionados</h2>
            <div className="mt-4 grid gap-3">
              {relatedProjects.map((item) => (
                <Link key={item.id} href={`/app/biblioteca/${item.slug}`} className="surface-item p-3">
                  <span className="badge">{item.code}</span>
                  <span className="mt-2 block text-sm font-bold text-[var(--text-primary)]">
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </section>

      <section className="surface-card p-5">
        <div className="mb-5">
          <p className="page-kicker">Arquivos</p>
          <h2 className="section-title">Subpastas do projeto</h2>
        </div>

        <div className="grid gap-4">
          {Object.entries(filesByFolder).map(([folder, files]) => (
            <div key={folder} className="surface-card-soft p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-extrabold text-[var(--text-primary)]">{folder}</h3>
                <span className="badge">{files.length} arquivos</span>
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                {files.map((file) => (
                  <button
                    key={`${file.subfolder}-${file.url}`}
                    type="button"
                    onClick={() => setSelectedFile(file)}
                    className="surface-item p-3 text-left"
                  >
                    <div className="mb-2 flex flex-wrap gap-2">
                      <span className="badge">{file.type.toUpperCase()}</span>
                    </div>
                    <span className="block text-sm font-bold text-[var(--text-primary)]">
                      {file.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="legal-note">
        <span aria-hidden="true">!</span>
        <span>
          Este material é educacional, conceitual e de apoio ao estudo. Não substitui
          projeto executivo, cálculo técnico, laudo, ART/RRT ou revisão profissional.
        </span>
      </div>

      <DocModal
        isOpen={Boolean(selectedFile)}
        onClose={() => setSelectedFile(null)}
        title={selectedFile?.label ?? project.title}
        fileUrl={selectedFile?.url ?? null}
        fileType={selectedFile?.type ?? 'pdf'}
      />
    </div>
  );
}
