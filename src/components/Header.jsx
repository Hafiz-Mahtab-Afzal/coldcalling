import { MdPhoneInTalk, MdRefresh, MdLightMode, MdDarkMode } from 'react-icons/md';
import Tooltip from '@mui/material/Tooltip';

const VIEWS = [
  { value: 'leads', label: 'Leads' },
  { value: 'report', label: 'Report' },
  { value: 'types', label: 'Types' },
];

const RoundButton = ({ label, onClick, children, spinning }) => (
  <Tooltip title={label}>
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-pill bg-card text-ink-muted shadow-card transition-colors duration-180 hover:text-ink"
    >
      <span className={spinning ? 'block animate-spin text-accent' : 'block'}>{children}</span>
    </button>
  </Tooltip>
);

const Header = ({ view, onViewChange, onRefresh, loading, mode, onToggleMode }) => (
  <header className="sticky top-0 z-30 bg-shell/90 px-3 pb-2.5 pt-3 backdrop-blur-md sm:px-5 sm:pt-4">
    <div className="mx-auto flex max-w-[1680px] flex-wrap items-center gap-2 sm:gap-3">
      <div className="flex min-w-0 flex-1 items-center gap-2 rounded-pill bg-card py-1.5 pl-1.5 pr-3 shadow-card sm:flex-none sm:gap-2.5 sm:pr-4">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-pill bg-accent text-accent-ink">
          <MdPhoneInTalk size={17} aria-hidden="true" />
        </span>
        <div className="min-w-0 leading-none">
          <h1 className="truncate text-[14px] font-bold tracking-tight text-ink sm:text-[15px]">Lead Caller</h1>
          <p className="mt-0.5 truncate text-[11px] text-ink-muted">Restaurant outreach</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:order-last sm:ml-auto">
        <RoundButton
          label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={onToggleMode}
        >
          {mode === 'dark' ? <MdLightMode size={18} /> : <MdDarkMode size={18} />}
        </RoundButton>
        <RoundButton label="Reload leads" onClick={onRefresh} spinning={loading}>
          <MdRefresh size={19} />
        </RoundButton>
      </div>

      <nav
        className="flex w-full min-w-0 items-center gap-1 rounded-pill bg-card p-1 shadow-card sm:w-auto"
        aria-label="Views"
      >
        {VIEWS.map((v) => {
          const on = view === v.value;
          return (
            <button
              key={v.value}
              type="button"
              onClick={() => onViewChange(v.value)}
              aria-current={on ? 'page' : undefined}
              className={`flex-1 cursor-pointer rounded-pill px-3.5 py-2 text-[12.5px] font-semibold transition-colors duration-180 sm:flex-none sm:px-5 sm:text-[13px] ${
                on ? 'bg-ink text-card' : 'text-ink-muted hover:text-ink'
              }`}
            >
              {v.label}
            </button>
          );
        })}
      </nav>
    </div>
  </header>
);

export default Header;
