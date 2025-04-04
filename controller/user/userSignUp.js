// const userModel = require("../models/userModel");
// const bcrypt = require('bcryptjs');

// async function userSignUpController(req, res) {
//     try {
//         const { email, password, name, profilePic } = req.body;
//         const userProfilePic = profilePic || "";

//         // Validate inputs
//         if (!email) {
//             throw new Error("Please provide email");
//         }
//         if (!password) {
//             throw new Error("Please provide password");
//         }
//         if (!name) {
//             throw new Error("Please provide name");
//         }

//         // Check if user already exists
//         const user = await userModel.findOne({ email });
//         if (user) {
//             return res.status(400).json({
//                 message: "User already exists",
//                 error: true,
//                 success: false,
//             });
//         }

//         // Hash the password
//         const salt = await bcrypt.genSalt(10); // Generate a salt
//         const hashPassword = await bcrypt.hash(password, salt); // Hash the password

//         // Create a new user with the hashed password
//         const payload = {
//             email,
//             name,
//             password: hashPassword, // Use the hashed password
//             role: "GENERAL", // Default role
//         };

//         const userData = new userModel(payload);
//         const saveUser = await userData.save();

//         // Return success response
//         res.status(201).json({
//             data: saveUser,
//             success: true,
//             error: false,
//             message: "User created successfully!",
//         });
//     } catch (err) {
//         // Handle errors
//         res.status(500).json({
//             message: err.message || "An error occurred during registration",
//             error: true,
//             success: false,
//         });
//     }
// }

// module.exports = userSignUpController;


const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    try {
        const { email, password, name, profilePic } = req.body;
        const userProfilePic = profilePic || "";  // Ensure profilePic is always defined

        // Validate inputs
        if (!email) throw new Error("Please provide email");
        if (!password) throw new Error("Please provide password");
        if (!name) throw new Error("Please provide name");

        // Check if user already exists
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists",
                error: true,
                success: false,
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create a new user with the hashed password
        const payload = {
            email,
            name,
            password: hashPassword,  // Store hashed password
            profilePic: userProfilePic, // Store profile picture
            role: "GENERAL",  // Default role
        };

        const userData = new userModel(payload);
        const saveUser = await userData.save();

        // Return success response
        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully!",
        });
    } catch (err) {
        // Handle errors
        res.status(500).json({
            message: err.message || "An error occurred during registration",
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController;
