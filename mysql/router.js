const express = require('express');
const response = require('../api/network/response');
const store = require('../api/store/mysql');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);
router.put('/:table', upsert);

async function list (req, res, next) {
    const datos = await store.list(req.params.table);
    response.success(req, res, datos, 200);
}

async function get (req, res, next) {
    const datos = await store.get(req.params.table, req.params.id);
    response.success(req, res, datos, 200);
}

async function insert(req, res, next) {
    const datos = await store.upset(req.params.table, req.body);
    response.success(req, res, datos, 201);
}

async function upsert(req, res, next) {
    const datos = await store.upset(req.params.table, req.body);
    response.success(req, res, datos, 200);
}

module.exports = router;