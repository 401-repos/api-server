'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./src/server.js')
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGODB_URI;

server.run(PORT);
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(() => console.log('conntected to mongoDB'));