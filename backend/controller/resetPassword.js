const { newUser } = require("../model/userAuth")


async function handleResetPassword(req,res){
         const { email,password,confirmPassword } = req.body
           console.log(email)

          try{
            if(password == confirmPassword){
                return res.json({failure : "password is not matching"})
            }


          await newUser.findOneAndUpdate({email : email},
            { $set : {password : password}},
            { new : true }
        )
             return res.json("Updated")
    
    }


         catch(err){
             console.log("Error updating data in database at resetPassword.jsx",err)
         }
    

}

module.exports = {
    handleResetPassword,
}