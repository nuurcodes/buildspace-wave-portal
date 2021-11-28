import { FC } from 'react'
import { Box } from '@mui/system'
import { Container } from '@mui/material'
import Header from '@components/header'
import Footer from '@components/footer'

const MainLayout: FC = ({ children }) => {
  return (
    <Box minHeight='100vh' display='flex' flexDirection='column'>
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
