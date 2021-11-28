import type { NextPage } from 'next'
import Head from 'next/head'
import MainLayout from '@src/components/layout/main'
import WavePortal from '@components/landing/WavePortal'
import ConnectWallet from '@components/landing/ConnectWallet'
import { useEthers } from '@usedapp/core'

const Home: NextPage = () => {
  const { connector } = useEthers()
  return (
    <>
      <Head>
        <title>Wave Portal | NinjaNuur</title>
        <meta
          name='description'
          content='Frontend for WavePortal smart contract'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MainLayout>
        {!connector && <ConnectWallet />}
        {connector && <WavePortal />}
      </MainLayout>
    </>
  )
}

export default Home
