const Binance = require('node-binance-api')
require('dotenv').config()

const binance = new Binance().options({
  APIKEY: process.env.BINANCE_API_KEY,
  APISECRET: process.env.BINANCE_SECRET,
})

binance.balance(async (error, balances) => {
  if (error) return console.error(error)
  console.info('balances()', balances)
  console.info('ETH balance: ', balances.ETH.available)
  console.info(await binance.futuresBalance())
})
