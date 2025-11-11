const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');
const logger = require('../logger');

// GET all gifts
router.get('/', async (req, res, next) => {
    logger.info('GET /api/gifts called');
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        const gifts = await collection.find({}).toArray();

        res.json(gifts);
    } catch (e) {
        logger.error('Error fetching all gifts', e);
        next(e);
    }
});

// GET a single gift by ID
router.get('/:id', async (req, res, next) => {
    logger.info(`GET /api/gifts/${req.params.id} called`);
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');

        const idParam = req.params.id;
        const id = isNaN(idParam) ? idParam : Number(idParam);

        const gift = await collection.findOne({ id: id });
        if (!gift) {
            logger.warn(`Gift with ID ${id} not found`);
            return res.status(404).send('Gift not found');
        }

        res.json(gift);
    } catch (e) {
        logger.error(`Error fetching gift with ID ${req.params.id}`, e);
        next(e);
    }
});

// POST a new gift
router.post('/', async (req, res, next) => {
    logger.info('POST /api/gifts called');
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');

        const result = await collection.insertOne(req.body);
        const newGift = await collection.findOne({ _id: result.insertedId });

        res.status(201).json(newGift);
    } catch (e) {
        logger.error('Error adding new gift', e);
        next(e);
    }
});

module.exports = router;
