import { updatePairs, getTotalPairsFromDB } from "../models/S1Model"
import { getPairLength, getTokenFromPairId } from "../strategies/s1"

export async function s1Job() {
  console.log(Date.now() + ": Executing S1 Job")
  let newTotalPairs = await getPairLength()
  console.log("New Pairs length - ", newTotalPairs)
  let oldTotalPairs = await getTotalPairsFromDB()
  console.log("Old Pairs length - ", oldTotalPairs)
  let diff = newTotalPairs - oldTotalPairs
  if (diff > 0) {
    //send notification for each pair symbol
    for (let i = 0; i <= diff; i++) {
      console.log("Checking pair - ", oldTotalPairs + i - 1)
      await getTokenFromPairId(oldTotalPairs + i - 1)
    }

    //update pairs
    console.log("Updating pairs count to - ", newTotalPairs)
    let updated = await updatePairs(newTotalPairs)
    console.log(updated)
  }
}
