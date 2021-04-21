import { sendMessage } from "../core/messenger"
import axios from "axios"
require("dotenv").config()

const gas = parseInt(process.env.GAS_THRESHOLD)

export async function calculateGasPrices() {
  console.log("Executing GAS strategy....")
  let url = `https://ethgasstation.info/api/ethgasAPI.json`
  let resp = await axios(url)
  if (resp.status == 200) {
    let data = resp.data
    if (parseInt(data["average"]) / 10 <= gas) {
      sendMessage(`
    ----- GAS Prices -----
    FASTEST = ${parseInt(data["fastest"]) / 10}
    FAST = ${parseInt(data["fast"]) / 10}
    AVERAGE = ${parseInt(data["average"]) / 10}
    ----------------------
    `)
    }
  } else {
    sendMessage(`
    ----- GAS Error ------
    Response Status : ${resp.status}
    ----------------------
    `)
  }
}
