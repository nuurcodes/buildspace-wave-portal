import { FC } from 'react'
import { useModal } from '@ebay/nice-modal-react'
import { Button, ButtonProps } from '@mui/material'
import ConnectWalletModal from '@components/modals/ConnectWalletModal'

const ConnectWalletButton: FC<ButtonProps> = (props) => {
  const connectWalletModal = useModal(ConnectWalletModal)

  const { children, ...rest } = props
  return (
    <Button onClick={() => connectWalletModal.show()} {...rest}>
      Connect
    </Button>
  )
}

export default ConnectWalletButton
