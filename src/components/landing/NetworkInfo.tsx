import React, { useMemo } from 'react'
import Stat from '@components/shared/Stat'
import { Grid } from '@mui/material'
import { getUTCTimeString } from '@utils/date'
import { formatUnits } from '@ethersproject/units'
import { useBlockMeta, useGasPrice, useBlockNumber } from '@usedapp/core'

const NetworkInfo = () => {
  const { timestamp, difficulty } = useBlockMeta()
  const gasPrice = useGasPrice()
  const blockNumber = useBlockNumber()

  const timestampContent = useMemo(() => {
    return timestamp && `${getUTCTimeString(timestamp)} UTC`
  }, [timestamp])

  const difficultyContent = useMemo(() => {
    return difficulty && `${(+formatUnits(difficulty, 'finney')).toFixed(2)} P`
  }, [difficulty])

  const gasContent = useMemo(() => {
    return gasPrice && `${(+formatUnits(gasPrice, 'gwei')).toFixed(2)} GWEI`
  }, [gasPrice])

  return (
    <Grid container spacing={3} py={3}>
      <Grid item xs={6} md={3}>
        <Stat title={'Block number'} content={blockNumber} />
      </Grid>
      <Grid item xs={6} md={3}>
        <Stat title={'Last block mined'} content={timestampContent} />
      </Grid>
      <Grid item xs={6} md={3}>
        <Stat title={'Difficulty'} content={difficultyContent} />
      </Grid>
      <Grid item xs={6} md={3}>
        <Stat title={'Gas price'} content={gasContent} />
      </Grid>
    </Grid>
  )
}

export default NetworkInfo
