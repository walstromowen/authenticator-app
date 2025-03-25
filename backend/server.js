import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import authRouter from './routes/authRoutes.js';

dotenv.config();

mongoose.connect(process.env.ATLAS_URI).then(()=>{
    console.log('Successful connection to MongoDB database.')
}).catch((err)=>{
    console.log(err)
})

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))
app.use("/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server listening on port: ${PORT}`)
});
