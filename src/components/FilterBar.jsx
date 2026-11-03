import { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { MdSearch, MdClose, MdTune, MdExpandMore, MdRestartAlt } from 'react-icons/md';

const selectClass =
  'h-11 w-full min-w-0 cursor-pointer appearance-none truncate rounded-xl border border-line bg-card pl-3 pr-9 text-[13.5px] font-medium text-ink transition-colors duration-180 hover:border-line-strong focus:border-accent';

const useIsDesktop = () => {
  const query = '(min-width: 1024px)';
  const [wide, setWide] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : true
  );

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia(query);
    const onChange = (e) => setWide(e.matches);
    setWide(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return wide;
};

const Field = ({ label, children, className = '' }) => (
  <label className={`flex min-w-0 flex-col gap-1.5 ${className}`}>
    <span className="pl-0.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-muted">{label}</span>
    {children}
  </label>
);

const Select = ({ label, value, onChange, options }) => (
  <Field label={label}>
    <span className="relative block w-full">
      <select className={selectClass} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <MdExpandMore
        size={19}
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-faint"
        aria-hidden="true"
      />
    </span>
  </Field>
);

const FilterBar = ({ filters, countries, cities, categories, onChange, onReset }) => {
  const [open, setOpen] = useState(false);
  const desktop = useIsDesktop();

  const cityOptions = filters.country ? cities.filter((c) => c.country === filters.country) : cities;
  const typeOptions = categories.filter((c) => c.sellable > 0);

  const selects = (
    <>
      <Select
        label="Country"
        value={filters.country}
        onChange={(v) => onChange({ country: v, city: '', category: '' })}
        options={[{ value: '', label: 'All countries' }, ...countries.map((c) => ({ value: c, label: c }))]}
      />
      <Select
        label="City"
        value={filters.city}
        onChange={(v) => onChange({ city: v, day: '', category: '' })}
        options={[
          { value: '', label: `All cities (${cityOptions.length})` },
          ...cityOptions.map((c) => ({ value: c.city, label: `${c.city} · ${c.total}` })),
        ]}
      />
      <Select
        label="Type"
        value={filters.category}
        onChange={(v) => onChange({ category: v })}
        options={[
          {
            value: '',
            label: typeOptions.length ? `All types (${typeOptions.length})` : 'No type left to call',
          },
          ...typeOptions.map((c) => ({ value: c.category, label: `${c.category} · ${c.sellable}/${c.total}` })),
        ]}
      />
      <Select
        label="Website"
        value={filters.website}
        onChange={(v) => onChange({ website: v })}
        options={[
          { value: '', label: 'Website: any' },
          { value: 'no', label: 'No website' },
          { value: 'yes', label: 'Has website' },
        ]}
      />
    </>
  );

  const activeCount = ['country', 'city', 'category', 'website'].filter((k) => filters[k]).length;

  return (
    <section aria-label="Filters">
      <div className="flex items-end gap-2 lg:gap-2.5">
        {desktop && <div className="grid flex-1 grid-cols-4 gap-2.5">{selects}</div>}

        <Field label="Search" className="flex-1 lg:w-[260px] lg:flex-none">
          <span className="relative block w-full">
            <MdSearch
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
              aria-hidden="true"
            />
            <input
              type="search"
              value={filters.search}
              onChange={(e) => onChange({ search: e.target.value })}
              placeholder="Name, phone or type"
              aria-label="Search leads"
              className="h-11 w-full rounded-xl border border-line bg-card pl-9 pr-3 text-[13.5px] text-ink outline-none transition-colors duration-180 placeholder:text-ink-faint hover:border-line-strong focus:border-accent"
            />
          </span>
        </Field>

        {desktop ? (
          activeCount > 0 && (
            <button
              type="button"
              onClick={onReset}
              className="flex h-11 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-line bg-card px-3.5 text-[13px] font-semibold text-ink-muted transition-colors duration-180 hover:border-line-strong hover:text-ink"
            >
              <MdRestartAlt size={18} aria-hidden="true" />
              Reset
            </button>
          )
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-11 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-line bg-card px-3.5 text-[13px] font-semibold text-ink shadow-card transition-colors duration-180 hover:border-line-strong"
          >
            <MdTune size={18} aria-hidden="true" />
            Filters
            {activeCount > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-pill bg-accent px-1 font-mono text-[11px] text-accent-ink">
                {activeCount}
              </span>
            )}
          </button>
        )}
      </div>

      {!desktop && (
        <Drawer
          anchor="bottom"
          open={open}
          onClose={() => setOpen(false)}
          slotProps={{ paper: { sx: { borderRadius: '22px 22px 0 0', maxHeight: '86vh' } } }}
        >
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <h2 className="text-[15px] font-bold text-ink">Filters</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close filters"
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-pill text-ink-muted transition-colors duration-180 hover:bg-card-2 hover:text-ink"
            >
              <MdClose size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-3.5 overflow-y-auto px-4 py-4">{selects}</div>

          <div className="flex gap-2.5 border-t border-line px-4 pb-6 pt-3">
            <button
              type="button"
              onClick={onReset}
              className="h-12 flex-1 cursor-pointer rounded-xl border border-line bg-card text-[13.5px] font-semibold text-ink-muted transition-colors duration-180 hover:text-ink"
            >
              Reset all
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-12 flex-[2] cursor-pointer rounded-xl bg-accent text-[13.5px] font-semibold text-accent-ink transition-opacity duration-180 hover:opacity-90"
            >
              Show leads
            </button>
          </div>
        </Drawer>
      )}
    </section>
  );
};

export default FilterBar;
