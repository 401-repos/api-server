'use strict';

const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: true
    }
});
const Food = mongoose.model('Food', foodSchema);
module.exports = Food;