const mongoose= require("mongoose")

const UseraddBlog = new  mongoose.Schema({
     blogImageURL : {
        type : String,
     },
     title : {
         type : String,
         required : true,
     },
     body : {
        type : String,
         required : true,
     },
     createdBy:{
        type : mongoose.Schema.Types.ObjectId, // ------   Used for interlinking two folders of database
        ref : "newUser"                     //----------------|
     }


},
{
    timestamps : true,
}
)


const userBlog = mongoose.model("userBlog",UseraddBlog)

module.exports = {
    userBlog,
}

