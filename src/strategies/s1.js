import Web3 from 'web3'
import UniFactoryABI from '../abi/uni-factory'
import UniPairABI from '../abi/uni-pair'
import ERC20ABI from '../abi/erc20'
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
  const token0 = (await uniPairInstance.methods.token0().call()).toLowerCase()
  const token1 = (await uniPairInstance.methods.token1().call()).toLowerCase()
  const {
    _reserve0,
    _reserve1,
  } = await uniPairInstance.methods.getReserves().call()

  console.log(`Reserve0 - `, _reserve0)
  console.log(`Reserve1 - `, _reserve1)

  const token0Inst = new web3.eth.Contract(ERC20ABI, token0)
  const token1Inst = new web3.eth.Contract(ERC20ABI, token1)

  const symbol0 = await token0Inst.methods.symbol().call()
  const name0 = await token0Inst.methods.name().call()

  const symbol1 = await token1Inst.methods.symbol().call()
  const name1 = await token1Inst.methods.name().call()

  if (addresses.includes(token0)) {
    let value = getValue(_reserve0)
    console.log(`Liquidity of ${symbols[token0]} - ${value}`)
    if (value >= liquidityThreshold[token0]) {
      console.log(symbols[token0] + ' liquidity value - ', value)
      let url = coingeckoBaseURL + 'coins/ethereum/contract/' + token1
      console.log('Sending coingecko url - ' + url)
      //send message
      sendMessage(`
        Pair - [${symbol0} - ${symbol1}]
        Pair on Uniswap - https://info.uniswap.org/pair/${pairAddress}
        Names - [${name0} - ${name1}]
        Liquidity of ${symbols[token0]} - ${value}
        Coingecko url - ${url}
      `)
    }
  } else if (addresses.includes(token1)) {
    let value = getValue(_reserve1)
    console.log(`Liquidity of ${symbols[token1]} - ${value}`)
    console.log()
    if (value >= liquidityThreshold[token1]) {
      console.log(symbols[token1] + ' liquidity value - ', value)
      let url = coingeckoBaseURL + 'coins/ethereum/contract/' + token0
      console.log('Sending coingecko url - ' + url)
      //send message
      sendMessage(`
        Pair Symbol - [${symbol0} - ${symbol1}]
        Pair on Uniswap - https://info.uniswap.org/pair/${pairAddress}
        Names - [${name0} - ${name1}]
        Liquidity of ${symbols[token1]} - ${value}
        Coingecko url - ${url}
      `)
    }
  } else {
    console.log(`not useful pairs - 
    1) ${name0} - ${symbol0} 
    2) ${name1} - ${symbol1}
    `)
  }
  return
}
