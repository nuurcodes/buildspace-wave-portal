import { FC } from 'react'
import { __DEV__ } from '@constants/index'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Card,
  Stack,
} from '@mui/material'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'

type Props = {
  error: Error
  resetErrorBoundary: () => void
}

const GlobalErrorFallback: FC<Props> = ({ error, resetErrorBoundary }) => {
  return (
    <Dialog
      open
      maxWidth='xs'
      fullWidth
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      sx={{ textAlign: 'center' }}
    >
      <DialogTitle id='alert-dialog-title'>{error.name}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <ErrorOutlineOutlinedIcon
            sx={{ fontSize: 80, color: 'error.light', mx: 'auto' }}
          />
          <DialogContentText id='alert-dialog-description'>
            {error.message}
          </DialogContentText>
          {__DEV__ && (
            <Card variant='outlined'>
              <code>{error.stack}</code>
            </Card>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          autoFocus
          size='large'
          variant='contained'
          onClick={resetErrorBoundary}
        >
          Try again
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default GlobalErrorFallback
