import { useState } from 'react'
import { WaveType } from './WavePortal'
import { formatDistance } from 'date-fns'
import { shortenIfAddress } from '@usedapp/core'
import makeBlockie from 'ethereum-blockies-base64'
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Avatar,
} from '@mui/material'

type Props = {
  wave: WaveType
}

const Wave: React.FC<Props> = ({ wave }) => {
  const [copied, setCopied] = useState(false)

  const onCopyToClipboard = () => {
    setCopied(true)
    navigator.clipboard.writeText(wave.sender)
  }

  return (
    <ListItem alignItems='flex-start' onMouseLeave={() => setCopied(false)}>
      <ListItemAvatar sx={{ cursor: 'pointer' }} onClick={onCopyToClipboard}>
        <Tooltip
          title={copied ? 'Copied!' : shortenIfAddress(wave.sender)}
          placement='left'
        >
          <Avatar src={makeBlockie(wave.sender)} />
        </Tooltip>
      </ListItemAvatar>
      <ListItemText
        primary={wave.message}
        secondary={formatDistance(
          new Date(Number(wave.timestamp) * 1000),
          new Date()
        )}
        sx={{ wordWrap: 'break-word' }}
      />
    </ListItem>
  )
}

export default Wave
