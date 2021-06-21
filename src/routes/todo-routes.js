'use strict';

const express = require('express');
const router = express.Router();
const Model = require('../models/collection.js');
const todoSchema = require('../models/to-do');
const todoDB = new Model(todoSchema);

router.route('/todo').get(getAllHandler).post(createHandler);
router.route('/todo/:id').get(getOneHandler).put(updateHandler).delete(deleteHandler);

async function getAllHandler(req, res) {
  const result = await todoDB.read();
  res.status(200).json(result);
}
async function getOneHandler(req, res) {
  let id = req.params.id;
  const result = await todoDB.read(id);
  res.status(200).json(result);
}
async function createHandler(req, res) {
  const createdObj = await todoDB.add(req.body);
  res.status(201).json(createdObj);
}
async function updateHandler(req, res) {
  const upadtedObj = await todoDB.update(req.params.id, req.body);
  res.status(204).json(upadtedObj);
}
async function deleteHandler(req, res) {
  const deletedObj = await todoDB.delete(req.params.id);
  res.status(204).json(deletedObj);
}

module.exports = router;