import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./models/connect.js";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";


dotenv.config();
const PORT = process.env.PORT || 5000;  

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/user', userRoutes);

app.get('/' , (req,res)=>{
    res.send("hello world!");
})


app.listen(PORT ,()=>{
    connectToMongoDB();
    console.log(`server is listening on port ${PORT}`);
})