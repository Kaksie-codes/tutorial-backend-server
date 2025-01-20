import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

const app = express();

// This enables us to read the content of the .env file
dotenv.config();

// Middlewares
 // Enable CORS for all routes
app.use(cors());

// Use cookie-parser middleware to parse cookies
app.use(cookieParser());

//this middleware helps the backend receive json data from the frontend
app.use(express.json());

const Port = 3050;
// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URL)
.then(() => {
    console.log('MongoDB Database connected...');
    app.listen(Port, () => {
        console.log(`Server is listening on http://localhost:${Port}`);
    })
})