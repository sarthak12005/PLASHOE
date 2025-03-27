const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Product = require('../models/productModel');

// Fetch all products
router.get('/GetProducts', async (req, res) => {
    try {
        const products = await Product.find();
        if (!products || products.length === 0) {
            return res.status(404).json({ message: "Products not found" });
        }
        res.status(200).send(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Add a new product
router.post('/addProduct', async (req, res) => {
    console.log("this is post request");
    const { productName, productPrize, imgUrl, gender } = req.body;

    if (!productName || !productPrize || !imgUrl || !gender) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    try {
        const newProduct = new Product({
            productName,
            productPrize,
            gender,
            imgUrl
        });

        await newProduct.save();
        console.log("Product saved to the database successfully");
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        console.error("Error while adding product:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});



module.exports = router;
