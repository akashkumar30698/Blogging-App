const express = require("express")
const router = express.Router()
const { handleUserLogin , handleUserSignUp ,handleForgetPassword } = require("../controller/userAuth.js")
const { handleValidateOTP } = require("../validate/validateOTP.js")
const { handleResetPassword } = require("../controller/resetPassword.js")


router.get("/",(req,res)=>{
    return res.status(200).json({message  : "Successfully connected"})
})


//Login
router.post("/login",handleUserLogin)


//Sign UP
router.post("/signUp",handleUserSignUp)



/////////////////////////////////////////////////////////////////////////////////////




//Forget password
router.post("/forgetPassword",handleForgetPassword)


//ValidateOTP
router.post("/validateOTP",handleValidateOTP)

//ResetPassword
router.post("/resetPassword",handleResetPassword)




module.exports = {
    router,
}