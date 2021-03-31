const schedule = require('node-schedule')
import { s1Job } from './job'
require('dotenv').config()

export function scheduleS1Job() {
  console.log(Date.now() + ': scheduled S1 Job')
  return schedule.scheduleJob(process.env.JOB_PATTERN, s1Job)
}
