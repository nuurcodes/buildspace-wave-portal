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
      address: '0x1F626f46e4bd968dB36c1b4AC99655cd4fFFE6c5',
      abi: WavePortalAbi__factory.abi,
    },
  },
  4: {
    [Contract.WAVE_PORTAL_CONTRACT]: {
      address: '0x1F626f46e4bd968dB36c1b4AC99655cd4fFFE6c5',
      abi: WavePortalAbi__factory.abi,
    },
  },
}
