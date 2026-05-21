'use client';

interface FilterBarProps {
  searchTerm: string;
  disciplineFilter: string;
  levelFilter: string;
  categoryFilter: string;
  sortBy: string;
  disciplines: { label: string; value: string; count: number }[];
  levels: string[];
  categories: string[];
  resultCount: number;
  totalCount: number;
  onSearchTermChange: (value: string) => void;
  onDisciplineFilterChange: (value: string) => void;
  onLevelFilterChange: (value: string) => void;
  onCategoryFilterChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onClear: () => void;
}

export default function FilterBar({
  searchTerm,
  disciplineFilter,
  levelFilter,
  categoryFilter,
  sortBy,
  disciplines,
  levels,
  categories,
  resultCount,
  totalCount,
  onSearchTermChange,
  onDisciplineFilterChange,
  onLevelFilterChange,
  onCategoryFilterChange,
  onSortByChange,
  onClear,
}: FilterBarProps) {
  return (
    <section className="surface-section toolbar-sticky p-3 md:p-4">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(260px,1fr)_180px_160px_180px_180px_auto] xl:items-center">
        <label className="sr-only" htmlFor="project-search">
          Buscar projetos
        </label>
        <input
          id="project-search"
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
          placeholder="Buscar por projeto, disciplina ou prancha..."
          className="input-field"
        />

        <select
          aria-label="Filtrar por disciplina"
          value={disciplineFilter}
          onChange={(event) => onDisciplineFilterChange(event.target.value)}
          className="select-field"
        >
          {disciplines.map((discipline) => (
            <option key={discipline.value} value={discipline.value}>
              {discipline.label} ({discipline.count})
            </option>
          ))}
        </select>

        <select
          aria-label="Filtrar por nível"
          value={levelFilter}
          onChange={(event) => onLevelFilterChange(event.target.value)}
          className="select-field"
        >
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>

        <select
          aria-label="Filtrar por tipo"
          value={categoryFilter}
          onChange={(event) => onCategoryFilterChange(event.target.value)}
          className="select-field"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === 'Todos' ? 'Tipo' : category}
            </option>
          ))}
        </select>

        <select
          aria-label="Ordenar projetos"
          value={sortBy}
          onChange={(event) => onSortByChange(event.target.value)}
          className="select-field"
        >
          <option value="number">Ordenar por número</option>
          <option value="title">Título A-Z</option>
          <option value="level">Nível</option>
          <option value="category">Tipo</option>
        </select>

        <button type="button" onClick={onClear} className="btn-ghost">
          Limpar
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-[var(--text-secondary)]">
          <strong className="text-[var(--text-primary)]">{resultCount}</strong> de {totalCount} projetos
        </p>
        <p className="hidden text-xs font-semibold text-[var(--text-muted)] sm:block">
          Filtros em dropdown para escalar o catálogo sem poluir a lista.
        </p>
      </div>
    </section>
  );
}
