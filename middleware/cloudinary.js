const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// 🔹 Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔹 Set up Multer storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'profile_pictures', // 📂 Folder where images will be stored
        allowed_formats: ['jpg', 'png', 'jpeg'], // ✅ Allowed formats
    },
});

// 🔹 Multer middleware for handling image uploads
const upload = multer({ storage });

module.exports = { upload, cloudinary };


