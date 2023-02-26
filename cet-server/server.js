import app from "./app.js";
import { connectDB } from "./config/database.js";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
mongoose.set('strictQuery', true);
import NodeCron from "node-cron";
import { Stats } from "./models/statsmodel.js";
import { User } from "./models/user.js";



connectDB();


cloudinary.v2.config({
    cloud_name: process.env.CLOUD_CLIENT_NAME,
    api_key:process.env.CLOUD_CLIENT_KEY,
    api_secret:process.env.CLOUD_CLIENT_SECRET,
});


NodeCron.schedule("0 0 0 1 * *",async ()=>{
    try{
        await Stats.create({});
    }catch(error){
        console.log(error)
    }
})


app.listen(process.env.PORT, ()=>{
    console.log(`server is running on : ${process.env.PORT}`)
});