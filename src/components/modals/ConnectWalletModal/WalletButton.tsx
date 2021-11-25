import { FC } from 'react'
import { useEthers } from '@usedapp/core'
import { injected, Wallet } from '@config/connectors'
import { useConnect } from '@hooks/useConnect'
import { ChevronRight } from '@mui/icons-material'
import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'

type Props = {
  wallet: Wallet
}

const WalletButton: FC<Props> = ({ wallet }) => {
  const { connector: activeConnector } = useEthers()
  const { connect, isActive } = useConnect()
  const { name, connector, disconnect, icon } = wallet

  return (
    <Stack
      key={name}
      role='button'
      direction='row'
      spacing={2}
      onClick={() => connect(wallet)}
      p={2}
      sx={{
        width: '100%',
        cursor: 'pointer',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'action.hover',
        borderRadius: 1,
        ':hover': {
          backgroundColor: 'action.selected',
        },
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction='row' spacing={2}>
          <Box
            sx={{
              width: '60px',
              height: '60px',
              padding: 1.5,
              borderRadius: '100%',
              backgroundColor: 'white',
            }}
          >
            <Image width='60px' height='60px' src={icon} aria-label={name} />
          </Box>
          <Box>
            <Typography fontWeight='bold' fontSize='large'>
              {name}
            </Typography>
            {isActive(connector) && (
              <Box
                role='button'
                onClick={disconnect}
                sx={{
                  textDecoration: 'underline',
                  color: 'text.secondary',
                  cursor: 'pointer',
                }}
              >
                {injected.constructor === activeConnector?.constructor
                  ? 'Connected'
                  : 'Disconnect'}
              </Box>
            )}
          </Box>
        </Stack>
        <ChevronRight fontSize='large' />
      </Box>
    </Stack>
  )
}

export default WalletButton
