import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2563EB', contrastText: '#FFFFFF' },
    secondary: { main: '#3B82F6' },
    success: { main: '#059669', contrastText: '#FFFFFF' },
    error: { main: '#DC2626', contrastText: '#FFFFFF' },
    background: { default: '#F8FAFC', paper: '#FFFFFF' },
    text: { primary: '#0F172A', secondary: '#475569' },
    divider: '#E4ECFC',
  },
  typography: {
    fontFamily: "'Fira Sans', ui-sans-serif, system-ui, sans-serif",
    fontSize: 14,
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiTooltip: { defaultProps: { arrow: true } },
  },
});

export default theme;
