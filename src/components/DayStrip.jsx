import { MdCheck } from 'react-icons/md';

const DayStrip = ({ days, active, onChange }) => {
  if (!days.length) return null;

  return (
    <div>
      <span className="block pb-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-muted">
        Call days
      </span>
      <div className="scroll-row fade-right flex items-center gap-1.5 overflow-x-auto pb-1.5">
        <button
          type="button"
          onClick={() => onChange('')}
          aria-pressed={active === ''}
          className={`h-10 shrink-0 cursor-pointer rounded-pill border px-4 text-[12.5px] font-semibold transition-colors duration-180 ${
            active === ''
              ? 'border-accent bg-accent text-accent-ink'
              : 'border-line bg-card text-ink-muted hover:border-accent/50 hover:text-ink'
          }`}
        >
          All days
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
              className={`flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-pill border px-3.5 transition-colors duration-180 ${
                selected
                  ? 'border-accent bg-accent text-accent-ink'
                  : complete
                    ? 'border-ok/30 bg-ok-soft text-ok-ink hover:border-ok/60'
                    : 'border-line bg-card text-ink hover:border-accent/50'
              }`}
            >
              <span className="whitespace-nowrap text-[12.5px] font-semibold">Day {d.day}</span>
              {complete && !selected && <MdCheck size={15} aria-label="complete" />}
              <span className={`font-mono text-[11.5px] ${selected ? 'opacity-90' : 'opacity-70'}`}>
                {d.actioned}/{d.total}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DayStrip;
