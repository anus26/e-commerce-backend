import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import connectDB from './src/Config/db.js'
import cors from 'cors'
import router from './src/routes/User.routes.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",  // your frontend URL
  credentials: true
}));
app.use(cookieParser())
connectDB()

app.use('/api/v1/user',router)
app.get('/', (req, res) => {
  res.send('Hello karachi!')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
