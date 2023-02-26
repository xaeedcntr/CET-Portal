import express from "express";
import { addCourselectures, createcourse, deletecourse, deletelectures, getAllCourses, getCourselectures } from "../controllers/courseController.js";
import { authorizeadmin, canseecourse, isAuthenticated } from "../middlewares/auth.js";
import singleupload from "../middlewares/multer.js";


const router=express.Router();

//get all courses without lectures
router.route("/courses").get(isAuthenticated, getAllCourses);
//create course only for admin 
router.route("/createcourses").post(isAuthenticated, authorizeadmin, singleupload, createcourse);


//add lectures, delete course, get course deatails
router.route("/course/:id").get(  isAuthenticated, canseecourse ,  getCourselectures).post(
  isAuthenticated, authorizeadmin, singleupload,  addCourselectures
).delete(isAuthenticated, authorizeadmin, deletecourse);

//delete lectures
router.route("/lectures").delete(isAuthenticated, authorizeadmin,deletelectures);

export default router;
