import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import express from 'express'
import connectDB from './src/Config/db.js'
const app = express()

connectDB()
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
