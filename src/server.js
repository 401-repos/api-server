'use strict';

const express = require('express');
const app = express();
const errorHandler = require('./error/500.js');
const notFoundHandler = require('./error/404.js');
const clothesRoute = require('./routes/clothes-route.js');
const foodRoute = require('./routes/food-route.js');
const todoRoute = require('./routes/todo-routes');
const productRouter = require('./routes/product-route');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use('/', clothesRoute);
app.use('/', foodRoute);
app.use('/', todoRoute);
app.use('/', productRouter);

app.get('/', (req, res) => {
  res.send('Welcome Home!');
});

app.use('*', notFoundHandler);

function run(PORT) {
  app.listen(PORT, () => {
    console.log('Listening on ', PORT); 
  });
}

module.exports = {
  app,run,
};