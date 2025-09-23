import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import connectDB from './src/Config/db.js'
import cors from 'cors'
import router from './src/routes/User.routes.js'
import cookieParser from 'cookie-parser'
import coustrouter from './src/routes/Coustmer.routes.js'
import monthrouter from './src/routes/Monthly.routes.js'
import Productrouter from './src/routes/Product.routes.js'
import routerinvoice from './src/routes/Invoice.routes.js'



console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Not Loaded ❌");

const app = express()
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",  // your frontend URL
  credentials: true
}));

app.use(cookieParser())
connectDB()
app.use(express.urlencoded({ extended: true }));



// transporter()
app.use('/api/v1/user',router)
app.use('/api/v1/coust',coustrouter)
app.use('/api/v1',monthrouter)
app.use('/api/v1',Productrouter)
app.use('/api/v1',routerinvoice)
app.get('/', (req, res) => {
  res.send('Hello karachi!')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
