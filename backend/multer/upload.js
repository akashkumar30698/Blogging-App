const multer = require('multer');
const path = require('path');
  
  
//Consider reading docs for better understanding
//https://medium.com/@mohsinogen/handling-file-uploads-and-file-validations-in-node-js-with-multer-a3716ec528a3
       




// Configure storage engine and filename 
const storage = multer.diskStorage({   //          |  define file directory where you want to upload(Finds the  folder and inserts the file inside it and if failed to find it creates one)
    destination: function (req, file, cb) {//      |
      cb(null, '/tmp');  // Use /tmp directory for |temporary storage .USE /tmp to AVOID DEPLOYMENT ERRORS TMP STORES FILES FOR TEMPORARY TIME
    },//           |_______________________________|                                        
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    }
  });


  
/*
// Configure storage engine and filename
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
*/

 
  const uploadFiles = () => {
    return multer({ storage: storage });
  };
  
  module.exports = {
    uploadFiles,
  };
  