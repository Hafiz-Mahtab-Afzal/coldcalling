import { useState } from 'react';
import { MdUnfoldMore, MdUnfoldLess } from 'react-icons/md';
import { OUTCOMES } from '../lib/outcomes';
import { num } from '../lib/format';

const OutcomeTabs = ({ active, counts, total, onChange }) => {
  const [expanded, setExpanded] = useState(false);

  const tabs = [
    { value: '', label: 'All', chip: 'bg-card-2 text-ink border-line', dot: 'bg-ink-faint', count: total },
    {
      value: 'none',
      label: 'Not called',
      chip: 'bg-card-2 text-ink-muted border-line',
      dot: 'bg-ink-faint',
      count: counts.none ?? 0,
    },
    ...OUTCOMES.map((o) => ({
      value: o.value,
      label: o.label,
      chip: o.chip,
      dot: o.dot,
      count: counts[o.value] ?? 0,
    })),
  ];

  return (
    <div>
      <div className="flex items-center justify-between gap-2 pb-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-muted">Call outcome</span>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="flex shrink-0 cursor-pointer items-center gap-1 rounded-pill px-2 py-1 text-[11.5px] font-semibold text-ink-muted transition-colors duration-180 hover:bg-card-2 hover:text-ink"
        >
          {expanded ? <MdUnfoldLess size={15} aria-hidden="true" /> : <MdUnfoldMore size={15} aria-hidden="true" />}
          {expanded ? 'Collapse' : `Show all ${tabs.length}`}
        </button>
      </div>

      <div
        className={
          expanded
            ? 'flex flex-wrap items-center gap-1.5'
            : 'scroll-row fade-right flex items-center gap-1.5 overflow-x-auto pb-1.5'
        }
        role="tablist"
        aria-label="Filter by call outcome"
      >
        {tabs.map((t) => {
          const selected = active === t.value;
          const empty = t.count === 0 && !selected;
          return (
            <button
              key={t.value || 'all'}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onChange(t.value)}
              className={`flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-pill border px-3 text-[12.5px] font-semibold transition-colors duration-180 ${
                selected
                  ? 'border-accent bg-accent text-accent-ink'
                  : `${t.chip} hover:border-accent/50 ${empty ? 'opacity-55' : ''}`
              }`}
            >
              {!selected && <span className={`h-1.5 w-1.5 shrink-0 rounded-pill ${t.dot}`} aria-hidden="true" />}
              <span className="whitespace-nowrap">{t.label}</span>
              <span className={`font-mono text-[11.5px] ${selected ? 'opacity-90' : 'opacity-70'}`}>{num(t.count)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OutcomeTabs;
