import { InjectedConnector } from '@web3-react/injected-connector'
import { PortisConnector } from '@web3-react/portis-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'

const supportedChainIds = [1, 4]

export const injected = new InjectedConnector({
  supportedChainIds,
})

export const walletConnectConnector = new WalletConnectConnector({
  rpc: {
    1: process.env.NEXT_PUBLIC_RPC_MAINNET as string,
    4: process.env.NEXT_PUBLIC_RPC_RINKEBY as string,
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
})

export const portisConnector = new PortisConnector({
  dAppId: process.env.NEXT_PUBLIC_PORTIS_API_KEY as string,
  networks: supportedChainIds,
})

export const walletLinkConnector = new WalletLinkConnector({
  url: process.env.NEXT_PUBLIC_RPC_MAINNET as string,
  appName: 'DApp Starter',
})

export type Connector =
  | InjectedConnector
  | WalletConnectConnector
  | WalletLinkConnector
  | PortisConnector

export type Wallet = {
  name: string
  icon: string
  connector: Connector
  disconnect: () => void
}

export const connectors: Wallet[] = [
  {
    name: 'MetaMask',
    connector: injected,
    icon: '/wallet_icons/metamask.png',
    disconnect: () => injected.deactivate(),
  },
  {
    name: 'Wallet Connect',
    connector: walletConnectConnector,
    icon: '/wallet_icons/walletconnect.png',
    disconnect: () => {
      walletConnectConnector.deactivate()
      walletConnectConnector.close()
      walletConnectConnector.walletConnectProvider = undefined
    },
  },
  {
    name: 'Coinbase',
    connector: walletLinkConnector,
    icon: '/wallet_icons/coinbase.png',
    disconnect: () => {
      walletConnectConnector.deactivate()
      walletConnectConnector.close()
    },
  },
  {
    name: 'Portis',
    connector: portisConnector,
    icon: '/wallet_icons/portis.png',
    disconnect: () => {
      walletConnectConnector.deactivate()
      walletConnectConnector.close()
    },
  },
]
