import { ForwardedRef, forwardRef } from 'react'
import { Alert, AlertColor } from '@mui/material'
import { CustomContentProps, useSnackbar } from 'notistack'

// eslint-disable-next-line react/display-name
const CustomSnackbar = forwardRef(
  (props: CustomContentProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { closeSnackbar } = useSnackbar()
    const { variant = 'default', message } = props

    return (
      <div ref={ref}>
        <Alert
          variant='filled'
          onClose={() => closeSnackbar()}
          severity={variant as AlertColor}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </div>
    )
  }
)

export default CustomSnackbar
