const multer = require('multer'); 
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')          

cloudinary.config({ 
  cloud_name: 'dogunqggs', 
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET 
});


const options = {
  storage: new CloudinaryStorage({
    cloudinary, 
    params: { 
      folder: "covers",
    }
  })
}

const uploadFile = multer(options).single('cover')

module.exports = uploadFile; 
  
