import ThemeToggle from '@components/header/ThemeToggle'
import NetworkBadge from '@components/shared/NetworkBadge'
import WalletBadge from '@components/header/WalletBadge'
import Link from '@components/shared/Link'
import { Container, Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/system'

const Header = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        py: 3,
        height: 80,
        display: 'flex',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: theme.palette.divider,
      }}
    >
      <Container maxWidth='xl'>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Stack direction='row' spacing={2}>
            <Link
              href='/'
              variant='h5'
              sx={{ textDecoration: 'none', color: 'text.primary' }}
            >
              WavePortal
            </Link>
          </Stack>
          <Stack direction='row' spacing={2}>
            <NetworkBadge />
            <WalletBadge />
            <ThemeToggle />
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default Header
