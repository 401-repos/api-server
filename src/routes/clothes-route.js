'use strict';

const express = require('express');
const router = express.Router();
const Model = require('../models/collection.js');
const clothesSchema = require('../models/clothes-schema.js');
const clothesDB = new Model(clothesSchema);

router.route('/clothes').get(getAllHandler).post(createHandler);
router.route('/clothes/:id').get(getOneHandler).put(updateHandler).delete(deleteHandler);

async function getAllHandler(req, res) {
    const result = await clothesDB.read();
    res.status(200).json(result);
}
async function getOneHandler(req, res) {
    let id = req.params.id;
    const result = await clothesDB.read(id)
    res.status(200).json(result);
}
async function createHandler(req, res) {
    const createdObj = await clothesDB.add(req.body);
    res.status(201).json(createdObj);
}
async function updateHandler(req, res) {
    const upadtedObj = await clothesDB.update(req.params.id, req.body);
    res.status(200).json(upadtedObj);
}
async function deleteHandler(req, res) {
    const deletedObj = await clothesDB.delete(req.params.id);
    res.status(200).json(deletedObj);
}

module.exports = router;
