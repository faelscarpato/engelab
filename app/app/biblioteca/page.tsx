/*
 * Biblioteca 50 Projetos conectada ao catálogo real do repositório engelab_doc.
 */
'use client';

import { useEffect, useMemo, useState } from 'react';
import DocModal from '../../../components/DocModal';
import FilterBar from '../../../components/features/projects/FilterBar';
import ProjectCard from '../../../components/features/projects/ProjectCard';
import ProjectListItem from '../../../components/features/projects/ProjectListItem';
import EmptyState from '../../../components/ui/EmptyState';
import { engelabProjects } from '../../../lib/data/engelab-projects';
import type { EngelabProject, FileType } from '../../../lib/types/library';

function previewType(project: EngelabProject): FileType {
  return project.previewPdf ? 'pdf' : project.previewImage?.endsWith('.webp') ? 'webp' : 'png';
}

export default function BibliotecaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [disciplineFilter, setDisciplineFilter] = useState('Todos');
  const [levelFilter, setLevelFilter] = useState('Todos');
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [sortBy, setSortBy] = useState('number');
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('list');
  const [visibleCount, setVisibleCount] = useState(16);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [previewProject, setPreviewProject] = useState<EngelabProject | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('favoriteProjects');
      if (stored) {
        setFavorites((JSON.parse(stored) as Array<string | number>).map(String));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('favoriteProjects', JSON.stringify(favorites));
    }
  }, [favorites]);

  const levels = useMemo(
    () => ['Todos', ...Array.from(new Set(engelabProjects.map((project) => project.level)))],
    []
  );

  const categories = useMemo(
    () => ['Todos', ...Array.from(new Set(engelabProjects.map((project) => project.category)))],
    []
  );

  const disciplines = useMemo(() => {
    const base = Array.from(new Set(engelabProjects.map((project) => project.discipline)));

    return [
      { label: 'Todos', value: 'Todos', count: engelabProjects.length },
      ...base.map((discipline) => ({
        label: discipline,
        value: discipline,
        count: engelabProjects.filter((project) => project.discipline === discipline).length,
      })),
    ];
  }, []);

  const handleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favorite) => favorite !== id) : [...prev, id]
    );
  };

  const filtered = useMemo(() => {
    const result = engelabProjects.filter((project) => {
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        project.code.toLowerCase().includes(query) ||
        project.title.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.discipline.toLowerCase().includes(query) ||
        project.sourceFolder.toLowerCase().includes(query);

      const matchesDiscipline =
        disciplineFilter === 'Todos' || project.discipline === disciplineFilter;

      const matchesLevel = levelFilter === 'Todos' || project.level === levelFilter;
      const matchesCategory = categoryFilter === 'Todos' || project.category === categoryFilter;

      return matchesSearch && matchesDiscipline && matchesLevel && matchesCategory;
    });

    return [...result].sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'level') return a.level.localeCompare(b.level);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return a.number - b.number;
    });
  }, [categoryFilter, disciplineFilter, levelFilter, searchTerm, sortBy]);

  const visibleProjects = filtered.slice(0, visibleCount);
  const groupedProjects = visibleProjects.reduce<Record<string, EngelabProject[]>>((groups, project) => {
    groups[project.discipline] = groups[project.discipline] ?? [];
    groups[project.discipline].push(project);
    return groups;
  }, {});

  const clearFilters = () => {
    setSearchTerm('');
    setDisciplineFilter('Todos');
    setLevelFilter('Todos');
    setCategoryFilter('Todos');
    setSortBy('number');
    setVisibleCount(16);
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <p className="page-kicker">Projetos Modelo</p>
        <h1 className="app-title">Biblioteca 50 Projetos</h1>
        <p className="page-copy">
          Explore os 50 projetos reais do repositório ENGELAB com pranchas,
          memoriais, checklists, prompts e avisos técnicos.
        </p>
      </div>

      <FilterBar
        searchTerm={searchTerm}
        disciplineFilter={disciplineFilter}
        levelFilter={levelFilter}
        categoryFilter={categoryFilter}
        sortBy={sortBy}
        disciplines={disciplines}
        levels={levels}
        categories={categories}
        resultCount={filtered.length}
        totalCount={engelabProjects.length}
        onSearchTermChange={(value) => {
          setSearchTerm(value);
          setVisibleCount(16);
        }}
        onDisciplineFilterChange={(value) => {
          setDisciplineFilter(value);
          setVisibleCount(16);
        }}
        onLevelFilterChange={(value) => {
          setLevelFilter(value);
          setVisibleCount(16);
        }}
        onCategoryFilterChange={(value) => {
          setCategoryFilter(value);
          setVisibleCount(16);
        }}
        onSortByChange={setSortBy}
        onClear={clearFilters}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="meta-row">
          <span>{visibleProjects.length} exibidos</span>
          <span className="meta-dot" />
          <span>{filtered.length} encontrados</span>
        </div>
        <div className="view-toggle" aria-label="Modo de visualização">
          <button
            type="button"
            aria-pressed={viewMode === 'cards'}
            onClick={() => setViewMode('cards')}
          >
            Cards
          </button>
          <button
            type="button"
            aria-pressed={viewMode === 'list'}
            onClick={() => setViewMode('list')}
          >
            Lista
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Nenhum projeto encontrado"
          description="Tente buscar por disciplina, tipo de projeto, nível técnico ou tempo estimado."
          action={
            <button type="button" onClick={clearFilters} className="btn-primary">
            Limpar filtros
            </button>
          }
        />
      ) : viewMode === 'cards' ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              saved={favorites.includes(project.id)}
              onFavorite={handleFavorite}
              onPreview={setPreviewProject}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-5">
          {Object.entries(groupedProjects).map(([discipline, items]) => (
            <section key={discipline} className="surface-section p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="section-title">{discipline}</h2>
                <span className="badge">{items.length}</span>
              </div>
              <div className="grid gap-3">
                {items.map((project) => (
                  <ProjectListItem
                    key={project.id}
                    project={project}
                    saved={favorites.includes(project.id)}
                    onFavorite={handleFavorite}
                    onPreview={setPreviewProject}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {filtered.length > visibleCount && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((current) => current + 16)}
            className="btn-secondary"
          >
            Carregar mais projetos
          </button>
        </div>
      )}

      <DocModal
        isOpen={Boolean(previewProject)}
        onClose={() => setPreviewProject(null)}
        title={previewProject ? `${previewProject.code} · ${previewProject.title}` : 'Prévia'}
        fileUrl={previewProject?.previewPdf ?? previewProject?.previewImage ?? null}
        fileType={previewProject ? previewType(previewProject) : 'pdf'}
      />
    </div>
  );
}
