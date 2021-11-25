import { BigNumber } from '@ethersproject/bignumber'
import { useEffect, useState } from 'react'

export enum CurrencyInputError {
  'LESS_THAN_MIN' = 'Insufficient amount',
  'MORE_THAN_MAX' = 'Insufficient balance',
  'ZERO_AMOUNT' = 'Enter amount',
}

type Args = {
  amount: string
  maxAmount?: BigNumber
  minAmount?: BigNumber
  decimals?: number
}

export function useCurrencyInputError({
  amount,
  maxAmount,
  minAmount,
  decimals = 18,
}: Args) {
  const [inputError, setInputError] = useState<CurrencyInputError | undefined>()

  useEffect(() => {
    const split = amount.split('.')
    const digitsBeforeDecimal = split[0] || '0'
    const digitsAfterDecimal = split[1] || ''
    const digitsJoined = digitsBeforeDecimal + digitsAfterDecimal

    const totalDigitsBeforeDecimal = digitsBeforeDecimal.length
    const totalDigitsAfterDecimal = digitsAfterDecimal.length || 0
    const totalDigits = totalDigitsBeforeDecimal + totalDigitsAfterDecimal

    const digitsPadded = digitsJoined.padEnd(
      totalDigits + (decimals - totalDigitsAfterDecimal),
      '0'
    )

    const amountBN = BigNumber.from(digitsPadded)

    if (minAmount && amountBN.lt(minAmount)) {
      return setInputError(CurrencyInputError.LESS_THAN_MIN)
    }

    if (maxAmount && amountBN.gt(maxAmount)) {
      return setInputError(CurrencyInputError.MORE_THAN_MAX)
    }

    if (amountBN.isZero()) {
      return setInputError(CurrencyInputError.ZERO_AMOUNT)
    }

    setInputError(undefined)
  }, [amount, decimals, maxAmount, minAmount])

  return { inputError }
}
