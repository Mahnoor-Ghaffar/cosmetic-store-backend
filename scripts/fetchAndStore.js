const axios = require("axios");
const connectDB = require("../config/db");
const Product = require("../models/Product");

const fetchDataAndStore = async () => {
  await connectDB();

  try {
    const response = await axios.get(
      "https://makeup-api.herokuapp.com/api/v1/products.json?product_type=nail_polish"
    );

    const products = response.data;

    // Pehle se stored products delete karna (optional)
    await Product.deleteMany({});

    // API se data MongoDB me insert karna
    await Product.insertMany(products);

    console.log("✅ Data successfully uploaded to MongoDB!");
  } catch (error) {
    console.error("❌ Error fetching or storing data:", error);
  } finally {
    process.exit();
  }
};

fetchDataAndStore();
