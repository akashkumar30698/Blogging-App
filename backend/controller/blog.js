const { userBlog } = require("../model/blog");
const { uploadOnCloudinary } = require("../cloud/cloudinary.js")



// Middleware to handle file uploads
const upload = uploadFiles().single('file'); 



async function handleUserAddBlog(req, res) {
    

  try {

    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: "Error uploading file", error: err.message });
      }
    })





    const localFilePath = req.file.path
    
    const { title, body } = req.body;


          // Upload file buffer to Cloudinary
          const fileName = `${Date.now()}-${file.originalname}`;
    const cloudResponse = await uploadOnCloudinary(file.buffer, fileName);
    const userImageURL = cloudResponse.secure_url
    


    await userBlog.create({
      blogImageURL: userImageURL,
      title: title,
      body: body,
    });

    return res.json({
      message: "success",
    });
  } catch (error) {
    console.error('Error adding blog:', error);
    return res.status(500).json({
      message: "Failed to add blog",
      error: error.message,
    });
  }
}




async function handleUserYourPosts(req, res) {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const skip = (page - 1 ) * limit;


  try {


    const posts = await userBlog.find({})
                            .skip(skip)
                            .limit(limit);
                          
    const totalPosts = await userBlog.countDocuments({ });

  return  res.json({ posts, totalPosts, totalPages: Math.ceil(totalPosts / limit) })

    
  
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return res.status(500).json({
      message: "Failed to fetch user posts",
      error: error.message,
    });
  }
}




async function handleDeletePost (req,res){

  try{
   const   postId  = req.body
   const id = postId.postId
   

   const userDelete = await userBlog.findByIdAndDelete(id)

   if(!userDelete){
    return res.json({failure : "Unable to find user"})
   }

    return res.json({success : "SuccessFully deleted post"})
  }
  catch(err){
    console.error('Error deleting user post:', err);
    return res.status(500).json({
      message: "Failed to delete user post",
      error: err.message,
    });
  }
}





module.exports = {
  handleUserAddBlog,
  handleUserYourPosts,
  handleDeletePost,
};
