const WalletModel = require("../models/WalletModel.js")
import { handleError } from "./errorHandler"

// validate the game scheduling request
export function validateWalletReq(req, res, next) {
  console.log(Date.now() + " : validating request...")

  if (
    req.body.address === undefined ||
    req.body.label === undefined ||
    req.body.balance === undefined ||
    req.body.lastModifiedOn === undefined
  ) {
    res.status(400).json(`{error: Bad Request}`)
  }
  next()
}

//save scehduled game in Database
export async function saveWallet(req, resp, next) {
  let res = await WalletModel.saveNewWallet(req.body)
  if (res instanceof Error) return handleError(res, resp, next)
  console.log("Wallet saved succesfully" + JSON.stringify(res))
  req.res.locals.wallet = res
  next()
}

//create votes for this game in Database
export async function updateWallet(req, resp, next) {
  const res = await WalletModel.updateWallet(req.body.address, req.body.tokens)

  console.log(res)
  if (res.n == 1) {
    if (res.nModified == 1) {
      req.res.locals.wallet = res
      next()
    } else {
      console.log(`Wallet ${req.address} didnt modified`)
    }
  } else {
    return handleError(err, resp, next)
  }
}

//get all games
export async function getAllWallets(req, resp, next) {
  let wallets = await WalletModel.getAllWallets()
  if (wallets) {
    req.res.locals.wallets = wallets.slice()
    next()
  } else {
    return handleError(res, resp, next)
  }
}

//get all active games
export async function getWalletByAddress(req, resp, next) {
  let wallets = await WalletModel.getWallet(req.query.address)
  if (wallets.length) {
    req.res.locals.wallet = wallets[0]
    next()
  } else {
    return handleError(res, resp, next)
  }
}
