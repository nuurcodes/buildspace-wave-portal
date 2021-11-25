import { Typography } from '@mui/material'
import { getChainName, useEthers } from '@usedapp/core'

const NetworkBadge = () => {
  const { chainId = 1 } = useEthers()
  return <Typography>{getChainName(chainId)}</Typography>
}

export default NetworkBadge
