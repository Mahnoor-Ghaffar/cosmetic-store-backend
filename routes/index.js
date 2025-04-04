const express = require("express");
const router = express.Router();

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require('../controller/user/userSignIn');
const userDetailsController = require('../controller/user/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');
const UploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const getCategoryProduct = require('../controller/product/getCategoryProductOne');
// import { fetchAndStoreProducts } from "../controllers/productController.js";
const { fetchAndStoreProducts } = require("../controller/product/productController");
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')


// cloud
const { upload } = require('../middleware/cloudinary'); // ✅ Now you have it!
const userModel = require('../models/userModel');

// ✅ Add this GET route
router.get("/", (req, res) => {
    res.json({ message: "API is working!" });
});

router.post("/signup", userSignUpController);
router.post("/signin",userSignInController);
router.get("/user-details",authToken,userDetailsController);

// cloudnary profile p
router.post('/upload-profile-pic', upload.single("image"), async (req, res) => {
    try {
        const userId = req.body.userId; // Get user ID from request
        if (!userId || !req.file.path) {
            throw new Error("Missing userId or image file");
        }

        // ✅ Update user profilePic in the database
        const updatedUser = await userModel.findByIdAndUpdate(userId, {
            profilePic: req.file.path
        }, { new: true });

        res.json({
            success: true,
            message: "Profile picture updated successfully",
            profilePic: updatedUser.profilePic
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});



// Logout route
router.get("/userLogout",userLogout)

//admin panel 
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct);
// Api
router.get("/get-cosmetics", fetchAndStoreProducts);
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)

module.exports = router;
