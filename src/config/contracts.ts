import { WavePortalAbi__factory } from '@src/contracts'

export enum Contract {
  WAVE_PORTAL_CONTRACT = 'wavePortalContract',
}

type ConfigOption = {
  address: string
  abi: any
}

export const config: { [key: number]: { [key in Contract]: ConfigOption } } = {
  1: {
    [Contract.WAVE_PORTAL_CONTRACT]: {
      // TODO: Update address
      address: '0x9C94ebf3dd5fe20aBB547e262F7E517ab38468F7',
      abi: WavePortalAbi__factory.abi,
    },
  },
  4: {
    [Contract.WAVE_PORTAL_CONTRACT]: {
      address: '0x9C94ebf3dd5fe20aBB547e262F7E517ab38468F7',
      abi: WavePortalAbi__factory.abi,
    },
  },
}
