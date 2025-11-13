const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');
const bcrypt = require('bcrypt'); // for password hashing
const jwt = require('jsonwebtoken'); // for authentication tokens

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

// REGISTER a new user
router.post('/register', async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const db = await connectToDatabase();
        const collection = db.collection('users');

        // Check if user already exists
        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const result = await collection.insertOne({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            createdAt: new Date()
        });

        const newUser = await collection.findOne({ _id: result.insertedId });

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

// LOGIN user
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const db = await connectToDatabase();
        const collection = db.collection('users');

        // Find the user by email
        const user = await collection.findOne({ email }); // <-- Task 11: findOne
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

        // Generate token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token, user });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
