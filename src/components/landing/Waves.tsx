import { useEffect, useRef, memo } from 'react'
import { List, Typography } from '@mui/material'
import { WaveType } from '@components/landing/WavePortal'
import Wave from '@components/landing/Wave'

type Props = {
  waves: WaveType[]
}

const Waves: React.FC<Props> = ({ waves }) => {
  const wavesListRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    if (wavesListRef && wavesListRef.current) {
      wavesListRef.current.scrollTo({
        top: wavesListRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [waves])

  if (!waves.length) {
    return <Typography p={2}>No waves :(</Typography>
  }

  return (
    <List
      ref={wavesListRef}
      sx={{
        maxHeight: 480,
        overflow: 'auto',

        '&::-webkit-scrollbar': {
          width: '24px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'background.divider',
          borderRadius: '100px',
        },
        '&::-webkit-scrollbar-thumb': {
          border: '8px solid transparent',
          borderRadius: '100px',
          backgroundColor: 'action.hover',
          backgroundClip: 'content-box',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'action.selected',
        },
      }}
    >
      {waves.map((wave) => (
        <Wave wave={wave} key={wave.timestamp} />
      ))}
    </List>
  )
}

export default memo(Waves)
