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

export const mapsHref = ({ placeId, name, address }) => {
  if (placeId) return `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(placeId)}`;
  const query = [name, address].filter(Boolean).join(' ');
  return query ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}` : '';
};
