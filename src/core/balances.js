const Web3 = require("web3")
require("dotenv").config()
import abi from "../abi"
import { getValue } from "../utils"

//instantiate web3
let web3 = new Web3(process.env.INFURA_URL)
let instance = new web3.eth.Contract(abi, process.env.OCEAN_ADDRESS)

export async function getBalance(walletAddress) {
  let balanceInUnits = await instance.methods.balanceOf(walletAddress).call()
  let balance = await getValue(balanceInUnits, 18)
  console.log(`${walletAddress} : OCEAN Balance - `, balance)
  return Number(balance).toFixed(3)
}

export async function getTotalSupply(walletAddress) {
  let balanceInUnits = await instance.methods.balanceOf(walletAddress).call()
  let balance = await getValue(balanceInUnits, 18)
  console.log(`${walletAddress} : OCEAN Balance - `, balance)
  return Number(balance).toFixed(3)
}
