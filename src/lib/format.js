export const waLink = (phone) => {
  const digits = (phone || '').replace(/[^\d]/g, '');
  return digits ? `https://wa.me/${digits}` : '';
};

export const telLink = (phone) => {
  const clean = (phone || '').replace(/\s+/g, '');
  return clean ? `tel:${clean}` : '';
};

export const siteLabel = (url) => {
  if (!url) return '';
  return url.replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/\/$/, '');
};

export const siteHref = (url) => {
  if (!url) return '';
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

export const compact = (n) => new Intl.NumberFormat('en', { notation: 'compact' }).format(n || 0);
