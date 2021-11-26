import * as React from 'react'
import { Box } from '@mui/system'
import { Button, CircularProgress, Typography } from '@mui/material'
import { Contract } from '@config/contracts'
import { useContract } from '@hooks/useContract'
import { useContractFunction } from '@usedapp/core'
import { ethers } from 'ethers'

enum Transaction {
  WAVE = 'Send wave',
}

export default function WavePortal() {
  const [totalWaves, setTotalWaves] = React.useState(0)
  const contract = useContract(Contract.WAVE_PORTAL_CONTRACT)

  const { state, send } = useContractFunction(
    contract as ethers.Contract,
    'wave',
    { transactionName: Transaction.WAVE }
  )

  React.useEffect(() => {
    contract.getTotalWaves().then((waves) => {
      setTotalWaves(waves.toNumber())
    })
  }, [contract])

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
      <Typography variant='h3'>Total waves: {totalWaves}</Typography>
      <Button
        size='large'
        onClick={() => send('Hello')}
        disabled={state.status === 'Mining'}
        endIcon={
          state.status === 'Mining' ? (
            <CircularProgress size='16px' color='inherit' />
          ) : undefined
        }
      >
        Wave
      </Button>
    </Box>
  )
}
