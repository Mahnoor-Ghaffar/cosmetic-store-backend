// const userModel = require("../models/userModel")

// const uploadProductPermission = async(userId) => {
//     const user = await userModel.findById(userId)

//     if(user.role === 'ADMIN'){
//         return true
//     }

//     return false
// }


// module.exports = uploadProductPermission

const userModel = require("../models/userModel");

const uploadProductPermission = async (userId) => {
    const user = await userModel.findById(userId);

    // Check if user exists and has the ADMIN role
    if (user && user.role === 'ADMIN') {
        return true;
    }

    return false;
};

module.exports = uploadProductPermission;