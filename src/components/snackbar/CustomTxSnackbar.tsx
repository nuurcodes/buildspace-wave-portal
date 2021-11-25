import React, { ForwardedRef, forwardRef } from 'react'
import { Alert, AlertColor, CircularProgress, IconButton } from '@mui/material'
import { getExplorerTransactionLink, Notification } from '@usedapp/core'
import { CustomContentProps, useSnackbar } from 'notistack'
import CloseIcon from '@mui/icons-material/Close'
import LinkIcon from '@mui/icons-material/Link'

// eslint-disable-next-line react/display-name
const CustomTxSnackbar = forwardRef(
  (
    props: CustomContentProps & { notification: any },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { closeSnackbar } = useSnackbar()
    const { variant, message, notification } = props

    const alertColor = variant
      .toLocaleLowerCase()
      .replace('tx', '') as AlertColor

    const alertIcon =
      alertColor === 'info' ? (
        <CircularProgress size={20} color='inherit' />
      ) : undefined

    return (
      <div ref={ref}>
        <Alert
          onClose={() => closeSnackbar()}
          variant='filled'
          action={
            <>
              <IconButton
                aria-label='etherscan'
                sx={{ color: 'white' }}
                onClick={() => {
                  const linkAddress = getExplorerTransactionLink(
                    notification.transaction.hash,
                    notification.transaction.chainId
                  )
                  window.open(linkAddress, '_blank', 'noopener')
                }}
              >
                <LinkIcon />
              </IconButton>
              <IconButton
                aria-label='close'
                sx={{ color: 'white' }}
                onClick={() => closeSnackbar()}
              >
                <CloseIcon />
              </IconButton>
            </>
          }
          severity={alertColor}
          icon={alertIcon}
          sx={{
            width: '100%',
            alignItems: 'center',
            '.MuiAlert-action': {
              paddingTop: 0,
            },
          }}
        >
          {message}
        </Alert>
      </div>
    )
  }
)

export default CustomTxSnackbar
