const express = require("express")
const cors = require("cors")
const routes = require("./routes/index.js")
const db = require("../db-connect.js")
require("dotenv").config()
const app = express()
import {
  scheduleS1Job,
  scheduleGasJob,
  scheduleLiquidationJob
} from "./core/scheduler"

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse application/json
app.use(express.json())
app.use(cors())
app.use("/", routes)

/*
db.on("error", () => {
  console.error.bind(console, "connection error:")
  process.exit(10)
})

db.once("open", async function() {
  console.log("Connected to Database...")
  console.log("Scheduling S1 job")
  scheduleS1Job()
  console.log("Scheduling GAS job")
  scheduleGasJob()
  //start express server
  app.listen(process.env.PORT, function() {
    console.log(`Server started on Port - ${process.env.PORT}`)
  })
}) */

app.listen(process.env.PORT, function() {
  console.log(`Server started on Port - ${process.env.PORT}`)
  scheduleLiquidationJob()
})
