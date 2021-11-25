import { ChainId, Config } from '@usedapp/core'

export const config: Config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]: process.env.NEXT_PUBLIC_RPC_MAINNET as string,
    [ChainId.Rinkeby]: process.env.NEXT_PUBLIC_RPC_RINKEBY as string,
  },
  supportedChains: [ChainId.Mainnet, ChainId.Rinkeby],
}
