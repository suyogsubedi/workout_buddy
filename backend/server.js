// Now everything in .env will be accessible by process.env.VariableName
require('dotenv').config()

const express = require('express')

const mongoose = require("mongoose")

// Workout routes
const workoutRoutes = require("./routes/workouts")

// express app
const app = express()


// middleware

app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})



// routes
app.use('/api/workouts',workoutRoutes)


// Connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("Connected to db")
  app.listen(process.env.PORT, () => {
    console.log('Connect and listening on port : ', process.env.PORT)
  })
}).catch(err=>console.log("Could not connect", err))

// listen for requests
