const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Setting up CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "airbnb", // folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"], // optional: use resource_type: "image" instead
    // transformation: [{ width: 800, height: 600, crop: "limit" }] // optional
  }
});

// Exporting the cloudinary and storage
module.exports = {
  cloudinary,
  storage
};
