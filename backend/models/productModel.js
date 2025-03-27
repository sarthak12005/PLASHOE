const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productPrize: { type: Number, required: true },
  imgUrl: { type: String, required: true },
  gender: { type: String, required: true, enum: ["Men", "Women"] },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
