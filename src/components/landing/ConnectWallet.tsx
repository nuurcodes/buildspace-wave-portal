import { Box } from '@mui/system'
import ConnectWalletButton from '@components/shared/ConnectWalletButton'

const ConnectWallet = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <ConnectWalletButton />
    </Box>
  )
}

export default ConnectWallet
