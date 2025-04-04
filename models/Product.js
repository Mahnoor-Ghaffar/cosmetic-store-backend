const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    brand: String,
    name: String,
    price: String,
    image_url: String,  // Cloudinary URL
    product_link: String,
    description: String,
    product_type: String,
    rating: Number,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
