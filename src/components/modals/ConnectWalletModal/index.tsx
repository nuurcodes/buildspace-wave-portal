import { connectors } from '@config/connectors'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import WalletButton from '@components/modals/ConnectWalletModal/WalletButton'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Stack,
  Link,
} from '@mui/material'

const ConnectWalletModal = NiceModal.create(() => {
  const modal = useModal()

  return (
    <Dialog open={true} fullWidth maxWidth='xs' onClose={() => modal.remove()}>
      <DialogTitle sx={{ textAlign: 'center' }}>Select a Wallet</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          {connectors.map((wallet) => (
            <WalletButton key={wallet.name} wallet={wallet} />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          p: 3,
          borderWidth: '1px',
          borderTopStyle: 'solid',
          borderTopColor: 'divider',
          justifyContent: 'center',
        }}
      >
        <Typography textAlign='center'>
          {`Don't have a wallet?`}
          <Link
            color='inherit'
            target='blank'
            href='https://metamask.io/'
            rel='noopener'
          >
            Download here
          </Link>
        </Typography>
      </DialogActions>
    </Dialog>
  )
})

export default ConnectWalletModal
