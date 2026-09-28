import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import { OUTCOMES, isDead } from '../lib/outcomes';

const boxSx = {
  padding: '1px',
  color: '#94A3B8',
  '& .MuiSvgIcon-root': { fontSize: 16 },
  '&.Mui-checked': { color: '#2563EB' },
  '&.Mui-disabled': { color: '#CBD5E1' },
};

const OutcomeChecks = ({ selected, disabled, busy, onToggle, rowName }) => {
  const active = new Set(selected || []);
  const dead = isDead(selected);

  return (
    <div
      className={`flex w-full flex-wrap items-center gap-x-2 gap-y-0.5 py-1 transition-opacity duration-200 ${
        busy ? 'opacity-70' : ''
      }`}
    >
      {OUTCOMES.map((o) => {
        const on = active.has(o.value);
        const blocked = disabled || (dead && !o.dead);
        const label = (
          <label
            key={o.value}
            className={`flex items-center gap-0.5 text-[11px] leading-none ${
              blocked ? 'cursor-not-allowed text-ink-muted/50' : 'cursor-pointer'
            } ${on && !blocked ? 'font-semibold text-ink' : blocked ? '' : 'text-ink-muted'}`}
          >
            <Checkbox
              checked={on}
              disabled={blocked}
              onChange={(e) => onToggle(o.value, e.target.checked)}
              sx={boxSx}
              slotProps={{ input: { 'aria-label': `${o.label} for ${rowName}` } }}
            />
            <span>{o.short}</span>
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
