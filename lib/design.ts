export function disciplineBadgeClass(discipline: string) {
  const normalized = discipline.toLowerCase();

  if (normalized.includes('elétr') || normalized.includes('eletr')) {
    return 'badge badge-yellow';
  }

  if (normalized.includes('hidro') || normalized.includes('água') || normalized.includes('agua')) {
    return 'badge badge-cyan';
  }

  if (normalized.includes('compat') || normalized.includes('ia') || normalized.includes('bônus') || normalized.includes('bonus')) {
    return 'badge badge-orange';
  }

  if (normalized.includes('check') || normalized.includes('vistoria') || normalized.includes('segurança') || normalized.includes('seguranca')) {
    return 'badge badge-purple';
  }

  return 'badge badge-blue';
}

export function disciplineIcon(discipline: string) {
  const normalized = discipline.toLowerCase();

  if (normalized.includes('elétr') || normalized.includes('eletr')) return '⚡';
  if (normalized.includes('hidro') || normalized.includes('água') || normalized.includes('agua')) return '💧';
  if (normalized.includes('compat') || normalized.includes('ia')) return '🔗';
  if (normalized.includes('check') || normalized.includes('vistoria') || normalized.includes('segurança') || normalized.includes('seguranca')) return '✓';
  if (normalized.includes('download') || normalized.includes('document')) return '↓';

  return '▦';
}

export function readableFieldLabel(field: string) {
  return field
    .replace(/[A-Z]/g, (match) => ` ${match}`)
    .replace(/^./, (char) => char.toUpperCase());
}
