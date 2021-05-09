'use strict';

const mongoose = require("mongoose");

const clothesSchema = mongoose.Schema({
    name: { type: String, required: true },
    discription: { type: String, required: false },
    price:{type: String, required: true}
});
const Cloth = mongoose.model('Cloth', clothesSchema);
module.exports = Cloth;