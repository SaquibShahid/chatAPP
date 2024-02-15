import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./models/connect.js";

dotenv.config();
const PORT = process.env.PORT || 5000;  

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/' , (req,res)=>{
    res.send("hello world!");
})


app.listen(PORT ,()=>{
    connectToMongoDB();
    console.log(`server is listening on port ${PORT}`);
})