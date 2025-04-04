const axios = require("axios");
const cloudinary = require("../../middleware/cloudinary");
const Product = require("../../models/Product");

exports.fetchAndStoreProducts = async (req, res) => {
    try {
        const response = await axios.get("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline");

        const products = response.data;

        for (const item of products) {
            // Upload Image to Cloudinary
            const uploadedResponse = await cloudinary.uploader.upload(item.image_link, {
                folder: "makeup-products",
            });

            // Save Product in MongoDB
            const newProduct = new Product({
                brand: item.brand,
                name: item.name,
                price: item.price,
                image_url: uploadedResponse.secure_url, // Save Cloudinary Image URL
                product_link: item.product_link,
                description: item.description,
                product_type: item.product_type,
                rating: item.rating,
            });

            await newProduct.save();
        }

        res.status(200).json({ message: "Products saved successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
