interface ChecklistProgressProps {
  done: number;
  total: number;
}

export default function ChecklistProgress({ done, total }: ChecklistProgressProps) {
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <span className="block">
      <span className="progress-track block">
        <span className="progress-fill block" style={{ width: `${percent}%` }} />
      </span>
      <span className="mt-2 block text-xs font-semibold text-[var(--text-muted)]">
        {done}/{total} itens
      </span>
    </span>
  );
}
