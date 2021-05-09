'use strict';

const express = require('express');
const app = express();
const errorHandler = require('./error/500.js');
const notFoundHandler = require('./error/404.js');
const clothesRoute = require('./routes/clothes-route.js');
const foodRoute = require('./routes/food-route.js');

app.use(express.json());
app.use(errorHandler);
app.use('/', clothesRoute);
app.use('/', foodRoute);

app.get('/', (req, res) => {
    res.send("Welcome Home!");
});

app.use('*', notFoundHandler);

function run(PORT) {
    app.listen(PORT, () => {
       console.log('Listening on ', PORT); 
    });
}

module.exports = {
    app,run
}