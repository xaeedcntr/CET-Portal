import jwt from "jsonwebtoken"
import { Course } from "../models/course.js";
import { User } from "../models/user.js";
import Errorhandelr from "../utils/errorhandler.js";
import { catchasyncerror } from "./catchasyncerror.js"

export const isAuthenticated = catchasyncerror(async (req,res,next)=>{

    const {token}=req.cookies;

    if(!token) 
   { return next(new Errorhandelr("Not Signed In ",401))
}

const decoded = jwt.verify(token,process.env.JWT_SECRET);

//Decoding user ID using findByid fuction which is mongoDB build in function
req.user = await User.findById(decoded._id);

next();

})

export const authorizeadmin = (req,res,next)=>{

    if(req.user.Role!=="admin")
    {
        return next(new Errorhandelr(`${req.user.Role} is not allowed to access the following resource`,403))
    }

    next();

};

export const canseecourse = catchasyncerror(async (req,res,next)=>{


    const user = await User.findById(req.user._id);

    const course= await Course.findById(req.params.id)

    if(!course){
        return next(new Errorhandelr("Invalid course id ", 404));
    }

    const itemExist = user.enrollments.find((item)=>{
        if(item.course.toString()===course._id.toString())
        {
            return true;
        }
    })

    if(!itemExist && user.Role!=="admin") {
    return next(new Errorhandelr("you dont have access to this course", 403));
    }
next();
 

})