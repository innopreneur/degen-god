const Web3 = require("web3")
require("dotenv").config()
import { WMATIC, WETH, USDC, USDT } from "../utils/token"
import { readableBalance } from "../utils/web3"
import { getPrice } from "../utils/coingecko"

const protocolDataProviderABI = require("../abi/aave-protocol-data-provider")
const protocolDataProviderAddress = "0x7551b5D2763519d4e37e8B81929D336De671d46d"

//instantiate web3
let web3 = new Web3(process.env.RPC_NODE)
const MATIC_LIQ_THRESHOLD = Number(process.env.MATIC_LIQ_THRESHOLD)
const ETH_LIQ_THRESHOLD = Number(process.env.ETH_LIQ_THRESHOLD)
const userAccount = process.env.FROM

export async function getUserData(asset, user) {
  //create token instance from abi and contract address
  const protocolDataProviderInst = new web3.eth.Contract(
    protocolDataProviderABI,
    protocolDataProviderAddress,
    {
      gasPrice: "1000000000" // default gas price in wei, 4 gwei in this case
    }
  )

  let data = await protocolDataProviderInst.methods
    .getUserReserveData(asset, user)
    .call()

  return data
}

export async function getHealthFactor() {
  //get collateral deposits

  let uWMATIC = await getUserData(WMATIC.address, userAccount)
  let colWMATIC = readableBalance(uWMATIC.currentATokenBalance, WMATIC.decimals)
  let priceWMATIC = await getPrice("matic-network")
  let colWMATICInETH = priceWMATIC * colWMATIC
  let normColWMATICInETH = Number(colWMATICInETH) * MATIC_LIQ_THRESHOLD

  console.log("Col of WMATIC in ETH - ", colWMATICInETH)
  console.log("Normalised collateral of WMATIC in ETH - ", normColWMATICInETH)
  let uWETH = await getUserData(WETH.address, userAccount)
  let colWETH = readableBalance(uWETH.currentATokenBalance, WETH.decimals)
  let normColWETH = Number(colWETH) * ETH_LIQ_THRESHOLD

  console.log("Col of ETH in ETH - ", colWETH)
  console.log("Normalised collateral of WETH - ", normColWETH)

  let totalNormColInETH = Number(normColWETH) + Number(normColWMATICInETH)

  console.log("Total Normalised Collateral in ETH - ", totalNormColInETH)

  // get borrows
  let uUSDC = await getUserData(USDC.address, userAccount)
  let loanUSDC = readableBalance(uUSDC.currentVariableDebt, USDC.decimals)
  let priceUSDC = await getPrice("usd-coin")
  let loanUSDCInETH = Number(loanUSDC) * Number(priceUSDC)

  let uUSDT = await getUserData(USDT.address, userAccount)
  let loanUSDT = readableBalance(uUSDT.currentVariableDebt, USDT.decimals)
  let loanUSDTInETH = Number(loanUSDT) * Number(priceUSDC)

  let totalLoanInETH = Number(loanUSDCInETH) + Number(loanUSDTInETH)
  console.log("Total Loan in ETH - ", totalLoanInETH)

  let healthFactor = Number(totalNormColInETH) / Number(totalLoanInETH)

  console.log("Health Factor - ", healthFactor)
  return healthFactor - 0.01 //normalising to AAVE's health factor
}
