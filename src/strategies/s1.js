import Web3 from 'web3'
import UniFactoryABI from '../abi/uni-factory'
import UniPairABI from '../abi/uni-pair'
import { addresses, liquidityThreshold, symbols } from '../utils/constants'
import { getValue } from '../utils/calc'
import { sendMessage } from '../core/messenger'
require('dotenv').config()

//instantiate web3
let web3 = new Web3(process.env.INFURA_URL)

const coingeckoBaseURL = 'https://api.coingecko.com/api/v3/'
const UniswapFactoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'
const uniFactoryInstance = new web3.eth.Contract(
  UniFactoryABI,
  UniswapFactoryAddress
)

export async function getPairLength() {
  let newPairs = await uniFactoryInstance.methods.allPairsLength().call()
  console.log(newPairs)
  return Number(newPairs)
}

export async function getTokenFromPairId(pairId) {
  let pairAddress = await uniFactoryInstance.methods.allPairs(pairId).call()

  const uniPairInstance = new web3.eth.Contract(UniPairABI, pairAddress)
  const token0 = await uniPairInstance.methods.token0().call()
  const token1 = await uniPairInstance.methods.token1().call()
  const {
    _reserve0,
    _reserve1,
  } = await uniPairInstance.methods.getReserves().call()
  if (addresses.includes(token0)) {
    let value = getValue(_reserve0)
    if (value >= liquidityThreshold[token0]) {
      console.log(symbols[token0] + ' liquidity value - ', value)
      let url = coingeckoBaseURL + 'coins/ethereum/contract/' + token1
      console.log('Sending coingecko url - ' + url)
      //send message
      sendMessage(`
        Liquidity of ${symbols[token0]} - ${value}
        Coingecko url - ${url}
      `)
    }
  } else if (addresses.includes(token1)) {
    let value = getValue(_reserve1)
    if (value >= liquidityThreshold[token1]) {
      console.log(symbols[token1] + ' liquidity value - ', value)
      let url = coingeckoBaseURL + 'coins/ethereum/contract/' + token0
      console.log('Sending coingecko url - ' + url)
      //send message
      sendMessage(`
        Liquidity of ${symbols[token1]} - ${value}
        Coingecko url - ${url}
      `)
    }
  }
  return
}
