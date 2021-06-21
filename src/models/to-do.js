'use strict';

const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    assignee:{
        type:String,
        required:true
    },
    difficulty:{
        type:Number,
        required:true
    },
    complete:{
        type:Boolean,
        required:true
    }
});
const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;