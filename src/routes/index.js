const express = require('express')
const router = express.Router()
import { updatePairs, getTotalPairsFromDB } from '../models/S1Model'
import { scheduleUpdateJob } from '../core/scheduler'

router.get('/', function (req, res) {
  let pairs = await getTotalPairsFromDB()
  res.status(200).json(pairs)
})

router.post('/pairs', function (req, res) {
  let updated = await updatePairs(req.body.totalPairs)
  res.status(200).json({message: "Updated Successfully", status: true})
})

router.get('/schedule', async function (req, res) {
  let updateJob = scheduleUpdateJob()
  res.status(200).json({ message: 'Jobs scheduled successfully' })
})

module.exports = router
