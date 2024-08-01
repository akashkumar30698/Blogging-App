const { storeTemporaryOTP } = require("../controller/userAuth.js")


function handleValidateOTP(req,res){
   const { otp } = req.body
     const storedOTP = storeTemporaryOTP()
     const userOTP = parseInt(otp)
   

   if(userOTP == storedOTP){
    return res.json({message : "correct"})
   }
   else {
    return res.json({message : "incorrect"})
   }
}

module.exports = {
    handleValidateOTP,
}