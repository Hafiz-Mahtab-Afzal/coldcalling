import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { MdLanguage, MdPhoneDisabled, MdGroups, MdPhoneInTalk } from 'react-icons/md';
import { OUTCOME_MAP } from '../lib/outcomes';

const StatCard = ({ icon: Icon, label, value, hint, tone }) => (
  <div className="rounded-card border border-line bg-surface-card p-4 shadow-card">
    <div className="flex items-center gap-2">
      <span className={`grid h-7 w-7 place-items-center rounded-md ${tone}`}>
        <Icon size={15} aria-hidden="true" />
      </span>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">{label}</p>
    </div>
    <p className="mt-2 font-mono text-[26px] font-semibold leading-none text-ink">{value}</p>
    {hint && <p className="mt-1 text-[11px] text-ink-muted">{hint}</p>}
  </div>
);

const ReportPanel = ({ stats, months, month, onMonthChange, city }) => {
  if (!stats) return null;

  const { totals, contacted, notCalled, breakdown } = stats;
  const sitePct = totals.all ? Math.round((totals.withoutWebsite / totals.all) * 100) : 0;
  const maxCount = Math.max(1, ...breakdown.map((b) => b.count));

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-bold text-ink">Outcome report</h2>
          <p className="text-[12px] text-ink-muted">{city || 'All cities'}</p>
        </div>
        <TextField
          select
          size="small"
          label="Month"
          value={month}
          onChange={(e) => onMonthChange(e.target.value)}
          sx={{
            minWidth: 170,
            '& .MuiInputBase-root': { backgroundColor: '#FFFFFF', height: 38 },
            '& .MuiInputBase-input': { fontSize: 13 },
          }}
        >
          <MenuItem value="">All time</MenuItem>
          {months.map((m) => (
            <MenuItem key={m} value={m}>
              {m}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={MdGroups}
          label="Total leads"
          value={totals.all}
          hint={city || 'all cities'}
          tone="bg-surface-muted text-primary"
        />
        <StatCard
          icon={MdLanguage}
          label="No website"
          value={totals.withoutWebsite}
          hint={`${sitePct}% of all leads, these are sellable`}
          tone="bg-emerald-50 text-accent"
        />
        <StatCard
          icon={MdPhoneInTalk}
          label="Contacted"
          value={contacted}
          hint="at least one outcome ticked"
          tone="bg-blue-50 text-primary"
        />
        <StatCard
          icon={MdPhoneDisabled}
          label="Not called yet"
          value={notCalled}
          tone="bg-amber-50 text-amber-600"
        />
      </div>

      <div className="rounded-card border border-line bg-surface-card p-4 shadow-card">
        <h3 className="text-[13px] font-bold text-ink">What happens on your calls</h3>
        <p className="mt-0.5 text-[11px] text-ink-muted">
          Percentages are of {contacted} contacted leads. A lead can have more than one outcome, so these add up to
          more than 100 percent.
        </p>

        {contacted === 0 ? (
          <p className="mt-6 text-center text-[13px] text-ink-muted">No outcomes logged for this period yet.</p>
        ) : (
          <ul className="mt-4 space-y-2.5">
            {breakdown.map((b) => (
              <li key={b.outcome} className="grid grid-cols-[132px_1fr_92px] items-center gap-3">
                <span className="text-[12px] font-medium text-ink">{OUTCOME_MAP[b.outcome]?.label ?? b.outcome}</span>
                <span className="h-2.5 overflow-hidden rounded-full bg-surface-muted" role="presentation">
                  <span
                    className={`block h-full rounded-full transition-all duration-300 ${OUTCOME_MAP[b.outcome]?.bar || 'bg-primary'}`}
                    style={{ width: `${(b.count / maxCount) * 100}%` }}
                  />
                </span>
                <span className="text-right font-mono text-[12px] text-ink">
                  {b.count} <span className="text-ink-muted">({b.percent}%)</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default ReportPanel;
