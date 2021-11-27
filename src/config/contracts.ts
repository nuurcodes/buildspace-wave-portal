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
      address: '0xaFAb120D40DCFEDf490Ae890e05341d26767580C',
      abi: WavePortalAbi__factory.abi,
    },
  },
  4: {
    [Contract.WAVE_PORTAL_CONTRACT]: {
      address: '0xaFAb120D40DCFEDf490Ae890e05341d26767580C',
      abi: WavePortalAbi__factory.abi,
    },
  },
}
