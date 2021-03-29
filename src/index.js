const express = require("express")
const cors = require("cors")
const routes = require("./routes/index.js")
const db = require("../db-connect.js")
require("dotenv").config()
const app = express()
import { addWallets } from "./core/job"
import { scheduleUpdateJob } from "./core/scheduler"

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse application/json
app.use(express.json())
app.use(cors())
app.use("/", routes)

db.on("error", () => {
  console.error.bind(console, "connection error:")
  process.exit(1)
})

db.once("open", async function() {
  console.log("Connected to Database...")
  //adding new wallets
  console.log("Adding new wallets")
  await addWallets()
  console.log("Scheduling update job")
  scheduleUpdateJob()
  //start express server
  app.listen(process.env.PORT, function() {
    console.log(`Server started on Port - ${process.env.PORT}`)
  })
})
