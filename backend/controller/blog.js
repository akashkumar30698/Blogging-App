const { userBlog } = require("../model/blog");
const { uploadOnCloudinary } = require("../cloud/cloudinary.js")
const { handleUserId } = require("./userAuth.js")

async function handleUserAddBlog(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const localFilePath = req.file.path;
    const { title, body } = req.body;

    
    const cloudURL = await uploadOnCloudinary(localFilePath);
    if (!cloudURL || !cloudURL.url) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    const userImageURL = cloudURL.url.replace(/^http:\/\//i, "https://");
    const userId = handleUserId()



    await userBlog.create({
      blogImageURL: userImageURL,
      title: title,
      body: body,
      createdBy: userId
    });

    return res.json({ message: "success" });
  } catch (error) {
    console.error("Error adding blog:", error);
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
     const userIdToFind = handleUserId()

    const posts = await userBlog.find({createdBy: userIdToFind })
                            .skip(skip)
                            .limit(limit);
                          
    const totalPosts = await userBlog.countDocuments({createdBy: userIdToFind });

  return  res.json({ posts, totalPosts, totalPages: Math.ceil(totalPosts / limit) })

    
  
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return res.status(500).json({
      message: "Failed to fetch user posts",
      error: error.message,
    });
  }
}

//All User Posts
async function handleAllUserPosts(req,res){
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const skip = (page - 1 ) * limit;


  try {
     const userIdToExclude = handleUserId()


 //                             ne = not equal
     //                          |
    const filter = {createdBy: {$ne: userIdToExclude}}

    const posts = await userBlog.find(filter)
                            .skip(skip)
                            .limit(limit)
                            .exec() //(Optionals to use) exec stands for execution it simply returns a promise 
                          
    const totalPosts = await userBlog.countDocuments(filter);

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
  handleAllUserPosts,
};
