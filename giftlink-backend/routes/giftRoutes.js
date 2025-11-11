const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');

// GET all gifts
router.get('/', async (req, res) => {
    try {
        // Task 1: Connect to MongoDB and store connection to db constant
        const db = await connectToDatabase();

        // Task 2: Retrieve the gifts collection
        const collection = db.collection('gifts');

        // Task 3: Fetch all gifts
        const gifts = await collection.find().toArray();

        // Task 4: Return gifts as JSON
        res.json(gifts);

    } catch (e) {
        console.error('Error fetching gifts:', e);
        res.status(500).send('Error fetching gifts');
    }
});

// GET a single gift by ID
router.get('/:id', async (req, res) => {
    try {
        // Task 1: Connect to MongoDB
        const db = await connectToDatabase();

        // Task 2: Retrieve the gifts collection
        const collection = db.collection('gifts');

        // Get ID from params and handle numeric IDs automatically
        const idParam = req.params.id;
        const id = isNaN(idParam) ? idParam : Number(idParam);

        // Task 3: Find a specific gift by ID
        const gift = await collection.findOne({ id: id });

        if (!gift) {
            return res.status(404).send('Gift not found');
        }

        // Return the gift as JSON
        res.json(gift);

    } catch (e) {
        console.error('Error fetching gift:', e);
        res.status(500).send('Error fetching gift');
    }
});

// POST a new gift
router.post('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');

        // Insert the new gift
        const result = await collection.insertOne(req.body);

        // Fetch the inserted document to return
        const newGift = await collection.findOne({ _id: result.insertedId });

        res.status(201).json(newGift);

    } catch (e) {
        console.error('Error adding gift:', e);
        next(e);
    }
});

module.exports = router;
