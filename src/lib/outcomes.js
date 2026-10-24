const TONES = {
  warn: { chip: 'bg-warn-soft text-warn-ink border-warn/25', dot: 'bg-warn', bar: 'bg-warn' },
  accent: { chip: 'bg-accent-soft text-accent border-accent/30', dot: 'bg-accent', bar: 'bg-accent' },
  info: { chip: 'bg-info-soft text-info-ink border-info/25', dot: 'bg-info', bar: 'bg-info' },
  ok: { chip: 'bg-ok-soft text-ok-ink border-ok/25', dot: 'bg-ok', bar: 'bg-ok' },
  bad: { chip: 'bg-bad-soft text-bad-ink border-bad/25', dot: 'bg-bad', bar: 'bg-bad' },
  neutral: { chip: 'bg-card-2 text-ink-muted border-line', dot: 'bg-ink-faint', bar: 'bg-ink-faint' },
};

const define = (value, label, short, tone, dead = false) => ({
  value,
  label,
  short,
  tone,
  dead,
  chip: TONES[tone].chip,
  dot: TONES[tone].dot,
  bar: TONES[tone].bar,
});

export const OUTCOMES = [
  define('no_answer', 'No answer', 'No answer', 'warn'),
  define('no_whatsapp', 'No WhatsApp', 'No WhatsApp', 'neutral', true),
  define('number_deleted', 'Deleted the number', 'Deleted', 'neutral', true),
  define('owner_absent', 'Owner not there', 'No owner', 'accent'),
  define('call_later', 'Busy, call later', 'Busy, later', 'info'),
  define('tell_tomorrow', 'Will tell tomorrow', 'Tell tomorrow', 'info'),
  define('will_think', 'Will think about it', 'Thinking', 'info'),
  define('partner_ask', 'Will ask the partner', 'Ask partner', 'info'),
  define('already_called', 'Already called', 'Already called', 'neutral', true),
  define('already_arranged', 'Already asked someone', 'Already asked', 'neutral'),
  define('has_website', 'Already has a website', 'Has website', 'neutral', true),
  define('reason_pakistan', 'Reason: from Pakistan', 'From Pakistan', 'neutral', true),
  define('not_interested', 'Not interested', 'Not interested', 'bad', true),
  define('agreed', 'Selling now, agreed', 'Selling now', 'ok', true),
  define('done', 'Sold', 'Sold', 'ok', true),
];

export const OUTCOME_MAP = Object.fromEntries(OUTCOMES.map((o) => [o.value, o]));

export const DEAD_OUTCOMES = OUTCOMES.filter((o) => o.dead).map((o) => o.value);

export const isDead = (outcomes) => (outcomes || []).some((o) => DEAD_OUTCOMES.includes(o));

export const outcomeLabel = (value) => OUTCOME_MAP[value]?.label ?? value;
