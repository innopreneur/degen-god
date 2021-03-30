const mongoose = require('mongoose')
const S1Schema = require('../schemas/S1Schema').S1Schema

let S1Model = mongoose.model('s1', S1Schema)

export async function getTotalPairsFromDB() {
  return S1Model.find({}).exec()
}

export async function updatePairs(newTotalPairsCount) {
  let result = await getTotalPairs()
  if (!result.length) {
    return false
  }

  let date = Date.now()

  return WalletModel.updateOne(
    { id: 1 },
    { $set: { totalPairs: newTotalPairsCount, lastModifiedOn: date } }
  ).exec()
}
