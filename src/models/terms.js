'use strict';

const mongoose = require("mongoose");

const termsSchema = mongoose.Schema({
    term: { type: String, required: true },
    definition: { type: String, required: true },
    learned:{type: String, enum:['mastered', 'review', 'new'],required: true, default:'new'}
});
const Term = mongoose.model('Term', termsSchema);
module.exports = Term;