// db.js
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;  // or use process.env.MONGO_URI if you prefer

let dbInstance = null;
const dbName = "giftdb";

async function connectToDatabase() {
    // Reuse the existing instance if already connected
    if (dbInstance) {
        return dbInstance;
    }

    // Create a new MongoClient
    const client = new MongoClient(url);

    try {
        // Task 1: Connect to MongoDB
        await client.connect();
        console.log("Connected successfully to MongoDB");

        // Task 2: Connect to database giftDB and store in variable dbInstance
        dbInstance = client.db(dbName);

        // Task 3: Return database instance
        return dbInstance;

    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        throw err;
    }
}

module.exports = connectToDatabase;
