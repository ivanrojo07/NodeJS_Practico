const express = require('express');
const response = require('../api/network/response');
const store = require('../api/store/redis');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);

async function list (req, res, next) {
    const datos = await store.list(req.params.table);
    console.log('datos',datos)
    response.success(req, res, datos, 200);
}

async function get (req, res, next) {
    const datos = await store.get(req.params.table, req.params.id);
    response.success(req, res, datos, 200);
}

async function insert(req, res, next) {
    const datos = await store.upsert(req.params.table, req.body);
    response.success(req, res, datos, 201);
}

module.exports = router;