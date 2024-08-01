const mongoose = require("mongoose")

//Schema

const user = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        Unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    role : {          //  Means role is either admin or user
        type : String,//  | 
        enum : ["USER","ADMIN"],
        default : "USER",

    },
    profileImageURL : {
        type : String,
        default :"https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png",
    },


},
{
   timestamps : true, 
}
)

const newUser = mongoose.model("newUser",user)

module.exports = {
    newUser,
}