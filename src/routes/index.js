const express = require('express')
const router = express.Router()
import { updatePairs, getTotalPairsFromDB } from '../models/S1Model'

router.get('/', async function (req, res) {
  let pairs = await getTotalPairsFromDB()
  res.status(200).json(pairs)
})

router.post('/pairs', async function (req, res) {
  let updated = await updatePairs(req.body.totalPairs)
  res.status(200).json({ message: 'Updated Successfully', status: true })
})

module.exports = router
