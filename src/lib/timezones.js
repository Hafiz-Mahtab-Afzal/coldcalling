// Which clock the people being called are living by, not ours.
const BY_COUNTRY = {
  Portugal: 'Europe/Lisbon',
  Malta: 'Europe/Malta',
  Ireland: 'Europe/Dublin',
  Spain: 'Europe/Madrid',
  Malaysia: 'Asia/Kuala_Lumpur',
};

// Madeira keeps mainland time, the Azores are an hour behind it
const BY_CITY = {
  Funchal: 'Atlantic/Madeira',
  'Ponta Delgada': 'Atlantic/Azores',
  'Angra do Heroismo': 'Atlantic/Azores',
};

export const zoneFor = (country, city) => BY_CITY[city] || BY_COUNTRY[country] || null;

export const timeIn = (zone, at = new Date()) => {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: zone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
      .format(at)
      .toLowerCase()
      .replace(/\s+/g, '');
  } catch {
    return null;
  }
};
