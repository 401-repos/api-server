'use strict';

const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    inventory: {
        type: Number,
        required: true
    }
});
const Product = mongoose.model('Product', productsSchema);
module.exports = Product;

