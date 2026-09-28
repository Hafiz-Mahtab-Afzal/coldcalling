import { MdCheck } from 'react-icons/md';

const DayStrip = ({ days, active, onChange }) => {
  if (!days.length) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">Days</span>
      <button
        type="button"
        onClick={() => onChange('')}
        aria-pressed={active === ''}
        className={`shrink-0 cursor-pointer rounded-card border px-3 py-1.5 text-[12px] font-semibold transition-colors duration-200 ${
          active === '' ? 'border-primary bg-primary text-primary-fg' : 'border-line bg-surface-card text-ink-muted hover:text-ink'
        }`}
      >
        All
      </button>

      {days.map((d) => {
        const complete = d.total > 0 && d.actioned >= d.total;
        const selected = String(active) === String(d.day);
        return (
          <button
            key={d.day}
            type="button"
            onClick={() => onChange(String(d.day))}
            aria-pressed={selected}
            className={`shrink-0 cursor-pointer rounded-card border px-3 py-1.5 text-left transition-colors duration-200 ${
              selected
                ? 'border-primary bg-primary text-primary-fg'
                : complete
                  ? 'border-emerald-200 bg-emerald-50 text-accent hover:border-accent/50'
                  : 'border-line bg-surface-card text-ink hover:border-primary/40'
            }`}
          >
            <span className="flex items-center gap-1.5 text-[12px] font-semibold">
              Day {d.day}
              {complete && <MdCheck size={14} aria-label="complete" />}
            </span>
            <span className={`font-mono text-[11px] ${selected ? 'opacity-90' : 'opacity-70'}`}>
              {d.actioned}/{d.total}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default DayStrip;
