const mongoose = require('mongoose')
const S1Schema = require('../schemas/S1Schema').S1Schema

let S1Model = mongoose.model('s1', S1Schema)

export async function getTotalPairsFromDB() {
  let result = await S1Model.find({}).exec()
  console.log(result)
  return result[0].totalPairs
}

export async function updatePairs(newTotalPairsCount) {
  let result = await getTotalPairsFromDB()
  if (!result) {
    return false
  }

  let date = Date.now()

  return S1Model.updateOne(
    { id: 1 },
    { $set: { totalPairs: newTotalPairsCount, lastModifiedOn: date } }
  ).exec()
}
