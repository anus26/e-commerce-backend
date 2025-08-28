import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import connectDB from './src/Config/db.js'
import cors from 'cors'
import router from './src/routes/User.routes.js'

const app = express()
app.use(express.json())
app.use(cors())
connectDB()

app.use('/api/v1/user',router)
app.get('/', (req, res) => {
  res.send('Hello karachi!')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
