import { FC } from 'react'
import { Fade, Paper, PaperProps, Typography } from '@mui/material'
import { Box } from '@mui/system'

type Props = PaperProps & {
  title: string
  content: string | React.ReactNode | undefined
}

const Stat: FC<Props> = ({ title, content, ...rest }) => {
  return (
    <Paper
      {...rest}
      sx={{
        p: 4,
        height: 124,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        ...rest.sx,
      }}
    >
      <Fade in={!!content}>
        <Box>
          <Typography variant='overline' color='text.secondary'>
            {title}
          </Typography>
          <Typography variant='h4'>{content}</Typography>
        </Box>
      </Fade>
    </Paper>
  )
}

export default Stat
