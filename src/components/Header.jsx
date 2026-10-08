import { useEffect, useState } from 'react';
import { MdPhoneInTalk, MdSearch, MdRefresh, MdTrackChanges, MdDoneAll } from 'react-icons/md';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const selectSx = {
  minWidth: 150,
  '& .MuiInputBase-root': { backgroundColor: '#FFFFFF', height: 38 },
  '& .MuiInputBase-input': { fontSize: 13 },
};

const useNativePickers = () => {
  const [native, setNative] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(max-width: 900px), (pointer: coarse)').matches;
  });

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia('(max-width: 900px), (pointer: coarse)');
    const onChange = (e) => setNative(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return native;
};

const Picker = ({ label, value, onChange, options, native, width }) => (
  <TextField
    select
    size="small"
    label={label}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    sx={width ? { ...selectSx, minWidth: width } : selectSx}
    slotProps={native ? { select: { native: true } } : undefined}
  >
    {options.map((o) =>
      native ? (
        <option key={o.value} value={o.value}>
          {o.native ?? o.label}
        </option>
      ) : (
        <MenuItem key={o.value} value={o.value}>
          {o.label}
          {o.hint && <span className="ml-1.5 font-mono text-[11px] text-ink-muted">{o.hint}</span>}
        </MenuItem>
      )
    )}
  </TextField>
);

const Header = ({
  filters,
  countries,
  cities,
  categories,
  onChange,
  onRefresh,
  loading,
  progress,
  dailyTarget,
  view,
  onViewChange,
}) => {
  const native = useNativePickers();
  const cityOptions = filters.country ? cities.filter((c) => c.country === filters.country) : cities;
  const { todayDone = 0, totalDone = 0, totalCallable = 0 } = progress || {};
  const pct = dailyTarget ? Math.min(100, Math.round((todayDone / dailyTarget) * 100)) : 0;
  const totalPct = totalCallable ? Math.round((totalDone / totalCallable) * 100) : 0;

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-surface-card">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-card bg-primary text-primary-fg">
            <MdPhoneInTalk size={18} aria-hidden="true" />
          </span>
          <div className="leading-tight">
            <h1 className="text-[15px] font-bold text-ink">Lead Caller</h1>
            <p className="text-[11px] text-ink-muted">Restaurant outreach tracker</p>
          </div>
        </div>

        <nav className="ml-2 flex items-center gap-1 rounded-card bg-surface-muted p-1" aria-label="Views">
          {['leads', 'report', 'types'].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => onViewChange(v)}
              aria-current={view === v}
              className={`cursor-pointer rounded-md px-3 py-1.5 text-[12px] font-semibold capitalize transition-colors duration-200 ${
                view === v ? 'bg-surface-card text-primary shadow-card' : 'text-ink-muted hover:text-ink'
              }`}
            >
              {v}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 rounded-card border border-line bg-surface-muted px-3 py-1.5">
            <MdDoneAll size={15} className="text-primary" aria-hidden="true" />
            <span className="font-mono text-[13px] font-semibold text-ink">
              {totalDone}/{totalCallable}
            </span>
            <span className="text-[11px] text-ink-muted">total</span>
            <span className="h-1.5 w-14 overflow-hidden rounded-full bg-line" role="presentation">
              <span
                className="block h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${totalPct}%` }}
              />
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-card border border-line bg-surface-muted px-3 py-1.5">
            <MdTrackChanges size={15} className="text-accent" aria-hidden="true" />
            <span className="font-mono text-[13px] font-semibold text-ink">
              {todayDone}/{dailyTarget}
            </span>
            <span className="text-[11px] text-ink-muted">today</span>
            <span className="h-1.5 w-14 overflow-hidden rounded-full bg-line" role="presentation">
              <span
                className="block h-full rounded-full bg-accent transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-2 border-t border-line px-4 py-2.5">
        <Picker
          label="Country"
          value={filters.country}
          onChange={(v) => onChange({ country: v, city: '' })}
          native={native}
          options={[
            { value: '', label: 'All countries' },
            ...countries.map((c) => ({ value: c, label: c })),
          ]}
        />

        <Picker
          label="City"
          value={filters.city}
          onChange={(v) => onChange({ city: v, day: '', category: '' })}
          native={native}
          options={[
            { value: '', label: 'All cities' },
            ...cityOptions.map((c) => ({ value: c.city, label: `${c.city} (${c.total})` })),
          ]}
        />

        <Picker
          label="Type"
          value={filters.category}
          onChange={(v) => onChange({ category: v })}
          native={native}
          width={196}
          options={[
            { value: '', label: 'All types' },
            ...categories.map((c) => ({
              value: c.category,
              label: c.category,
              hint: `${c.sellable}/${c.total}`,
              native: `${c.category} — ${c.sellable}/${c.total}`,
            })),
          ]}
        />

        <Picker
          label="Website"
          value={filters.website}
          onChange={(v) => onChange({ website: v })}
          native={native}
          width={140}
          options={[
            { value: '', label: 'All' },
            { value: 'no', label: 'No website' },
            { value: 'yes', label: 'Has website' },
          ]}
        />

        <TextField
          size="small"
          placeholder="Search name, phone, category"
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          sx={{
            minWidth: 260,
            '& .MuiInputBase-root': { backgroundColor: '#FFFFFF', height: 38 },
            '& .MuiInputBase-input': { fontSize: 13 },
          }}
          slotProps={{
            input: {
              startAdornment: <MdSearch size={17} className="mr-2 shrink-0 text-ink-muted" aria-hidden="true" />,
            },
          }}
        />

        <Tooltip title="Reload leads">
          <IconButton onClick={onRefresh} size="small" aria-label="Reload leads" className="!border !border-line !bg-white">
            <MdRefresh size={17} className={loading ? 'animate-spin text-primary' : 'text-ink-muted'} />
          </IconButton>
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;
