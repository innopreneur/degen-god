const mongoose = require("mongoose")
const WalletSchema = require("../schemas/WalletSchema").WalletSchema

let WalletModel = mongoose.model("wallets", WalletSchema)

//save new wallet
export async function saveNewWallet(newWallet) {
  let wallet = new WalletModel(newWallet)

  let result = await WalletModel.find({ address: newWallet.address })
  if (result.length) {
    return false
  }
  let saved = await wallet.save()
  return saved
}

export async function getWallet(address) {
  return WalletModel.find({ address }).exec()
}

export async function getAllWallets() {
  return WalletModel.find({}).exec()
}

export async function updateWallet(address, balance) {
  let result = await getWallet(address)
  if (!result.length) {
    return false
  }
  let balances = result[0].balances
  let date = Date.now()
  balances[date] = balance
  return WalletModel.updateOne(
    { address },
    { $set: { currentBalance: balance, balances, lastModifiedOn: date } }
  ).exec()
}

function convertToDotNotation(obj, newObj = {}, prefix = "") {
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      convertToDotNotation(obj[key], newObj, prefix + key + ".")
    } else {
      newObj[prefix + key] = obj[key]
    }
  }

  return newObj
}
