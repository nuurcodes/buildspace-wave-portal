import { Stack, TextField, Button, CircularProgress } from '@mui/material'
import { Contract } from '@config/contracts'
import { useContract } from '@hooks/useContract'
import { useContractFunction, useEthers } from '@usedapp/core'
import { ethers } from 'ethers'
import { useState } from 'react'
import { useModal } from '@ebay/nice-modal-react'
import ConnectWalletModal from '@components/modals/ConnectWalletModal'

enum Transaction {
  WAVE = 'Send wave',
}

const WavePortalFooter = () => {
  const { account } = useEthers()
  const [message, setMessage] = useState('')
  const contract = useContract(Contract.WAVE_PORTAL_CONTRACT)
  const connectWalletModal = useModal(ConnectWalletModal)

  const { state, send } = useContractFunction(
    contract as ethers.Contract,
    'wave',
    { transactionName: Transaction.WAVE }
  )

  const onSendMessage = async () => {
    try {
      await send(message, { gasLimit: 300000 })
      setMessage('')
    } catch (error) {
      console.log(error)
    }
  }

  const onConnectWallet = async () => {
    connectWalletModal.show()
  }

  return (
    <Stack
      direction='column'
      spacing={2}
      p={2}
      sx={{
        borderTopWidth: 1,
        borderTopStyle: 'solid',
        borderTopColor: 'divider',
      }}
    >
      <TextField
        fullWidth
        id='outlined-multiline-flexible'
        label='Message'
        multiline
        maxRows={4}
        value={message}
        disabled={state.status === 'Mining' || !account}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        fullWidth
        size='large'
        onClick={!account ? onConnectWallet : onSendMessage}
        disabled={state.status === 'Mining' || (!!account && !message)}
        endIcon={
          state.status === 'Mining' ? (
            <CircularProgress size='16px' color='inherit' />
          ) : undefined
        }
      >
        {!account ? 'Connect Wallet' : 'Wave'}
      </Button>
    </Stack>
  )
}

export default WavePortalFooter
