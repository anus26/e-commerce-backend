import express from "express"
import { alluserid, logout, signin, signup } from "../Controllers/User.Controllers.js"
const router=express.Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.delete('/logout',logout)
router.get('/alluserid/:id',alluserid)
export default  router