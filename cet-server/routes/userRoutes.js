import express from "express";
import {
  changedpassword,
  changerole,
  deleteme,
  deleteuser,
  enrollmnent,
  forgetedpassword,
  getallusers,
  getmyprofile,
  login,
  logout,
  resetingpassword,
  signup,
  unenroll,
  updatedprofile,
  updatedprofilepic,
} from "../controllers/userController.js";
import { authorizeadmin, isAuthenticated } from "../middlewares/auth.js";
import singleupload from "../middlewares/multer.js";


const router = express.Router();

//to register a new user
router.route("/signup").post(singleupload, signup);

//login
router.route("/login").post(login);
//logout
router.route("/logout").get(logout);
//get my profile
router.route("/me").get(isAuthenticated, getmyprofile);
//delete my profile
router.route("/me").delete(isAuthenticated, deleteme);

//change password
router.route("/changepassword").put(isAuthenticated, changedpassword);
//updateprofile

router.route("/updateprofile").put(isAuthenticated, updatedprofile);
//updateprofilepica
router.route("/updateprofilepic").put(singleupload ,isAuthenticated, updatedprofilepic);

//forgetpassword
router.route("/forgetpassword").post(forgetedpassword);
//resetpassword
router.route("/resetpassword/:token").put(resetingpassword);

//enrollmnent
router.route("/enrollmnent").post(isAuthenticated,enrollmnent);
//unenroll
router.route("/unenroll").delete(isAuthenticated,unenroll);


//admin routes

router.route("/admin/users").get(isAuthenticated,authorizeadmin,getallusers);

router.route("/admin/user/:id")
.put(isAuthenticated,authorizeadmin,changerole)
.delete(isAuthenticated,authorizeadmin,deleteuser)

export default router;
