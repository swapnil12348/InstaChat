import mongoose from "mongoose";
import console from "console";

const connectDB = async ()=>{
    mongoose.connection.on('connected', async ()=> console.log("mongoDB is connected"));

    if (!process.env.MONGODB_URI) throw new Error("Mongodb uri is not defined")
        await mongoose.connect(process.env.MONGODB_URI);

}

export default connectDB