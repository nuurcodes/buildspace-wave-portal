import { Avatar, Button, Stack, Typography } from '@mui/material'
import { useModal } from '@ebay/nice-modal-react'
import { useEthers, useEtherBalance, shortenIfAddress } from '@usedapp/core'
import ConnectWalletButton from '@components/shared/ConnectWalletButton'
import ConnectWalletModal from '@components/modals/ConnectWalletModal'
import makeBlockie from 'ethereum-blockies-base64'

const WalletBadge = () => {
  const { account } = useEthers()
  const etherBalance = useEtherBalance(account)
  const connectWalletModal = useModal(ConnectWalletModal)

  if (account && etherBalance) {
    return (
      <Button
        size='large'
        variant='text'
        sx={{
          py: 1,
          px: 1.5,
          color: 'text.primary',
          backgroundColor: 'action.hover',
        }}
        onClick={() => connectWalletModal.show()}
      >
        <Stack direction='row' spacing={1}>
          <Avatar src={makeBlockie(account)} sx={{ width: 24, height: 24 }} />
          <Typography color='text.secondary'>
            {shortenIfAddress(account)}
          </Typography>
        </Stack>
      </Button>
    )
  }

  return <ConnectWalletButton />
}

export default WalletBadge
