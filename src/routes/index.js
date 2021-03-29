const express = require("express")
const router = express.Router()
const walletController = require("../controllers/WalletController.js")
import { scheduleUpdateJob } from "../core/scheduler"

let {
  validateWalletReq,
  getAllWallets,
  getWalletByAddress,
  saveWallet,
  updateWallet
} = walletController

router.get("/wallets", getAllWallets, function(req, res) {
  res.status(200).json(req.res.locals.wallets)
})

router.get("/wallet", getWalletByAddress, function(req, res) {
  res.status(200).json(req.res.locals.wallet)
})

router.get("/schedule", async function(req, res) {
  let updateJob = scheduleUpdateJob()
  res.status(200).json({ message: "Jobs scheduled successfully" })
})

module.exports = router
