const express = require("express")
require("dotenv").config()
const cors = require("cors")
const mongoose = require("mongoose")
const corsOptions = require("./config/corsOptions")
const DBconnect = require("./config/DBconnect")
const PORT = process.env.PORT || 4444
const app = express()

DBconnect()
app.use(cors(corsOptions))
app.use(express.json())

app.use("/api/queue",require("./Routes/QueueRoute"))
app.get("/", (req, res) => {
  res.send("this is the home page")
})

mongoose.connection.once('open', () => {
  console.log('success to connect');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})

mongoose.connection.on('error',err=>{
  console.log(err); 
})