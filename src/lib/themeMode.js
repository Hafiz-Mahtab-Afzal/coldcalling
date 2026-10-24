import { useCallback, useEffect, useState } from 'react';

const KEY = 'leadcaller-theme';

const read = () => {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    return 'light';
  }
  return 'light';
};

export const useThemeMode = () => {
  const [mode, setMode] = useState(read);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    try {
      localStorage.setItem(KEY, mode);
    } catch {
      /* private mode, keep the in-memory value */
    }
  }, [mode]);

  const toggle = useCallback(() => setMode((m) => (m === 'dark' ? 'light' : 'dark')), []);

  return { mode, setMode, toggle };
};

export default useThemeMode;
