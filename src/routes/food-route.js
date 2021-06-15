'use strict';

const express = require('express');
const router = express.Router();
const Model = require('../models/collection.js');
const foodSchema = require('../models/food-schema');
const foodDB = new Model(foodSchema);

router.route('/food').get(getAllHandler).post(createHandler);
router.route('/food/:id').get(getOneHandler).put(updateHandler).delete(deleteHandler);

async function getAllHandler(req, res) {
    const result = await foodDB.read();
    res.status(200).json(result);
}
async function getOneHandler(req, res) {
    let id = req.params.id;
    const result = await foodDB.read(id)
    res.status(200).json(result);
}
async function createHandler(req, res) {
    const createdObj = await foodDB.add(req.body);
    res.status(201).json(createdObj);
}
async function updateHandler(req, res) {
    const upadtedObj = await foodDB.update(req.params.id, req.body);
    res.status(200).json(upadtedObj);
}
async function deleteHandler(req, res) {
    const deletedObj = await foodDB.delete(req.params.id);
    res.status(200).json(deletedObj);
}

module.exports = router;
