import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import { darkTheme, lightTheme } from '@styles/theme'
import { useDarkMode } from 'usehooks-ts'
import { config } from '@config/core'
import { DAppProvider } from '@usedapp/core'
import { SnackbarProvider } from 'notistack'
import { ErrorBoundary } from 'react-error-boundary'
import GlobalErrorFallback from '@components/fallback/GlobalErrorFallback'
import CustomTxSnackbar from '@src/components/snackbar/CustomTxSnackbar'
import CustomSnackbar from '@src/components/snackbar/CustomSnackbar'
import TxNotifications from '@components/shared/TxNotifications'
import NiceModal from '@ebay/nice-modal-react'
import Router from 'next/router'

import Head from 'next/head'

import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/700.css'

function MyApp({ Component, pageProps }: AppProps) {
  const { isDarkMode } = useDarkMode()
  const [theme, setTheme] = useState(lightTheme)

  useEffect(() => {
    return isDarkMode ? setTheme(darkTheme) : setTheme(lightTheme)
  }, [isDarkMode])

  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <DAppProvider config={config}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ErrorBoundary
            FallbackComponent={GlobalErrorFallback}
            onReset={() => Router.reload()}
          >
            <SnackbarProvider
              maxSnack={1}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              Components={{
                error: CustomSnackbar,
                warning: CustomSnackbar,
                info: CustomSnackbar,
                success: CustomSnackbar,
                txInfo: CustomTxSnackbar,
                txError: CustomTxSnackbar,
                txSuccess: CustomTxSnackbar,
              }}
            >
              <TxNotifications />
              <NiceModal.Provider>
                <Component {...pageProps} />
              </NiceModal.Provider>
            </SnackbarProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </DAppProvider>
    </>
  )
}
export default MyApp
