import { num } from '../lib/format';

const Tile = ({ label, value, sub, hero }) => (
  <div
    className={`flex min-w-0 flex-col justify-between rounded-tile px-4 py-4 sm:px-5 sm:py-5 ${
      hero ? 'ember-hero text-accent-ink shadow-pop' : 'bg-card text-ink shadow-card'
    }`}
  >
    <span
      className={`truncate text-[12px] font-medium ${hero ? 'text-accent-ink' : 'text-ink-muted'}`}
    >
      {label}
    </span>
    <p className="tabular mt-2.5 truncate text-[30px] font-medium leading-none sm:mt-4 sm:text-[40px]">{value}</p>
    <p className={`mt-2 truncate text-[12px] sm:mt-3 ${hero ? 'font-medium text-accent-ink' : 'text-ink-muted'}`}>{sub}</p>
  </div>
);

const StatTiles = ({ progress, dailyTarget }) => {
  const { todayDone = 0, totalDone = 0, totalCallable = 0 } = progress || {};
  const left = Math.max(0, totalCallable - totalDone);
  const totalPct = totalCallable ? Math.round((totalDone / totalCallable) * 100) : 0;
  const days = dailyTarget ? Math.ceil(left / dailyTarget) : 0;

  return (
    <section className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4" aria-label="Progress">
      <div className="col-span-2">
        <Tile
          hero
          label="Called today"
          value={`${todayDone}/${dailyTarget}`}
          sub={todayDone >= dailyTarget ? 'Target cleared for today' : `${dailyTarget - todayDone} calls left today`}
        />
      </div>
      <Tile label="Done so far" value={num(totalDone)} sub={`${totalPct}% of ${num(totalCallable)} callable`} />
      <Tile
        label="Still to call"
        value={num(left)}
        sub={days ? `About ${days} days at ${dailyTarget} a day` : 'All leads actioned'}
      />
    </section>
  );
};

export default StatTiles;
