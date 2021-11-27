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
      address: '0xaaefaa3DE8684eFd2a119e692CF779064bFd11fB',
      abi: WavePortalAbi__factory.abi,
    },
  },
  4: {
    [Contract.WAVE_PORTAL_CONTRACT]: {
      address: '0xaaefaa3DE8684eFd2a119e692CF779064bFd11fB',
      abi: WavePortalAbi__factory.abi,
    },
  },
}
