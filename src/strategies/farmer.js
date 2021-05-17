import moment from "moment"
import { getHealthFactor } from "../exchanges/aave"
import { sendMessage } from "../core/messenger"
require("dotenv").config()

const HF_THRESHOLD = Number(process.env.HF_THRESHOLD)
console.log("HF threshold - ", HF_THRESHOLD)

//start trading
export async function protectLiquidation() {
  try {
    console.log(
      `Starting next check for liquidation protection at ${moment(
        Date.now()
      ).format("DD/MM/YYYY HH:mm:ss")} `
    )

    let HF = await getHealthFactor()
    console.log("Health Factor - ", HF)

    if (Number(HF) < HF_THRESHOLD) {
      sendMessage(`
        ******* AAVE (Polygon) Farmer ********
        HF - ${HF}
        `)
    }

    //console.log(readableBalance(uUSDC.liquidityRate, 6))
    // check collateral factor on Aave

    /** if C.F. > 1.10,
      //Borrow proportional USDC/USDT upto 1.10 C.F.

      // Deposit borrowed amount to Sushi pool

      // Stake LPT into Sushi Farm
      */

    /**  if C.F. <= 1.06
      // calculate Stake to maintain C.F. > 1.10

      // Unstake LPT from Sushi Farm proportion to LPT

      // Remove USDC/USDT from Sushi Pool

      // Repay loan on Aave for USDC and USDT

      // check the if C.F. >= 1.06 now
      */
  } catch (err) {
    sendMessage(`
      xxxxx ERROR xxxxxx
      [AAVE Farmer]
      ${err.message}
      `)

    console.error(err)
  }
}
