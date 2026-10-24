import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import { OUTCOMES, isDead } from '../lib/outcomes';

const boxSx = {
  padding: '2px',
  color: 'rgb(var(--ink-faint))',
  '& .MuiSvgIcon-root': { fontSize: 17 },
  '&.Mui-checked': { color: 'rgb(var(--accent))' },
  '&.Mui-disabled': { color: 'rgb(var(--line-strong))' },
  '&:hover': { backgroundColor: 'rgb(var(--accent) / 0.08)' },
};

const OutcomeChecks = ({ selected, disabled, busy, onToggle, rowName }) => {
  const active = new Set(selected || []);
  const dead = isDead(selected);

  return (
    <div
      className={`flex w-full flex-wrap items-center gap-x-2 gap-y-0.5 py-1 transition-opacity duration-180 ${
        busy ? 'opacity-60' : ''
      }`}
    >
      {OUTCOMES.map((o) => {
        const on = active.has(o.value);
        const blocked = disabled || (dead && !o.dead);
        const label = (
          <label
            key={o.value}
            className={`flex items-center gap-0.5 text-[11px] leading-none ${
              blocked ? 'cursor-not-allowed text-ink-faint/60' : 'cursor-pointer'
            } ${on && !blocked ? 'font-semibold text-accent' : blocked ? '' : 'text-ink-muted hover:text-ink'}`}
          >
            <Checkbox
              checked={on}
              disabled={blocked}
              onChange={(e) => onToggle(o.value, e.target.checked)}
              sx={boxSx}
              slotProps={{ input: { 'aria-label': `${o.label} for ${rowName}` } }}
            />
            <span className="whitespace-nowrap">{o.short}</span>
          </label>
        );

        if (!blocked || disabled) return label;

        return (
          <Tooltip key={o.value} title="This lead cannot be reached, untick that first" placement="top">
            <span className="inline-flex">{label}</span>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default OutcomeChecks;
