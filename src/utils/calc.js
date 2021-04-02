import { BigNumber } from 'bignumber.js'

export function getValue(raw, decimals = 18) {
  let unit = new BigNumber(10).pow(parseInt(decimals))
  return new BigNumber(raw).div(unit).toNumber()
}
