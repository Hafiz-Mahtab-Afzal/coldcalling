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

export const mapsHref = ({ mapsUrl, cid, lat, lng, placeId, name, address }) => {
  if (mapsUrl) return mapsUrl;
  if (cid) return `https://maps.google.com/?cid=${encodeURIComponent(cid)}`;

  const base = 'https://www.google.com/maps/search/?api=1&query=';
  if (lat != null && lng != null) {
    const pin = placeId ? `&query_place_id=${encodeURIComponent(placeId)}` : '';
    return `${base}${lat},${lng}${pin}`;
  }

  const query = [name, address].filter(Boolean).join(' ');
  return query ? `${base}${encodeURIComponent(query)}` : '';
};
