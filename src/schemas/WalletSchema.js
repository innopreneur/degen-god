const mongoose = require("mongoose")
const Schema = mongoose.Schema

export const WalletSchema = new Schema({
  address: { type: String, required: true },
  label: { type: String, required: true },
  group: { type: String, required: true },
  category: { type: String, required: true },
  currentBalance: { type: Number, required: true },
  balances: { type: Object, required: true, default: {} },
  lastModifiedOn: { type: Date, default: Date.now() },
  createdOn: { type: Date, default: Date.now() }
})
