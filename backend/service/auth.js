const jwt = require("jsonwebtoken")
//const secret = process.env.JWT_SECRET_KEY ---> secret doesnt get any value [mistake]


const setUser =(user)=>{
    const secret = process.env.JWT_SECRET_KEY
    

   const payload = {...user}
   return jwt.sign(payload,secret)
}



//Access logged in user token
const getUser = (token)=>{
    if(!token) return null

      
    try {
     return  jwt.verify(token,secret)
    }
    catch(err){
     console.log("Oops some error occured : ",err)
    }
 
}


module.exports = {
    setUser,
    getUser,
}