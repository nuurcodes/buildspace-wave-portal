import { ChainId, Config } from '@usedapp/core'

export const config: Config = {
  readOnlyChainId: ChainId.Rinkeby,
  readOnlyUrls: {
    [ChainId.Rinkeby]: process.env.NEXT_PUBLIC_RPC_RINKEBY as string,
  },
  supportedChains: [ChainId.Rinkeby],
}
