const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const apis = {
  base: BASE,
  leads: `${BASE}/api/leads`,
  filters: `${BASE}/api/leads/filters`,
  days: `${BASE}/api/leads/days`,
  today: `${BASE}/api/leads/today`,
  stats: `${BASE}/api/leads/stats`,
  health: `${BASE}/api/health`,
};

export default apis;
