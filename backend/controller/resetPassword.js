const { newUser } = require("../model/userAuth")


async function handleResetPassword(req,res){
        
        

          try{
            const { email,password,confirmPassword } = req.body

          //  
///
              const checkEmailExist = await newUser.findOne({ email })



            if(password != confirmPassword || !checkEmailExist){
                return res.json("failure")
            }


          await newUser.findOneAndUpdate({email : email},
            { $set : {password : password}},
            { new : true }
        )
             return res.json("success")
    
    }


         catch(err){
             console.log("Error updating data in database at resetPassword.jsx",err)
         }
    

}

module.exports = {
    handleResetPassword,
}