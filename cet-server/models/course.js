import mongoose from "mongoose";
const schema=new mongoose.Schema({

    title:{
        type:String,
        required:[true,"Please Enter title"],
        maxLength:[60,"Title cannot exceed 60 chracters"],
        minLength:[4,"Title must be at least 4 chracters"],
    },
    description:{
        type:String,
        required:[true,"Please Enter title"],
        minLength:[20,"Title must be at least 20 chracters"],
    },
    lectures:[
        {
            title:{
                type:String,
                required:true,
            },
            description:{
                type:String,
                required:true,
            },
            video:{
                public_id:{
                    type:String,
                    required:true,
                },
                url:{
                    type:String,
                    required:true,
                },
            },
    },],
    poster:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        },
    },

    views:{
        type:Number,
        default:0,
    },
    numOfvideos:{
        type:Number,
        default:0,
    },
    category:{
        type:String,
        required:true,
        
    },
    createdBy:{
        type:String,
        required:[true,"Enter Course creator name"],

    },
    createdAt:{
        type:Date,
        default:Date.now,

    },
});

export const Course = mongoose.model("Course",schema);