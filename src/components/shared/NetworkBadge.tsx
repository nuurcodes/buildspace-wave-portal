import { Box } from '@mui/system'
import { Stack, Typography } from '@mui/material'
import { getChainName, useEthers } from '@usedapp/core'

const networkColor: { [key: number]: string } = {
  1: '#29B6AF',
  3: '#ff4a8d',
  4: '#f6c343',
  5: '#7eb2ec',
  42: '#7057ff',
}

const NetworkBadge = () => {
  const { chainId = 1 } = useEthers()
  return (
    <Stack
      spacing={1}
      direction='row'
      alignItems='center'
      sx={{
        borderStyle: 'solid',
        borderColor: 'divider',
        borderWidth: 1,
        borderRadius: 1,
        py: 1,
        px: 1.5,
      }}
    >
      <Box
        sx={{
          width: 10,
          height: 10,
          backgroundColor: networkColor[chainId],
          borderRadius: '100%',
        }}
      />
      <Typography>{getChainName(chainId)}</Typography>
    </Stack>
  )
}

export default NetworkBadge
