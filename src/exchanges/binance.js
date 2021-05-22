import Binance from "binance-api-node"
require("dotenv").config()

// Authenticated client, can make signed calls
const binance = Binance({
  apiKey: process.env.binance_API_KEY,
  apiSecret: process.env.binance_SECRET
})

export async function getBestPrice(symbol, side) {
  let tickers = await binance.allBookTickers()
  //console.log(tickers)
  if (side == "BUY") {
    console.log(tickers[symbol].askPrice)
    return tickers[symbol].askPrice
  } else {
    console.log("Symbol - ", symbol)
    console.log(tickers[symbol])
    return tickers[symbol].bidPrice
  }
}
