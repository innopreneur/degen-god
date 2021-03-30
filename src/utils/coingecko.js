import axios from 'axios'

async function getTokenInfo(tokenAddress) {
  let url = `https://api.etherscan.io/api?module=token&action=tokeninfo&contractaddress=${tokenAddress}&apikey=${process.env.ETHERSCAN_API_KEY}`
  let resp = await axios(url)
  if (resp.status == 200) {
    let tokenFound = resp.data['status']

    return txs
  } else {
    return 0
  }
}
