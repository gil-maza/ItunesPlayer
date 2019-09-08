const express = require('express');
const router = express.Router();
const Query = require('../models/Query');
const TopQuery = require('../models/TopQuery');
const insertNewQuery = require('./queriesLogic');

router.get('/', async (req, res) => {
    try {
        const queries = await Query.find();
        res.json(queries);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    try {
        const savedQuery = await insertNewQuery(req.body);
        res.json(savedQuery);
    } catch (err) {
        res.json({ message: err });
    }

});

router.get('/top', async (req, res) => {
    try {
        const topQueries = await TopQuery.find().sort({ amount: -1 });
        res.json(topQueries);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;