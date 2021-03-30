var mongoose = require('mongoose')
require('dotenv').config()

let password = encodeURI(process.env.DB_PASSWORD)
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${password}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)

module.exports = mongoose.connection
