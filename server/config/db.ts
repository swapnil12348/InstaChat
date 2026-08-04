import mongoose from "mongoose";

const connectDB = async ()=>{
    mongoose.connection.on('connected', async ()=> console.log("mongoDb connected"));
    if (!process.env.MONDODB_URI) throw new Error("Mongodb uri is not defined")


}