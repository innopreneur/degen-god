import Web3 from 'web3'
import UniFactoryABI from '../abi/uni-factory'
import UniPairABI from '../abi/uni-pair'
import { addresses, liquidityThreshold } from '../utils/constants'
import { getValue } from '../utils/calc'
import { sendMessage } from '../core/messenger'
require('dotenv').config()

//instantiate web3
let web3 = new Web3(process.env.INFURA_URL)

const UniswapFactoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'
const uniFactoryInstance = new web3.eth.Contract(
  UniFactoryABI,
  UniswapFactoryAddress
)
export async function getPairLength() {
  let newPairs = await uniFactoryInstance.methods.allPairsLength().call()
  console.log(newPairs)
}

export async function getTokenAddressFromPair(pairId) {
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
      //send message
    }
  } else if (addresses.includes(token1)) {
    let value = getValue(_reserve1)
    if (value >= liquidityThreshold[token1]) {
      //send message
    }
  }
}
export async function getTokenInfo(address) {}
