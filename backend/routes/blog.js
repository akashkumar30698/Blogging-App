const express = require("express")
const router = express.Router()
const { handleUserAddBlog, handleUserYourPosts,handleDeletePost} = require("../controller/blog")
const { uploadFiles } = require("../multer/upload")



//                            get this name from frontend input tag
               //                                  |
router.post("/:user/blog",uploadFiles().single('upload') ,handleUserAddBlog)


//Your posts
router.get("/:user/posts",handleUserYourPosts)




//Delete Post
router.delete("/:user/posts",handleDeletePost)




module.exports = {
    router,
}