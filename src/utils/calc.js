import { BigNumber } from 'bignumber.js'

export async function getValue(raw, decimals) {
  let unit = new BigNumber(10).pow(parseInt(decimals))
  return new BigNumber(raw).div(unit).toNumber()
}
