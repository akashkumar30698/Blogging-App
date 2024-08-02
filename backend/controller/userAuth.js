const { newUser } = require("../model/userAuth")
const { setUser }  = require("../service/auth")
const nodemailer = require('nodemailer'); //Used for sending OTP to emails
const bcrypt = require('bcrypt');
require('dotenv').config(); //used for securing data so important credentials cannot be accessed through source code



let username = ""
let userId = null

async function handleUserLogin(req,res){
     const {email,password} = req.body
     const user =   await newUser.findOne({email})
   
     
   
    
    

      if(!user || user == null  ){
        return res.json("login-failed")
      }

      userId = user._id

      const hashedPassword = user.password
      const match = await bcrypt.compare(password, hashedPassword);
      


      if(!match){
        return res.json("login-failed")
      }
     

      else{
          
          const token =  setUser({email,password})
        
             res.cookie("Login-Token", token, {
            domain: "blogging-app-backendd.vercel.app", // Backend url
            httpOnly: true,
            secure: true,
            sameSite: "None", // Ensure cookies are sent across different origins
            path: "/"
          });
          res.send("Cookie Set")
        

       //Sending username to frontend 
       const user =   await newUser.findOne({email})   
       userId = user._id
        
         
        return res.json({
          message : "message success",
          params : userId,
         
        })
      }
}


//SignUp
async function handleUserSignUp(req,res){
       
    try{
       const  { name , email , password }  = req.body

       const checkUnique = await newUser.findOne({email})

       if(checkUnique){
        return res.json("exist")
       }
      else{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await newUser.create({
            name : name,
            email : email,
            password : hashedPassword,
         })
         
         
        return res.status(201).json({message : "Sign Up successful "})
      }
        
    }
    catch (err){
         console.log("sign Up failed some error occured",err)
         return res.status(400).json({"Error" : "SIGN UP Failed"})
    }
}


 function handleParams(){
  return username
}



function handleUserId(){
  return userId
}

/////////////////////////////////////////////////////////////////////////////////////




// Generate OTP
function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit OTP
  return otp.toString();
}

//Stores Otp for temporary time
let storeOTP = 0




// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'niteshsagar312004@gmail.com',//senders mail
      pass: 'kvpj srgg amwd jqvh' //You have to manually generate this. Go to gmail > click on profile picture > manage your google account > security > turn on 2 step authenthication > go to search bar > search app passwords > code is generated
  }
});





//Forget Password
 async function handleForgetPassword(req,res){

  const {  email } = req.body

  try{
   // 
      
     const userExist =  await newUser.findOne({ email })



    if(!userExist){
      return res.json("Invalid")
    }

    else{
     
      const otp = generateOTP();

      const mailOptions = {
          from: 'niteshsagar312004@gmail.com', //Same sender email
          to: email,
          subject: 'Your OTP Code',
          text: `Your OTP code is ${otp}`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error)
              return res.status(500).send({ error: 'Failed to send OTP' });
          }
   
          storeOTP = parseInt(otp)
          console.log(storeOTP)
        return   res.status(200).send({ success: 'OTP sent successfully' });
      });
  

    }

  }
  catch(err){
    console.log("Internal server error at /controller/userAuth.js",err)
  }
 }

 

 function storeTemporaryOTP(){
  
  return storeOTP
 }

   
 







module.exports = {
    handleUserLogin,
    handleUserSignUp,
    handleParams,
    handleForgetPassword,
    storeTemporaryOTP,
    handleUserId
}