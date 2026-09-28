import { useCallback, useEffect, useRef, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { MdInbox, MdWarning } from 'react-icons/md';
import http, { errorText } from './lib/http';
import apis from './config/apis';
import Header from './components/Header';
import OutcomeTabs from './components/OutcomeTabs';
import DayStrip from './components/DayStrip';
import LeadsGrid from './components/LeadsGrid';
import TargetDialog from './components/TargetDialog';
import ReportPanel from './components/ReportPanel';
import './css/style.css';

const EMPTY_FILTERS = { country: '', city: '', category: '', outcome: '', day: '', website: '', search: '' };

const App = () => {
  const [view, setView] = useState('leads');
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dailyTarget, setDailyTarget] = useState(50);

  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [scopeTotal, setScopeTotal] = useState(0);
  const [counts, setCounts] = useState({});
  const [days, setDays] = useState([]);
  const [todayDone, setTodayDone] = useState(0);
  const [stats, setStats] = useState(null);
  const [months, setMonths] = useState([]);
  const [month, setMonth] = useState('');

  const [loading, setLoading] = useState(false);
  const [booting, setBooting] = useState(true);
  const [bootError, setBootError] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [celebrated, setCelebrated] = useState(null);
  const celebratedDays = useRef(new Set());
  const latestOutcomes = useRef(new Map());
  const writeQueue = useRef(new Map());

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(filters.search), 350);
    return () => clearTimeout(t);
  }, [filters.search]);

  const boot = useCallback(async () => {
    setBooting(true);
    setBootError(null);
    try {
      const { data } = await http.get(apis.filters);
      setCountries(data.countries || []);
      setCities(data.cities || []);
      setCategories(data.categories || []);
      setDailyTarget(data.dailyTarget || 50);
    } catch (err) {
      setBootError(errorText(err));
    } finally {
      setBooting(false);
    }
  }, []);

  useEffect(() => {
    boot();
  }, [boot]);

  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await http.get(apis.filters, {
        params: { country: filters.country || undefined, city: filters.city || undefined },
      });
      setCategories(data.categories || []);
    } catch {
      setCategories([]);
    }
  }, [filters.country, filters.city]);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await http.get(apis.leads, {
        params: {
          country: filters.country || undefined,
          city: filters.city || undefined,
          category: filters.category || undefined,
          outcome: filters.outcome || undefined,
          day: filters.day || undefined,
          website: filters.website || undefined,
          search: debouncedSearch || undefined,
          page,
          limit: pageSize,
        },
      });
      const mapped = (data.rows || []).map((r, i) => ({
        ...r,
        id: r._id,
        serial: (page - 1) * pageSize + i + 1,
      }));
      latestOutcomes.current = new Map(mapped.map((r) => [r.id, r.outcomes || []]));
      setRows(mapped);
      setTotal(data.total || 0);
      setScopeTotal(data.scopeTotal || 0);
      setCounts(data.counts || {});
    } catch (err) {
      setToast({ type: 'error', text: errorText(err) });
    } finally {
      setLoading(false);
    }
  }, [
    filters.country,
    filters.city,
    filters.category,
    filters.outcome,
    filters.day,
    filters.website,
    debouncedSearch,
    page,
    pageSize,
  ]);

  const fetchDays = useCallback(async () => {
    if (!filters.city) {
      setDays([]);
      setTodayDone(0);
      return;
    }
    try {
      const since = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
      const { data } = await http.get(apis.days, { params: { city: filters.city, since } });
      setDays(data.days || []);
      setTodayDone(data.todayDone || 0);
    } catch {
      setDays([]);
    }
  }, [filters.city]);

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await http.get(apis.stats, {
        params: { city: filters.city || undefined, country: filters.country || undefined, month: month || undefined },
      });
      setStats(data);
      setMonths(data.availableMonths || []);
    } catch (err) {
      setToast({ type: 'error', text: errorText(err) });
    }
  }, [filters.city, filters.country, month]);

  useEffect(() => {
    if (!booting) fetchLeads();
  }, [booting, fetchLeads]);

  useEffect(() => {
    if (!booting) fetchDays();
  }, [booting, fetchDays]);

  useEffect(() => {
    if (!booting) fetchCategories();
  }, [booting, fetchCategories]);

  useEffect(() => {
    if (!booting && view === 'report') fetchStats();
  }, [booting, view, fetchStats]);

  useEffect(() => {
    if (!filters.day) return;
    const active = days.find((d) => String(d.day) === String(filters.day));
    if (!active || active.total === 0) return;
    const key = `${filters.city}-${active.day}`;
    if (active.actioned >= active.total && !celebratedDays.current.has(key)) {
      celebratedDays.current.add(key);
      setCelebrated({ day: active.day, count: active.total });
    }
  }, [days, filters.day, filters.city]);

  const handleOutcomeToggle = (id, value, on) => {
    const row = rows.find((r) => r.id === id);
    if (!row || row.hasWebsite) return;

    const before = latestOutcomes.current.get(id) ?? row.outcomes ?? [];
    const next = on ? [...new Set([...before, value])] : before.filter((o) => o !== value);

    latestOutcomes.current.set(id, next);
    setSavingId(id);
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, outcomes: next } : r)));

    setCounts((prev) => {
      const copy = { ...prev };
      copy[value] = Math.max(0, (copy[value] ?? 0) + (on ? 1 : -1));
      if (before.length === 0 && next.length > 0) copy.none = Math.max(0, (copy.none ?? 0) - 1);
      if (before.length > 0 && next.length === 0) copy.none = (copy.none ?? 0) + 1;
      return copy;
    });

    const send = (writeQueue.current.get(id) ?? Promise.resolve())
      .then(() => http.patch(`${apis.leads}/${id}`, { outcomes: next }))
      .then(() => {
        if (writeQueue.current.get(id) === send) {
          writeQueue.current.delete(id);
          setSavingId((cur) => (cur === id ? null : cur));
          fetchDays();
          if (filters.outcome) fetchLeads();
        }
      })
      .catch((err) => {
        latestOutcomes.current.set(id, before);
        setRows((prev) => prev.map((r) => (r.id === id ? { ...r, outcomes: before } : r)));
        writeQueue.current.delete(id);
        setSavingId((cur) => (cur === id ? null : cur));
        setToast({ type: 'error', text: errorText(err) });
        fetchLeads();
      });

    writeQueue.current.set(id, send);
  };

  const updateFilters = (patch) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
  };

  if (booting) {
    return (
      <div className="grid min-h-screen place-items-center">
        <CircularProgress size={26} />
      </div>
    );
  }

  if (bootError) {
    return (
      <div className="grid min-h-screen place-items-center px-4">
        <div className="max-w-sm rounded-card border border-line bg-surface-card p-6 text-center shadow-card">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-red-50 text-danger">
            <MdWarning size={24} aria-hidden="true" />
          </span>
          <h1 className="mt-4 text-[16px] font-bold text-ink">Server not responding</h1>
          <p className="mt-1.5 text-[13px] text-ink-muted">{bootError}</p>
          <Button onClick={boot} variant="contained" fullWidth sx={{ marginTop: '20px', height: 40 }}>
            Try again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header
        filters={filters}
        countries={countries}
        cities={cities}
        categories={categories}
        onChange={updateFilters}
        onRefresh={() => {
          fetchLeads();
          fetchDays();
          if (view === 'report') fetchStats();
        }}
        loading={loading}
        todayDone={todayDone}
        dailyTarget={dailyTarget}
        view={view}
        onViewChange={setView}
      />

      <main className="mx-auto max-w-[1600px] space-y-4 px-4 py-4">
        {view === 'leads' ? (
          <>
            <OutcomeTabs
              active={filters.outcome}
              counts={counts}
              total={scopeTotal}
              onChange={(outcome) => updateFilters({ outcome })}
            />
            <DayStrip days={days} active={filters.day} onChange={(day) => updateFilters({ day })} />

            {!cities.length ? (
              <div className="grid place-items-center gap-2 rounded-card border border-dashed border-line bg-surface-card py-20 text-center">
                <MdInbox size={28} className="text-ink-muted" aria-hidden="true" />
                <p className="text-[14px] font-semibold text-ink">No leads yet</p>
                <p className="max-w-sm text-[12px] text-ink-muted">
                  Import a scraped city with the server import script, then pick it from the City filter above.
                </p>
              </div>
            ) : (
              <LeadsGrid
                rows={rows}
                loading={loading}
                total={total}
                page={page}
                pageSize={pageSize}
                onPaginationChange={(p, s) => {
                  setPage(p);
                  setPageSize(s);
                }}
                onOutcomeToggle={handleOutcomeToggle}
                savingId={savingId}
              />
            )}
          </>
        ) : (
          <ReportPanel stats={stats} months={months} month={month} onMonthChange={setMonth} city={filters.city} />
        )}
      </main>

      <TargetDialog
        open={Boolean(celebrated)}
        day={celebrated?.day}
        count={celebrated?.count}
        onClose={() => setCelebrated(null)}
      />

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={4000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={toast?.type || 'info'} variant="filled" onClose={() => setToast(null)} sx={{ fontSize: 13 }}>
          {toast?.text}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default App;
