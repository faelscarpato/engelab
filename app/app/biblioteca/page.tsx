/*
 * Página de Projetos Modelo. Busca, filtros rápidos por disciplina,
 * cards mais escaneáveis e ações explícitas.
 */
'use client';

import { useEffect, useMemo, useState } from 'react';
import { Project, projects } from '../../../data/projects';
import FilterBar from '../../../components/features/projects/FilterBar';
import ProjectCard from '../../../components/features/projects/ProjectCard';
import ProjectListItem from '../../../components/features/projects/ProjectListItem';
import EmptyState from '../../../components/ui/EmptyState';

export default function BibliotecaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [disciplineFilter, setDisciplineFilter] = useState('Todos');
  const [levelFilter, setLevelFilter] = useState('Todos');
  const [timeFilter, setTimeFilter] = useState('Todos');
  const [sortBy, setSortBy] = useState('number');
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('list');
  const [visibleCount, setVisibleCount] = useState(16);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('favoriteProjects');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('favoriteProjects', JSON.stringify(favorites));
    }
  }, [favorites]);

  const levels = useMemo(
    () => ['Todos', ...Array.from(new Set(projects.map((project) => project.level)))],
    []
  );

  const disciplines = useMemo(() => {
    const base = Array.from(new Set(projects.map((project) => project.discipline)));

    return [
      { label: 'Todos', value: 'Todos', count: projects.length },
      ...base.map((discipline) => ({
        label: discipline,
        value: discipline,
        count: projects.filter((project) => project.discipline === discipline).length,
      })),
    ];
  }, []);

  const handleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favorite) => favorite !== id) : [...prev, id]
    );
  };

  const filtered = useMemo(() => {
    const result = projects.filter((project) => {
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.discipline.toLowerCase().includes(query);

      const matchesDiscipline =
        disciplineFilter === 'Todos' || project.discipline === disciplineFilter;

      const matchesLevel = levelFilter === 'Todos' || project.level === levelFilter;
      const matchesTime =
        timeFilter === 'Todos' || project.estimatedMinutes <= Number(timeFilter);

      return matchesSearch && matchesDiscipline && matchesLevel && matchesTime;
    });

    return [...result].sort((a, b) => {
      if (sortBy === 'time') return a.estimatedMinutes - b.estimatedMinutes;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'level') return a.level.localeCompare(b.level);
      return a.projectNumber - b.projectNumber;
    });
  }, [disciplineFilter, levelFilter, searchTerm, sortBy, timeFilter]);

  const visibleProjects = filtered.slice(0, visibleCount);
  const groupedProjects = visibleProjects.reduce<Record<string, Project[]>>((groups, project) => {
    groups[project.discipline] = groups[project.discipline] ?? [];
    groups[project.discipline].push(project);
    return groups;
  }, {});

  const clearFilters = () => {
    setSearchTerm('');
    setDisciplineFilter('Todos');
    setLevelFilter('Todos');
    setTimeFilter('Todos');
    setSortBy('number');
    setVisibleCount(16);
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <p className="page-kicker">Projetos Modelo</p>
        <h1 className="app-title">Biblioteca 50 Projetos</h1>
        <p className="page-copy">
          Encontre modelos conceituais com busca, filtros rápidos e ações diretas
          para abrir ou salvar.
        </p>
      </div>

      <FilterBar
        searchTerm={searchTerm}
        disciplineFilter={disciplineFilter}
        levelFilter={levelFilter}
        timeFilter={timeFilter}
        sortBy={sortBy}
        viewMode={viewMode}
        disciplines={disciplines}
        levels={levels}
        resultCount={filtered.length}
        totalCount={projects.length}
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
        onTimeFilterChange={(value) => {
          setTimeFilter(value);
          setVisibleCount(16);
        }}
        onSortByChange={setSortBy}
        onViewModeChange={setViewMode}
        onClear={clearFilters}
      />

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
    </div>
  );
}
