'use client';

interface PromptQualityScoreProps {
  checks: {
    contexto: boolean;
    objetivo: boolean;
    formato: boolean;
    restricoes: boolean;
  };
}

const labels: { key: keyof PromptQualityScoreProps['checks']; label: string }[] = [
  { key: 'contexto', label: 'Contexto' },
  { key: 'objetivo', label: 'Objetivo' },
  { key: 'formato', label: 'Formato' },
  { key: 'restricoes', label: 'Restrições' },
];

export default function PromptQualityScore({ checks }: PromptQualityScoreProps) {
  const total = labels.length;
  const done = labels.filter((item) => checks[item.key]).length;
  const percent = Math.round((done / total) * 100);

  return (
    <div className="surface-card-soft p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-extrabold text-[var(--text-primary)]">
          Qualidade do prompt
        </h3>
        <span className="badge badge-cyan">{percent}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <div className="mt-4 grid gap-2">
        {labels.map((item) => {
          const ok = checks[item.key];

          return (
            <div key={item.key} className="flex items-center justify-between gap-3 text-sm">
              <span className="font-semibold text-[var(--text-secondary)]">{item.label}</span>
              <span className={`badge ${ok ? 'badge-cyan' : 'badge-orange'}`}>
                {ok ? 'ok' : 'faltando'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
