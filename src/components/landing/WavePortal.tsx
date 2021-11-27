import * as React from 'react'
import { Box } from '@mui/system'
import {
  Paper,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Stack,
} from '@mui/material'
import { Contract } from '@config/contracts'
import { useContract } from '@hooks/useContract'
import { useContractFunction, useEthers } from '@usedapp/core'
import { ethers } from 'ethers'

enum Transaction {
  WAVE = 'Send wave',
}

type Wave = {
  sender: string
  message: string
  timestamp: string
}

export default function WavePortal() {
  const { chainId } = useEthers()
  const [message, setMessage] = React.useState('')
  const [totalWaves, setTotalWaves] = React.useState(0)
  const [waves, setWaves] = React.useState<Wave[]>([])
  const contract = useContract(Contract.WAVE_PORTAL_CONTRACT)

  const { state, send } = useContractFunction(
    contract as ethers.Contract,
    'wave',
    { transactionName: Transaction.WAVE }
  )

  React.useEffect(() => {
    contract
      .getTotalWaves()
      .then((total) => {
        setTotalWaves(total.toNumber())
      })
      .catch((e) => setTotalWaves(0))
  }, [contract, chainId])

  React.useEffect(() => {
    contract
      .getAllWaves()
      .then((waves) => {
        setWaves(
          waves.map((wave) => ({
            sender: wave.sender,
            message: wave.message,
            timestamp: wave.timestamp.toString(),
          }))
        )
      })
      .catch((e) => setWaves([]))
  }, [contract, chainId])

  const onSendMessage = async () => {
    try {
      await send(message)
      setMessage('')
    } catch (error) {
      console.log(error)
    }
  }

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
      <Paper
        sx={{
          padding: 4,
        }}
      >
        <Typography variant='h4'>Total waves: {totalWaves}</Typography>
        <Box>
          {waves.map((wave) => (
            <>
              <div>{wave.sender}</div>
              <div>{wave.message}</div>
              <div>{wave.timestamp}</div>
            </>
          ))}
        </Box>
        <Stack direction='column' spacing={2}>
          <TextField
            fullWidth
            id='outlined-multiline-flexible'
            label='Message'
            multiline
            maxRows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            fullWidth
            size='large'
            onClick={onSendMessage}
            disabled={state.status === 'Mining' || !message}
            endIcon={
              state.status === 'Mining' ? (
                <CircularProgress size='16px' color='inherit' />
              ) : undefined
            }
          >
            Wave
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}
