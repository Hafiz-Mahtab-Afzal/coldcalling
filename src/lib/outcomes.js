export const OUTCOMES = [
  {
    value: 'no_answer',
    label: 'No answer',
    short: 'No answer',
    chip: 'bg-amber-50 text-amber-700 border-amber-200',
    bar: 'bg-amber-400',
  },
  {
    value: 'no_whatsapp',
    label: 'No WhatsApp',
    short: 'No WhatsApp',
    chip: 'bg-stone-100 text-stone-600 border-stone-300',
    bar: 'bg-stone-400',
    dead: true,
  },
  {
    value: 'number_deleted',
    label: 'Deleted the number',
    short: 'Deleted',
    chip: 'bg-stone-100 text-stone-600 border-stone-300',
    bar: 'bg-stone-600',
    dead: true,
  },
  {
    value: 'owner_absent',
    label: 'Owner not there',
    short: 'No owner',
    chip: 'bg-orange-50 text-orange-700 border-orange-200',
    bar: 'bg-orange-400',
  },
  {
    value: 'call_later',
    label: 'Busy, call later',
    short: 'Busy, later',
    chip: 'bg-blue-50 text-primary border-blue-200',
    bar: 'bg-primary',
  },
  {
    value: 'tell_tomorrow',
    label: 'Will tell tomorrow',
    short: 'Tell tomorrow',
    chip: 'bg-violet-50 text-violet-700 border-violet-200',
    bar: 'bg-violet-400',
  },
  {
    value: 'partner_ask',
    label: 'Will ask the partner',
    short: 'Ask partner',
    chip: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    bar: 'bg-indigo-400',
  },
  {
    value: 'already_called',
    label: 'Already called',
    short: 'Already called',
    chip: 'bg-stone-100 text-stone-600 border-stone-300',
    bar: 'bg-stone-500',
    dead: true,
  },
  {
    value: 'already_arranged',
    label: 'Already asked someone',
    short: 'Already asked',
    chip: 'bg-slate-100 text-slate-700 border-slate-200',
    bar: 'bg-slate-400',
  },
  {
    value: 'has_website',
    label: 'Already has a website',
    short: 'Has website',
    chip: 'bg-stone-100 text-stone-600 border-stone-300',
    bar: 'bg-stone-500',
    dead: true,
  },
  {
    value: 'reason_pakistan',
    label: 'Reason: from Pakistan',
    short: 'From Pakistan',
    chip: 'bg-stone-100 text-stone-600 border-stone-300',
    bar: 'bg-stone-700',
    dead: true,
  },
  {
    value: 'not_interested',
    label: 'Not interested',
    short: 'Not interested',
    chip: 'bg-red-50 text-danger border-red-200',
    bar: 'bg-danger',
    dead: true,
  },
  {
    value: 'agreed',
    label: 'Selling now, agreed',
    short: 'Selling now',
    chip: 'bg-teal-50 text-teal-700 border-teal-200',
    bar: 'bg-teal-500',
    dead: true,
  },
  {
    value: 'done',
    label: 'Sold',
    short: 'Sold',
    chip: 'bg-emerald-50 text-accent border-emerald-200',
    bar: 'bg-accent',
    dead: true,
  },
];

export const OUTCOME_MAP = Object.fromEntries(OUTCOMES.map((o) => [o.value, o]));

export const DEAD_OUTCOMES = OUTCOMES.filter((o) => o.dead).map((o) => o.value);

export const isDead = (outcomes) => (outcomes || []).some((o) => DEAD_OUTCOMES.includes(o));

export const outcomeLabel = (value) => OUTCOME_MAP[value]?.label ?? value;
