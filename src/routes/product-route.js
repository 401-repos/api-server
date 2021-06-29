'use strict';

const express = require('express');
const router = express.Router();
const Model = require('../models/collection.js');
const productsSchema = require('../models/products');
const productDB = new Model(productsSchema);

router.route('/products').get(getAllHandler).post(createHandler);
router.route('/products/:id').get(getOneHandler).put(updateHandler).delete(deleteHandler);

async function getAllHandler(req, res) {
    const result = await productDB.read();
    res.status(200).json(result);
}
async function getOneHandler(req, res) {
    let id = req.params.id;
    const result = await productDB.read(id)
    res.status(200).json(result);
}
async function createHandler(req, res) {
    const createdObj = await productDB.add(req.body);
    res.status(201).json(createdObj);
}
async function updateHandler(req, res) {
    const upadtedObj = await productDB.update(req.params.id, req.body);
    res.status(202).json(upadtedObj);
}
async function deleteHandler(req, res) {
    const deletedObj = await productDB.delete(req.params.id);
    res.status(2002).json(deletedObj);
}

module.exports = router;