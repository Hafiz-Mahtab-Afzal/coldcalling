const PageHeading = ({ title, subtitle, action }) => (
  <div className="flex flex-wrap items-end justify-between gap-3 pt-1">
    <div className="min-w-0">
      <h2 className="truncate text-[26px] font-bold leading-none tracking-[-0.02em] text-ink sm:text-[34px]">
        {title}
      </h2>
      <p className="mt-1.5 truncate text-[12.5px] text-ink-muted">{subtitle}</p>
    </div>
    {action}
  </div>
);

export const PillButton = ({ onClick, icon, children, tone = 'dark' }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-pill px-4 text-[12.5px] font-semibold transition-opacity duration-180 hover:opacity-90 ${
      tone === 'accent' ? 'bg-accent text-accent-ink' : 'bg-ink text-card'
    }`}
  >
    {icon}
    {children}
  </button>
);

export default PageHeading;
