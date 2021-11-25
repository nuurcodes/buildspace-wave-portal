import {
  createTheme,
  responsiveFontSizes,
  ThemeOptions,
} from '@mui/material/styles'

const baseThemeOptions: ThemeOptions = {
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: [
      'inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    button: {
      textTransform: 'none',
    },
    h1: { fontWeight: 'bold' },
    h2: { fontWeight: 'bold' },
    h3: { fontWeight: 'bold' },
    h4: { fontWeight: 'bold' },
    h5: { fontWeight: 'bold' },
    h6: { fontWeight: 'bold' },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        disableRipple: true,
        disableElevation: true,
      },
    },
    MuiLink: {
      defaultProps: {
        sx: {
          fontWeight: 'bold',
        },
      },
    },
    MuiDialogActions: {
      defaultProps: {
        sx: {
          padding: 3,
        },
      },
    },
    MuiStack: {
      defaultProps: {
        sx: {
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },
  },
}

const _lightTheme = createTheme({
  ...baseThemeOptions,
})

const _darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    ...baseThemeOptions.palette,
    mode: 'dark',
  },
})

export const lightTheme = responsiveFontSizes(_lightTheme)
export const darkTheme = responsiveFontSizes(_darkTheme)
