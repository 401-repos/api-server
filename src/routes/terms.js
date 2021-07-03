'use strict';

const express = require('express');
const router = express.Router();
const Model = require('../models/collection.js');
const termsSchema = require('../models/terms');
const termsDB = new Model(termsSchema);

router.route('/term').get(getAllHandler).post(createHandler);
router.route('/term/:id').get(getOneHandler).put(updateHandler).delete(deleteHandler);

async function getAllHandler(req, res) {
    const result = await termsDB.read();
    res.status(200).json(result);
}
async function getOneHandler(req, res) {
    let id = req.params.id;
    const result = await termsDB.read(id)
    res.status(200).json(result);
}
async function createHandler(req, res) {
    const createdObj = await termsDB.add(req.body);
    res.status(201).json(createdObj);
}
async function updateHandler(req, res) {
    const upadtedObj = await termsDB.update(req.params.id, req.body);
    res.status(204).json(upadtedObj);
}
async function deleteHandler(req, res) {
    const deletedObj = await termsDB.delete(req.params.id);
    res.status(204).json(deletedObj);
}

module.exports = router;