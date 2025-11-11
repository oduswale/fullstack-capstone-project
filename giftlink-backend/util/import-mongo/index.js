require('dotenv').config();
const { MongoClient } = require('mongodb');
const fs = require('fs');

// MongoDB connection URL (no auth needed for your current local setup)
const url = "mongodb://localhost:27017"; 
const dbName = 'giftdb';
const collectionName = 'gifts';
const filename = `${__dirname}/gifts.json`;

// Load gifts data
const data = JSON.parse(fs.readFileSync(filename, 'utf8')).docs;

// Connect to MongoDB and insert data
async function loadData() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const documents = await collection.find({}).toArray();

        if (documents.length === 0) {
            const insertResult = await collection.insertMany(data);
            console.log('Inserted documents:', insertResult.insertedCount);
        } else {
            console.log("Gifts already exist in DB");
        }
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

// Run the script
loadData();

module.exports = { loadData };
