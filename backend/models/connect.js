import mongoose from 'mongoose';

const connectToMongoDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("connected to MongoDB");
    } catch (e) {
        console.log("error connecting to MongoDB"  + e.message);
    }
}

export default connectToMongoDB;