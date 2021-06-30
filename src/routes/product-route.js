'use strict';

const express = require('express');
const router = express.Router();
const Model = require('../models/collection.js');
const productsSchema = require('../models/products');
const productDB = new Model(productsSchema);

router.route('/products').get(getAllHandler).post(createHandler);
router.route('/products/:id').get(getOneHandler).put(updateHandler).delete(deleteHandler);
router.put('/products/increment/:id', incrementItemPurchased);
router.put('/products/decrement/:id', decrementItemPurchased);
router.put('/products/delete/:id', deleteItemPurchased);
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
    res.status(202).json(deletedObj);
}
async function incrementItemPurchased(req, res){
    const {id} = req.params;
    const get = await productDB.read(id);
    if(get.inventory < 1){
        throw new Error("No items in the inventory")
    }
    const updated = await productDB.update(id, {inventory:--get.inventory});
    res.status(202).json(updated);

}
async function decrementItemPurchased(req, res){
    const {id} = req.params;
    const get = await productDB.read(id);
    const updated = await productDB.update(id, {inventory:++get.inventory});
    res.status(202).json(updated);

}
async function deleteItemPurchased(req, res){
    const {id} = req.params;
    const get = await productDB.read(id);
    const newItem = req.body.qty+get.inventory;
    console.log(newItem);
    const updated = await productDB.update(id, {inventory:newItem});
    res.status(202).json(updated);
}
module.exports = router;