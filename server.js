import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import User from './models/user.model.js';
import errorHandler from './utils/errorHandler.js';

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

app.post('/api/auth/signup', (req, res, next) => {
    const {username, email, password} = req.body;
    const paswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    
   try {
    // Backend Validation
    if(!username){        
        return next(errorHandler(400, 'username is required'));
    }
    if(username.length < 3){        
        return next(errorHandler(400, 'username must be at least 3 characters'));
    }
    if(!password){        
        return next(errorHandler(400, 'password is required'));
    }
    if(!paswordRegex.test(password)){        
        return next(errorHandler(400, "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters."));
    }
    if(!email){       
        return next(errorHandler(400, 'password is required'));        
    }

    // User
    // throw new Error("cannot sign up!");    
   } catch (error) {    
        next(error)
   }
})

app.post('/api/auth/signin', (req, res, next) => {
    try {
        const error = new Error("cannot sign in!");
        error.statusCode = 401;
        next(error);
    } catch (error) {
        next(error);
    }   
})


// Error handling middleware
app.use((err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let errorMessage = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        message: errorMessage,
        statusCode,
        stack: process.env.NODE_ENV === 'production'? null : err.stack
    })
})

const Port = 3050;
// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URL)
.then(() => {
    console.log('MongoDB Database connected...');
    app.listen(Port, () => {
        console.log(`Server is listening on http://localhost:${Port}`);
    })
})
.catch((error) => console.log(error))