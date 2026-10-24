import { createTheme } from '@mui/material/styles';

const TOKENS = {
  light: {
    bg: '#F0EDF3',
    card: '#FDFDFD',
    card2: '#F6F4F9',
    ink: '#171419',
    inkMuted: '#635E6B',
    line: '#E3DFE9',
  },
  dark: {
    bg: '#100D13',
    card: '#17141A',
    card2: '#1E1A22',
    ink: '#F9F6FC',
    inkMuted: '#A39CAD',
    line: '#262130',
  },
};

const ACCENT = '#EA6D33';

export const buildTheme = (mode) => {
  const t = TOKENS[mode] || TOKENS.light;

  return createTheme({
    palette: {
      mode,
      primary: { main: ACCENT, contrastText: '#FFFFFF' },
      secondary: { main: mode === 'dark' ? '#A39CAD' : '#635E6B' },
      success: { main: mode === 'dark' ? '#34D399' : '#059669', contrastText: '#FFFFFF' },
      warning: { main: mode === 'dark' ? '#FBBF24' : '#D97706', contrastText: '#FFFFFF' },
      error: { main: mode === 'dark' ? '#F87171' : '#DC2626', contrastText: '#FFFFFF' },
      background: { default: t.bg, paper: t.card },
      text: { primary: t.ink, secondary: t.inkMuted },
      divider: t.line,
    },
    typography: {
      fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
      fontSize: 14,
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: { borderRadius: 14 },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: { root: { borderRadius: 999 } },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none', border: `1px solid ${t.line}` },
        },
      },
      MuiDialog: { styleOverrides: { paper: { borderRadius: 20 } } },
      MuiTooltip: {
        defaultProps: { arrow: true },
        styleOverrides: {
          tooltip: {
            backgroundColor: mode === 'dark' ? '#2A2532' : '#171419',
            fontSize: 12,
            borderRadius: 8,
            padding: '6px 10px',
          },
          arrow: { color: mode === 'dark' ? '#2A2532' : '#171419' },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: t.card,
            borderRadius: 12,
            '& fieldset': { borderColor: t.line },
            '&:hover fieldset': { borderColor: t.inkMuted },
          },
          input: { color: t.ink },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: { borderRadius: 14, marginTop: 4, backgroundColor: t.card },
        },
      },
      MuiDrawer: { styleOverrides: { paper: { backgroundImage: 'none' } } },
    },
  });
};

export default buildTheme('light');
