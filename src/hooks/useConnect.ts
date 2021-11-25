import { useSnackbar } from 'notistack'
import { useEthers } from '@usedapp/core'
import { useModal } from '@ebay/nice-modal-react'
import { Wallet } from '@config/connectors'

export function useConnect() {
  const modal = useModal()
  const { active, activate, connector: activeConnector } = useEthers()
  const { enqueueSnackbar } = useSnackbar()

  const connect = (wallet: Wallet) => {
    // Remove modal if connected wallet is selected
    if (isActive(wallet.connector)) {
      modal.remove()
    }
    // Reset previous connection
    wallet.disconnect()

    // Activate new connection
    activate(wallet.connector, (error) => {
      if (error) {
        enqueueSnackbar(error.message || 'Error connecting to wallet', {
          variant: 'error',
        })
      }
    })

    // Remove modal if connection is active
    if (active) {
      modal.remove()
    }
  }

  const isActive = (connector: any) =>
    activeConnector && connector.constructor === activeConnector.constructor

  return { connect, isActive }
}
