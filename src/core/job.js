import wallets from '../config'
import { updatePairs, getTotalPairsFromDB } from '../models/S1Model'
import { getPairLength } from '../strategies/s1'

export async function s1Job() {
  let newTotalPairs = await getPairLength()
  let oldTotalPairs = await getTotalPairsFromDB()
  let diff = newTotalPairs - oldTotalPairs
  if (diff > 0) {
    for (let i = 0; i < diff; i++) {
      //send notification for each pair symbol
    }
  }
}
