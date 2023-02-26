import { catchasyncerror } from "../middlewares/catchasyncerror.js"
import {Course } from "../models/course.js"
import getDataUri from "../utils/datauri.js";
import Errorhandelr from "../utils/errorhandler.js"
import cloudinary from "cloudinary"
import { Stats } from "../models/statsmodel.js";


export const getAllCourses =catchasyncerror( async (req,res,next)=>{

    const keyword = req.query.keyword || "";
    const category = req.query.category || "";


    const courses = await Course.find({
        title:{
           $regex:keyword,
           $options:"i",
        },category:{
            $regex:category,
            $options:"i",
        },
    }).select("-lectures");
    res.status(200).json({
        success: true,
        courses,
    });
});

export const createcourse =catchasyncerror( async (req,res,next)=>{

    const {title, description,  category , createdBy} =req.body;
    
    if(!title || !description || !category || !createdBy ) 
   { return next(new Errorhandelr("Please add All felids", 400));}

    const file=req.file;

    const fileuri= getDataUri(file);

    const mycloud = await cloudinary.v2.uploader.upload(fileuri.content);



    await Course.create({
        title,description,createdBy,category,
        poster:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url,
        },
    });

    res.status(201).json({
        success: true,
        message:"Course Created Successfully, you can add lectures now",
    });
});

export const getCourselectures =catchasyncerror( async (req,res,next)=>{

    const course = await Course.findById(req.params.id);


    if(!course)

    {
        return next(new Errorhandelr("Course not found", 404));
    }

    course.views+=1;

    await course.save();



    res.status(200).json({
        success: true,
        lectures:course.lectures,
    });
});
//max video size 80mb
export const addCourselectures =catchasyncerror( async (req,res,next)=>{

    const {id}= req.params;
    const {title,description}= req.body;
    const course = await Course.findById(id);
    if(!course)
    {
        return next(new Errorhandelr("Course not found", 404));
    }
    const file=req.file;
    const fileuri= getDataUri(file);

    const mycloud = await cloudinary.v2.uploader.upload(fileuri.content,{
        resource_type:"video",

    });

   course.lectures.push({
    title,
    description,
    video:{
        public_id:mycloud.public_id,
        url:mycloud.secure_url,
    }

   })
    course.numOfvideos=course.lectures.length;
    await course.save();

    res.status(200).json({
        success: true,
        message:"lectures added",
       
    });
});

export const deletecourse =catchasyncerror( async (req,res,next)=>{

    const { id } =req.params;
    
    const course = await Course.findById(id);


    if(!course)

    {
        return next(new Errorhandelr("Course not found", 404));
    }

    await cloudinary.v2.uploader.destroy(course.poster.public_id);


    for(let i = 0; i<course.lectures.length; i++)
    {
        const singlelecture = course.lectures[i];
        await cloudinary.v2.uploader.destroy(singlelecture.video.public_id,{
            resource_type:"video",
        });
    }

    await course.remove();

    


    res.status(200).json({
        success:true,
        message:"Course deleted successfully",
    })
});

export const deletelectures =catchasyncerror( async (req,res,next)=>{

    const { courseid,lctrid } =req.query;
    
    const course = await Course.findById(courseid);


    if(!course)

    {
        return next(new Errorhandelr("Course not found", 404));
    }

    const lecture = course.lectures.find(item=>{

        if(item._id.toString()===lctrid.toString())
        {
            return item;
        }

    })

    await cloudinary.v2.uploader.destroy(lecture.video.public_id,{
    resource_type:"video",
    });

    course.lectures=course.lectures.filter(item=>{

        if(item._id.toString()!==lctrid.toString())
        {
            return item;
        }

    })

    course.numOfvideos=course.lectures.length;

    await course.save();

    res.status(200).json({
        success: true,
        lectures:course.lectures,
    });
});

Course.watch().on("change", async()=>{

    const stats = await Stats.find({})
    .sort({createdAt:"desc"}).limit(1); 

    const courses = await Course.find({});

    var totalViews=0;
    for (let index = 0; index < courses.length; index++) {
        totalViews+= courses[index].views;
        
    }

    stats[0].views=totalViews;
    stats[0].createdAt=new Date(Date.now());

    await stats[0].save();



})



