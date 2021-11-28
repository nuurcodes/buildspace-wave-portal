import { useState, useEffect, useCallback } from 'react'
import { Box } from '@mui/system'
import { Paper } from '@mui/material'
import { Contract } from '@config/contracts'
import { useContract } from '@hooks/useContract'
import { useEthers } from '@usedapp/core'
import Waves from '@components/landing/Waves'
import WavePortalFooter from '@components/landing/WavePortalFooter'
import WavePortalHeader from '@components/landing/WavePortalHeader'

export type WaveType = {
  sender: string
  message: string
  timestamp: string
  name: string
}

export default function WavePortal() {
  const { chainId, account } = useEthers()
  const [waves, setWaves] = useState<WaveType[]>([])
  const contract = useContract(Contract.WAVE_PORTAL_CONTRACT)

  const onNewWave = useCallback(
    (from: string, message: string, timestamp: number) => {
      setWaves((prevState) => [
        ...prevState,
        {
          sender: from,
          message: message,
          timestamp: timestamp.toString(),
          name: account === from ? 'You' : from,
        },
      ])
    },
    [account]
  )

  useEffect(() => {
    contract.on('NewWave', onNewWave)
    return () => {
      contract.off('NewWave', onNewWave)
    }
  }, [contract, onNewWave])

  useEffect(() => {
    contract
      .getAllWaves()
      .then((waves) => {
        setWaves(
          waves.map((wave) => ({
            sender: wave.sender,
            message: wave.message,
            timestamp: wave.timestamp.toString(),
            name: account === wave.sender ? 'You' : wave.sender,
          }))
        )
      })
      .catch((e) => setWaves([]))
  }, [contract, chainId, account])

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
          width: '100%',
          maxWidth: '480px',
        }}
      >
        <WavePortalHeader waves={waves} />
        <Waves waves={waves} />
        <WavePortalFooter />
      </Paper>
    </Box>
  )
}
