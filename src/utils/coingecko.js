import axios from "axios"

async function getTokenInfo(tokenAddress) {
  let url = `https://api.etherscan.io/api?module=token&action=tokeninfo&contractaddress=${tokenAddress}&apikey=${process.env.ETHERSCAN_API_KEY}`
  let resp = await axios(url)
  if (resp.status == 200) {
    let tokenFound = resp.data["status"]

    return txs
  } else {
    return 0
  }
}

export async function getPrice(id) {
  let url = `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=eth`
  let resp = await axios(url)
  if (resp.status == 200) {
    let price = resp.data[id]["eth"]
    return price
  } else {
    return 0
  }
}
