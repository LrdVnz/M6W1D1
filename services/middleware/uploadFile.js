const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dogunqggs",
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const optionsCover = {
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "covers",
    },
  }),
};

const optionsAvatar = {
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "avatar",
    },
  }),
};

const uploadCover = multer(optionsCover).single("cover");

const uploadAvatar = multer(optionsAvatar).single("avatar");

module.exports = { 
  uploadCover : uploadCover,
  uploadAvatar: uploadAvatar
};
