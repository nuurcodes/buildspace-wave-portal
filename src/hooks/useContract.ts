import { config, Contract } from '@config/contracts'
import { WavePortalAbi } from '@src/contracts'
import { useEthers } from '@usedapp/core'
import { ethers } from 'ethers'
import { useMemo } from 'react'

export function useContract(contractType: Contract) {
  const { library, chainId = 1 } = useEthers()
  const { address, abi } = config[chainId][contractType]

  const getContract = useMemo(() => {
    if (library && library.getSigner()) {
      const signer = library.getSigner()
      return new ethers.Contract(address, abi, signer)
    } else {
      const provider = ethers.getDefaultProvider()
      return new ethers.Contract(address, abi, provider)
    }
  }, [address, library, abi])

  switch (contractType) {
    case Contract.WAVE_PORTAL_CONTRACT:
      return getContract as WavePortalAbi
  }
}
