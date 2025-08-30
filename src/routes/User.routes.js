import express from "express"
import { alluser, alluserid, logout, signin, signup } from "../Controllers/User.Controllers.js"

import authmiddleware from "../middleware/User.middleware.js"
const router=express.Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/logout',logout)
router.get('/alluserid/:id',alluserid)
router.get('/alluser',authmiddleware,alluser)
export default  router