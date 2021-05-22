const express = require("express")
const router = express.Router()
import { updatePairs, getTotalPairsFromDB } from "../models/S1Model"
import { schedulePriceAlertJob } from "../core/scheduler"

router.get("/", async function(req, res) {
  let pairs = await getTotalPairsFromDB()
  res.status(200).json(pairs)
})

router.post("/pairs", async function(req, res) {
  let updated = await updatePairs(req.body.totalPairs)
  res.status(200).json({ message: "Updated Successfully", status: true })
})

router.get("/price", async function(req, res) {
  let { threshold, pair, side } = req.query
  schedulePriceAlertJob(pair, side, threshold)
  res
    .status(200)
    .json({
      message: `Scheduled Price alert for ${pair} to ${side} at ${threshold}`,
      status: true
    })
})

module.exports = router
