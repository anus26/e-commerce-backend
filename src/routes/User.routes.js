import express from "express"
import { alluser, alluserid, forgetpassword, logout, resendOtp, resetpass, resetpassword, sendMailcon, signin, signup, verification } from "../Controllers/User.Controllers.js"
import authmiddleware from "../middleware/User.middleware.js"
const router=express.Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/logout',logout)
router.get('/alluserid/:id',alluserid)
router.get('/alluser',authmiddleware,alluser)
router.post('/sendmail',sendMailcon)
router.post('/forget',forgetpassword)
router.post('/reset-password/:token', resetpassword);
router.post('/verif',verification)
router.post('/reset',resetpass)
router.get('/resend',resendOtp)

export default  router