import wallets from "../config"
import { saveNewWallet, updateWallet, getWallet } from "../models/WalletModel"
import { getBalance } from "./balances"

export async function addWallets() {
  console.log("Starting to add wallets")
  for (let i = 0; i < wallets.length; i++) {
    //if wallet is already added, skip it
    let result = await getWallet(wallets[i].address)
    if (result.length) {
      console.log("Skipping existing wallet - ", wallets[i].address)
      continue
    }

    let balance = await getBalance(wallets[i].address)
    let date = Date.now()
    wallets[i].lastModifiedOn = date
    wallets[i].createdOn = date
    wallets[i].balances = {}
    wallets[i].currentBalance = balance
    wallets[i].balances[date] = balance
    console.log("Adding wallet - ", wallets[i].address)
    await saveNewWallet(wallets[i])
  }
  console.log("All wallets added successfully")
  return true
}

export async function updateBalances() {
  let i = 0
  while (i < wallets.length) {
    console.log("Wallet - ", wallets[i].label)
    //only check for ethereum mainnet
    let balance = await getBalance(wallets[i].address)
    console.log("Balance - ", balance)
    //update wallet balance
    await updateWallet(wallets[i].address, balance)
    console.log("--------------")
    i++
  }
}

async function updateTimeFrames() {
  var hour = 0,
    day = 0,
    week = 0

  return await Promise.all(
    Object.keys(data).map(timestamp => {
      let diff = moment
        .duration(moment().diff(moment.unix(timestamp / 1000)))
        .asHours()

      console.log(timestamp)
      console.log("Hours Diff - ", diff)
      if (!hour && diff >= 1 && diff < 3) {
        hour = timestamp
      } else if (!day && diff >= 22 && diff < 48) {
        day = timestamp
      } else if (!week && diff >= 168 && diff < 192) {
        week = timestamp
      }
      //console.log({ hour, day, week })
      return { hour, day, week }
    })
  )
}
