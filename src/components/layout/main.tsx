import { FC } from 'react'
import { Box } from '@mui/system'
import { Container } from '@mui/material'
import Header from '@components/header'
import Footer from '@components/footer'

const MainLayout: FC = ({ children }) => {
  return (
    <Box minHeight='100vh' display='flex' flexDirection='column'>
      <Box
        sx={{
          width: '200vw',
          height: '200vh',
          transform: 'translate(-50vw, -100vh)',
          top: 0,
          left: 0,
          right: 0,
          zIndex: -1,
          position: 'fixed',
          background:
            'radial-gradient(50% 50% at 50% 50%,#368BE810 0,rgba(255,255,255,0) 100%)',
        }}
      />
      <Box role='header'>
        <Header />
      </Box>
      <Box display='flex' flexGrow={1}>
        <Container
          maxWidth='xl'
          sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {children}
        </Container>
      </Box>
      <Box role='contentinfo'>
        <Footer />
      </Box>
    </Box>
  )
}

export default MainLayout
