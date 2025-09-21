import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Api is running");
})

app.use('/api/user',userRoutes);

mongoose.connect(process.env.Mongo_URI)
.then(()=>{
    console.log("monogo db connected sucessfully");
})
.catch((err)=>{
    console.log("error connecting wiht db",err);
}); 

const PORT = 5000 || process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
});
