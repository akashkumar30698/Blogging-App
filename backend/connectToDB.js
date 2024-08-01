const mongoose = require("mongoose")
/*
REMEMBER WHEN CONNECTING TO CLUSTER USE ENCODED VALUES IN  URL OF MONOGB_CONNECTION(.env) 
ONLY WHEN YOU HAVE USED SPECIAL CHARACTERS IN YOUR PASSWORD LIKE @, REPLACE IT WITH ENCODED VALUE %40
 */

async function connectToDB(url){
   return mongoose.connect(url)
}

module.exports = {
   connectToDB, 
}