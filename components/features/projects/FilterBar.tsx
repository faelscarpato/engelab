'use client';

interface FilterBarProps {
  searchTerm: string;
  disciplineFilter: string;
  levelFilter: string;
  timeFilter: string;
  sortBy: string;
  viewMode: 'cards' | 'list';
  disciplines: { label: string; value: string; count: number }[];
  levels: string[];
  resultCount: number;
  totalCount: number;
  onSearchTermChange: (value: string) => void;
  onDisciplineFilterChange: (value: string) => void;
  onLevelFilterChange: (value: string) => void;
  onTimeFilterChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onViewModeChange: (value: 'cards' | 'list') => void;
  onClear: () => void;
}

export default function FilterBar({
  searchTerm,
  disciplineFilter,
  levelFilter,
  timeFilter,
  sortBy,
  viewMode,
  disciplines,
  levels,
  resultCount,
  totalCount,
  onSearchTermChange,
  onDisciplineFilterChange,
  onLevelFilterChange,
  onTimeFilterChange,
  onSortByChange,
  onViewModeChange,
  onClear,
}: FilterBarProps) {
  return (
    <section className="surface-section toolbar-sticky p-3 md:p-4">
      <div className="grid gap-3 xl:grid-cols-[minmax(260px,1fr)_180px_150px_140px_180px_auto_auto] xl:items-center">
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
          className="select-field hidden xl:block"
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
          className="select-field hidden xl:block"
        >
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>

        <select
          aria-label="Filtrar por tempo"
          value={timeFilter}
          onChange={(event) => onTimeFilterChange(event.target.value)}
          className="select-field hidden xl:block"
        >
          <option value="Todos">Tempo</option>
          <option value="30">Até 30 min</option>
          <option value="60">Até 60 min</option>
          <option value="90">Até 90 min</option>
        </select>

        <select
          aria-label="Ordenar projetos"
          value={sortBy}
          onChange={(event) => onSortByChange(event.target.value)}
          className="select-field"
        >
          <option value="number">Ordenar por número</option>
          <option value="time">Menor tempo</option>
          <option value="title">Título A-Z</option>
          <option value="level">Nível</option>
        </select>

        <div className="view-toggle" aria-label="Modo de visualização">
          <button
            type="button"
            aria-pressed={viewMode === 'cards'}
            onClick={() => onViewModeChange('cards')}
          >
            Cards
          </button>
          <button
            type="button"
            aria-pressed={viewMode === 'list'}
            onClick={() => onViewModeChange('list')}
          >
            Lista
          </button>
        </div>

        <button type="button" onClick={onClear} className="btn-ghost hidden xl:inline-flex">
          Limpar
        </button>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 xl:hidden">
        {disciplines.map((discipline) => (
          <button
            key={discipline.value}
            type="button"
            onClick={() => onDisciplineFilterChange(discipline.value)}
            className={`chip ${disciplineFilter === discipline.value ? 'chip-active' : ''}`}
          >
            {discipline.label} <span className="text-[var(--text-muted)]">{discipline.count}</span>
          </button>
        ))}
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end xl:hidden">
        <div>
          <label htmlFor="level-filter" className="mb-2 block text-xs font-bold uppercase text-[var(--text-muted)]">
            Nível
          </label>
          <select
            id="level-filter"
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
        </div>

        <div>
          <label htmlFor="time-filter" className="mb-2 block text-xs font-bold uppercase text-[var(--text-muted)]">
            Tempo
          </label>
          <select
            id="time-filter"
            value={timeFilter}
            onChange={(event) => onTimeFilterChange(event.target.value)}
            className="select-field"
          >
            <option value="Todos">Todos</option>
            <option value="30">Até 30 min</option>
            <option value="60">Até 60 min</option>
            <option value="90">Até 90 min</option>
          </select>
        </div>

        <button type="button" onClick={onClear} className="btn-ghost">
          Limpar filtros
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-[var(--text-secondary)]">
          <strong className="text-[var(--text-primary)]">{resultCount}</strong> de {totalCount} projetos
        </p>
        <p className="hidden text-xs font-semibold text-[var(--text-muted)] sm:block">
          Filtros compactos para encontrar um projeto sem deslocar a lista.
        </p>
      </div>
    </section>
  );
}
