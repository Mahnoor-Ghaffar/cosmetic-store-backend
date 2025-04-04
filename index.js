const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')
const cookieParser = require('cookie-parser');
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true,
    allowedHeaders: ["Content-Type", "Authorization"],//ch
    methods: ["GET", "POST", "PUT", "DELETE"],//ch
}
))


// 
// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  // Multer Storage for Cloudinary
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "profile_pictures",
      allowed_formats: ["jpg", "png", "jpeg"],
    },
  });
  
  const upload = multer({ storage });
  
  // API Route to Upload Image
  app.post("/upload", upload.single("image"), (req, res) => {
    res.json({ imageUrl: req.file.path }); // Send Cloudinary URL to frontend
  });

app.use(express.json()); // ✅ Fix: Enables JSON parsing
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api",router)

const PORT = 5000 || process.env.PORT

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running "+PORT)
    })
});


