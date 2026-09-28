import { OUTCOMES } from '../lib/outcomes';

const OutcomeTabs = ({ active, counts, total, onChange }) => {
  const tabs = [
    { value: '', label: 'All', chip: 'bg-surface-muted text-ink border-line', count: total },
    { value: 'none', label: 'Not called', chip: 'bg-surface-muted text-ink-muted border-line', count: counts.none ?? 0 },
    ...OUTCOMES.map((o) => ({ value: o.value, label: o.label, chip: o.chip, count: counts[o.value] ?? 0 })),
  ];

  return (
    <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Filter by call outcome">
      {tabs.map((t) => {
        const selected = active === t.value;
        return (
          <button
            key={t.value || 'all'}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(t.value)}
            className={`cursor-pointer rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-colors duration-200 ${
              selected ? 'border-primary bg-primary text-primary-fg' : `${t.chip} hover:border-primary/40`
            }`}
          >
            {t.label}
            <span className={`ml-1.5 font-mono ${selected ? 'opacity-90' : 'opacity-70'}`}>{t.count}</span>
          </button>
        );
      })}
    </div>
  );
};

export default OutcomeTabs;
