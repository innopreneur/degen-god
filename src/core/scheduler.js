const schedule = require('node-schedule')
import { updateBalances, addWallets } from '..'
require('dotenv').config()

export function scheduleUpdateJob() {
  console.log(Date.now() + ': scheduled update')
  return schedule.scheduleJob(process.env.UPDATE_JOB_PATTERN, function () {
    //schedule logic here
    console.log(Date.now() + ': Updating Wallets')
    updateBalances()
  })
}
