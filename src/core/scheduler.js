const schedule = require("node-schedule")
import { s1Job } from "./job"
import { calculateGasPrices } from "../strategies/gas"
import { protectLiquidation } from "../strategies/farmer"
import { sendPriceAlert } from "../strategies/price"
import { isContractAddressInBloom } from "web3-utils"
require("dotenv").config()

export function scheduleS1Job() {
  console.log(Date.now() + ": scheduled S1 Job")
  return schedule.scheduleJob(process.env.JOB_PATTERN, s1Job)
}

export function scheduleGasJob() {
  console.log(Date.now() + ": scheduled GAS Job")
  return schedule.scheduleJob(process.env.JOB_PATTERN, calculateGasPrices)
}

export function scheduleLiquidationJob() {
  console.log(Date.now() + ": scheduled LIQUIDATION PROTECTION Job")
  return schedule.scheduleJob(process.env.JOB_PATTERN, protectLiquidation)
}

export function schedulePriceAlertJob(pair, side, threshold) {
  let params = JSON.stringify({ pair, side, threshold })
  console.log(Date.now() + `: scheduled ${pair} ${side} with ${threshold} Job`)
  return schedule.scheduleJob(params, process.env.JOB_PATTERN, function() {
    const { pair, side, threshold } = JSON.parse(params)
    console.log("Pair - ", pair)
    console.log("Side - ", side)
    console.log("Threshold - ", threshold)
    sendPriceAlert(pair, side, threshold)
  })
}
