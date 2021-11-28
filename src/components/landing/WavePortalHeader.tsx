import { WaveType } from '@components/landing/WavePortal'
import { formatEther } from '@ethersproject/units'
import { Avatar, Stack, Typography } from '@mui/material'
import { useEtherBalance, useEthers } from '@usedapp/core'

type Props = {
  waves: WaveType[]
}

const WavePortalHeader: React.FC<Props> = ({ waves }) => {
  const { account } = useEthers()
  const etherBalance = useEtherBalance(account)

  return (
    <Stack
      justifyContent='space-between'
      alignItems='center'
      direction='row'
      p={2}
      sx={{
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: 'divider',
      }}
    >
      <Typography color='text.secondary'>
        Total waves: <strong>{account ? waves.length : '-'}</strong>
      </Typography>
      {account && etherBalance && (
        <Stack direction='row' spacing={1}>
          <Avatar src={'/token_icons/eth.png'} sx={{ width: 24, height: 24 }} />
          <Typography>{(+formatEther(etherBalance)).toFixed(2)} ETH</Typography>
        </Stack>
      )}
    </Stack>
  )
}

export default WavePortalHeader
