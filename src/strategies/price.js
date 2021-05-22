import moment from "moment"
import { getBestPrice } from "../exchanges/binance"
import { sendMessage } from "../core/messenger"
require("dotenv").config()

//start trading
export async function sendPriceAlert(pair, side, threshold) {
  try {
    console.log(
      `Starting next check for Price Alert at ${moment(Date.now()).format(
        "DD/MM/YYYY HH:mm:ss"
      )} `
    )

    console.log("Pair - ", pair)
    let price = await getBestPrice(pair, side)
    console.log(`${pair} ${side} Price - `, price)

    if (side == "BUY" && Number(price) <= threshold) {
      sendMessage(`
        ******* Binance Price Alert ********
        ${pair} 
        side - ${side}
        Price - $${price}
        ---- Time to BUY -----
        `)
    } else if (side == "SELL" && Number(price) >= threshold) {
      sendMessage(`
        ******* Binance Price Alert ********
        ${pair} 
        side - ${side}
        Price - $${price}
        ---- Time to SELL -----
        `)
    }
  } catch (err) {
    sendMessage(`
      xxxxx ERROR xxxxxx
      [Binance Price Alert]
      ${err.message}
      `)

    console.error(err)
  }
}
