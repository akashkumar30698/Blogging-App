const cloudinary = require("cloudinary").v2;
const multer = require('multer');
const streamifier = require('streamifier');
const { Readable } = require('stream');
const fs = require("fs");

  //WHY DO WE NEED CLOUDINARY ? : user ---> website(uploads a file) ----> multer(temporary stores only on localhost) ----->cloudinary(actually stores the file)




cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


// Configure Multer to use memory storage
const storage = multer.memoryStorage();

const uploadFiles = () => {
  return multer({ storage: storage });
};






// Upload file to Cloudinary
const uploadOnCloudinary = async (fileBuffer, fileName) => {
  try {
    const stream = streamifier.createReadStream(fileBuffer);
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto', public_id: fileName },
      (error, result) => {
        if (error) {
          console.error('Error uploading to Cloudinary:', error);
          throw error;
        }
        return result;
      }
    );

    stream.pipe(uploadStream);
  } catch (error) {
    console.error('Error in uploadOnCloudinary:', error);
    throw error;
  }
};



module.exports = { 
    uploadFiles,
    uploadOnCloudinary ,
 
};
