const schedule = require("node-schedule")
import { s1Job } from "./job"
import { calculateGasPrices } from "../strategies/gas"
import { protectLiquidation } from "../strategies/farmer"
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
