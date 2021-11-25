import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  Stack,
  CircularProgress,
} from '@mui/material'
import { useEtherBalance, useEthers, useSendTransaction } from '@usedapp/core'
import { useCurrencyInputError } from '@hooks/useCurrencyInputError'
import { formatEther, isAddress, parseUnits } from 'ethers/lib/utils'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import ConnectWalletButton from '../shared/ConnectWalletButton'
import NumberFormatCustom from './NumberFormatCustom'

const SendETHForm = () => {
  const { account } = useEthers()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const [sendAmount, setSendAmount] = useState('')
  const [sendAddress, setSendAddress] = useState('')

  const ethBalance = useEtherBalance(account)
  const { inputError } = useCurrencyInputError({
    amount: sendAmount,
    maxAmount: ethBalance,
  })

  const { sendTransaction, state } = useSendTransaction({
    transactionName: 'Send Ether',
  })

  const onSendEther = () => {
    if (isAddress(sendAddress)) {
      sendTransaction({
        to: sendAddress,
        value: parseUnits(sendAmount, 'ether'),
      })
    } else {
      enqueueSnackbar('Invalid wallet address', { variant: 'error' })
    }
  }

  const onSetAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSendAmount(value)
  }

  const onSetAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSendAddress(value)
  }

  const onSetMax = () => {
    const max = formatEther(ethBalance || 0)
    setSendAmount(max)
  }

  const txMining = state.status === 'Mining'

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Grid container justifyContent='center' spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <Card raised={false}>
            <CardContent sx={{ padding: 3 }}>
              <Typography variant='h5' mb={3}>
                Send ETH
              </Typography>
              <Box component='form' autoComplete='off'>
                <Stack spacing={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='outlined-adornment-amount'>
                      Amount
                    </InputLabel>
                    <OutlinedInput
                      id='outlined-adornment-amount'
                      placeholder='0'
                      value={sendAmount}
                      onChange={onSetAmount}
                      startAdornment={
                        <InputAdornment position='start'>Ξ</InputAdornment>
                      }
                      endAdornment={<Button onClick={onSetMax}>Max</Button>}
                      label='Amount'
                      inputComponent={NumberFormatCustom as any}
                      inputProps={{ decimalScale: 18 }}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='outlined-adornment-amount'>
                      Address
                    </InputLabel>
                    <OutlinedInput
                      id='outlined-adornment-amount'
                      placeholder='0x'
                      value={sendAddress}
                      onChange={onSetAddress}
                      label='Address'
                    />
                  </FormControl>
                  {account && (
                    <Button
                      size='large'
                      fullWidth
                      onClick={onSendEther}
                      disabled={!!inputError || !sendAddress || txMining}
                    >
                      {txMining && (
                        <Stack direction='row' spacing={1}>
                          <CircularProgress size={16} color='inherit' />
                          <Typography>Pending</Typography>
                        </Stack>
                      )}
                      {inputError && inputError}
                      {!inputError && !txMining && 'Send'}
                    </Button>
                  )}
                  {!account && <ConnectWalletButton size='large' fullWidth />}
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SendETHForm
