require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/productModel'); // Adjust the path as needed

const uri = process.env.MONGO_URL;

if (!uri) {
  console.error("MONGO_URI is not defined!");
  process.exit(1);
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


// Products to insert
const products = [
    {
        productName: "Crimson Glide",
        productPrize: 849,
        imgUrl: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-016-600x600.jpg",
        gender: "Women"
    },
    {
        productName: "Skyline Stride",
        productPrize: 799,
        imgUrl: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-003-600x600.jpg",
        gender: "Women"
    },
    {
        productName: "Urban Trekker",
        productPrize: 899,
        imgUrl: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-005-600x600.jpg",
        gender: "Men"
    },
    {
        productName: "Shadow Runner",
        productPrize: 999,
        imgUrl: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-018-600x600.jpg",
        gender: "Men"
    },
    {
        productName: "Midnight Sprinter",
        productPrize: 759,
        imgUrl: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-006-600x600.jpg",
        gender: "Men"
    },
    {
        productName: "Blush Trail",
        productPrize: 819,
        imgUrl: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-002-600x600.jpg",
        gender: "Women"
    },
    {
        productName: "Steel Voyager",
        productPrize: 879,
        imgUrl: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-008-600x600.jpg",
        gender: "Men"
    },
    {
        productName: "Onyx Drift",
        productPrize: 939,
        imgUrl: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-007-600x600.jpg",
        gender: "Men"
    },
    {
        productName: "Coral Breeze",
        productPrize: 859,
        imgUrl: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-011-600x600.jpg",
        gender: "Women"
    },
    {
        productName: "Lavender Rush",
        productPrize: 899,
        imgUrl: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-010-600x600.jpg",
        gender: "Women"
    },
    {
        productName: "Sunset Chase",
        productPrize: 829,
        imgUrl: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-004-600x600.jpg",
        gender: "Women"
    },
    {
        productName: "Iron Pulse",
        productPrize: 969,
        imgUrl: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-017-600x600.jpg",
        gender: "Men"
    },
    {
        productName: "Rose Quartz",
        productPrize: 889,
        imgUrl: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-014-600x600.jpg",
        gender: "Women"
    },
    {
        productName: "Urban Explorer Sneakers",
        productPrize: 899,
        imgUrl: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-019-600x600.jpg",
        gender: "Men"
    },
    {
        productName: "Street Style Runners",
        productPrize: 999,
        imgUrl: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-020-600x600.jpg",
        gender: "Men"
    },
    {
        productName: "Classic Edge Sneakers",
        productPrize: 799,
        imgUrl: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-006-600x600.jpg",
        gender: "Men"
    },
    {
        productName: "Elegant Step Heels",
        productPrize: 849,
        imgUrl: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-013-600x600.jpg",
        gender: "Women"
    },
    {
        productName: "Chic Comfort Flats",
        productPrize: 749,
        imgUrl: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-001-600x600.jpg",
        gender: "Women"
    },
    {
        productName: "Graceful Stride Loafers",
        productPrize: 699,
        imgUrl: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-010-600x600.jpg",
        gender: "Women"
    },
    {
        productName: "Bold Step Sneakers",
        productPrize: 799,
        imgUrl: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-009-600x600.jpg",
        gender: "Women"
    },
    {
        productName: "Sleek Stride Pumps",
        productPrize: 899,
        imgUrl: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-004-600x600.jpg",
        gender: "Women"
    },
    {
        productName: "Delicate Walk Sandals",
        productPrize: 759,
        imgUrl: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-002-600x600.jpg",
        gender: "Women"
    }
]


// Insert products into the database
Product.insertMany(products)
    .then(() => {
        console.log('Products inserted successfully');
        mongoose.connection.close();
    })
    .catch((err) => {
        console.error('Error inserting products:', err);
        mongoose.connection.close();
    });
