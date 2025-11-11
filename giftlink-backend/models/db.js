// db.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

// Use environment variable or fallback to local MongoDB
let url = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017';
const dbName = 'giftdb';

let dbInstance = null;

async function connectToDatabase() {
    // Reuse existing instance if already connected
    if (dbInstance) {
        return dbInstance;
    }

    // Create a new MongoClient
    const client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    try {
        // Task 1: Connect to MongoDB
        await client.connect();
        console.log(`Connected successfully to MongoDB at ${url}`);

        // Task 2: Connect to database giftDB and store in variable dbInstance
        dbInstance = client.db(dbName);

        // Task 3: Return database instance
        return dbInstance;

    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        dbInstance = null;
        return null; // allow server to continue running
    }
}

module.exports = connectToDatabase;
