import express from "express";
import dotenv, { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";


config({
    path:"./config/config.env",
})

const app =express();


app.use(express.json());
app.use(express.urlencoded({
   extended:true
}))
app.use(cookieParser());

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:["GET","POST","PUT","DELETE"],

}))



import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js"
import Errormiddleware from "./middlewares/error.js";
import others from "./routes/otherroutes.js"



app.use("/api/v1",course);
app.use("/api/v1",user);
app.use("/api/v1",others );




export default app;

app.use(Errormiddleware)