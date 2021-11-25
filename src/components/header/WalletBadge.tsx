import { formatEther } from 'ethers/lib/utils'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useModal } from '@ebay/nice-modal-react'
import { useEthers, useEtherBalance, shortenIfAddress } from '@usedapp/core'
import ConnectWalletButton from '@components/shared/ConnectWalletButton'
import ConnectWalletModal from '@components/modals/ConnectWalletModal'

const WalletBadge = () => {
  const { account } = useEthers()
  const etherBalance = useEtherBalance(account)
  const connectWalletModal = useModal(ConnectWalletModal)

  if (account && etherBalance) {
    return (
      <Button
        size='large'
        variant='outlined'
        sx={{ pl: 0.5, pr: 1.25, py: 0.5, color: 'text.primary' }}
        onClick={() => connectWalletModal.show()}
      >
        <Stack direction='row' spacing={1}>
          <Box
            sx={{
              px: 1,
              py: 0.25,
              borderRadius: 0.5,
              bgcolor: 'action.selected',
            }}
          >
            <Typography>
              {(+formatEther(etherBalance)).toFixed(2)} ETH
            </Typography>
          </Box>
          <Box>
            <Typography>{shortenIfAddress(account)}</Typography>
          </Box>
        </Stack>
      </Button>
    )
  }

  return <ConnectWalletButton />
}

export default WalletBadge
