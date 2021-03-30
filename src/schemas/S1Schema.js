const mongoose = require('mongoose')
const Schema = mongoose.Schema

export const S1Schema = new Schema({
  id: { type: Number, require: true },
  totalPairs: { type: Number, required: true },
  lastModifiedOn: { type: Date, default: Date.now() },
})
