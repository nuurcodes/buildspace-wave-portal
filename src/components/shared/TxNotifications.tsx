import { FC, useEffect, useRef } from 'react'
import { useSnackbar } from 'notistack'
import { useNotifications } from '@usedapp/core'

const TxNotifications: FC = () => {
  const { notifications } = useNotifications()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const notificationsRef = useRef(notifications)

  const getNotificationVariant = (
    type:
      | 'transactionStarted'
      | 'transactionSucceed'
      | 'transactionFailed'
      | 'walletConnected'
  ) => {
    switch (type) {
      case 'transactionStarted':
        return 'txInfo'
      case 'transactionFailed':
        return 'txError'
      case 'transactionSucceed':
        return 'txSuccess'
      default:
        return 'txDefault'
    }
  }

  useEffect(() => {
    if (notifications !== notificationsRef.current) {
      if (notifications.length > 0) {
        const notification = notifications[notifications.length - 1]

        if ('transaction' in notification) {
          enqueueSnackbar(`${notification.transactionName}`, {
            variant: getNotificationVariant(notification.type),
            persist: notification.type === 'transactionStarted',
            notification,
          })
        }
      }
      notificationsRef.current = notifications
    }
  }, [notifications, closeSnackbar, enqueueSnackbar])

  return null
}

export default TxNotifications
