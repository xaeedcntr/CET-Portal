import { catchasyncerror } from "../middlewares/catchasyncerror.js";
import { User } from "../models/user.js";
import Errorhandler from "../utils/errorhandler.js";
import { sendEmail } from "../utils/sendemail.js";
import { sendToken } from "../utils/sendtoken.js";
import crypto from "crypto";
import { Course } from "../models/course.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "cloudinary";
import Errorhandelr from "../utils/errorhandler.js";
import { Stats } from "../models/statsmodel.js";

export const signup = catchasyncerror(async (req, res, next) => {
  const { name, email, password } = req.body;
  const file = req.file;

  if (!name || !email || !password || !file) {
    return next(new Errorhandler("Please enter field details", 400));
  }

  let user = await User.findOne({ email });

  if (user) {
    return next(new Errorhandler("User Already Exist", 409));
  }

  const fileuri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileuri.content);

  //file upload on cloudniry

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  sendToken(res, user, "registered successfully", 201);
});

export const login = catchasyncerror(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Errorhandler("Please enter field details", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new Errorhandler("Incorrect email or password", 401));
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return next(new Errorhandler("Incorrect Email or Password", 401));
  }

  sendToken(res, user, `Welcom Back >> ${user.name}`, 200);
});

export const logout = catchasyncerror(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "logged out successfully",
    });
});

export const getmyprofile = catchasyncerror(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const changedpassword = catchasyncerror(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(new Errorhandler("Enter Passwords", 400));
  }

  const user = await User.findById(req.user._id).select("+password");

  const isMatch = await user.comparePassword(oldPassword);

  if (!isMatch) {
    return next(new Errorhandler("Old Password Incorrect", 400));
  }

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    user,
    message: "password changed successfully",
  });
});

export const updatedprofile = catchasyncerror(async (req, res, next) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user._id);

  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Changes Maded successfully",
  });
});

export const updatedprofilepic = catchasyncerror(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const file = req.file;

  const fileuri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileuri.content);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  user.avatar = {
    public_id: mycloud.public_id,
    url: mycloud.secure_url,
  };

  await user.save();
  res.status(200).json({
    success: true,

    message: "profile pic updated succefully",
  });
});

export const forgetedpassword = catchasyncerror(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new Errorhandler("User not exist", 400));
  }

  const resetToken = await user.getResettoken();

  await user.save();

  const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  const message = `click on the url to resent the password ${url}. if you have not requested than ignore`;

  //send token via email
  await sendEmail(user.email, "CET-Portal Reset password", message);

  res.status(200).json({
    success: true,
    message: `Reset token has been sent to ${user.email}`,
  });
});

export const resetingpassword = catchasyncerror(async (req, res, next) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTokenExpire: {
      $gt: Date.now(),
    },
  });
  if (!user) {
    return next(new Errorhandler("Token is invalid or expired"));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;

  await user.save();
  res.status(200).json({
    success: true,
    message: "password changed successfuly succefully",
  });
});

export const enrollmnent = catchasyncerror(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const course = await Course.findById(req.body.id);

  if (!course) {
    return next(new Errorhandler("Invalid course id ", 404));
  }

  const itemExist = user.enrollments.find((item) => {
    if (item.course.toString() === course._id.toString()) {
      return true;
    }
  });

  if (itemExist) {
    return next(new Errorhandler("ALready Enrolled in the course", 409));
  }


  user.enrollments.push({
    course: course._id,
    poster: course.poster.url, 
  });

  await user.save();

  res.status(200).json({
    success: true,
    message: "enrollment done succefully",
  });
});

export const unenroll = catchasyncerror(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const course = await Course.findById(req.query.id);

  if (!course) {
    return next(new Errorhandler("Invalid course id ", 404));
  }

  const newEnrollment = user.enrollments.filter((item) => {
    if (item.course.toString() !== course._id.toString()) {
      return item;
    }
  });

  user.enrollments = newEnrollment;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Enrollment canceled successfully",
  });
});
//admin controller
export const getallusers = catchasyncerror(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    users,
    message: "users fetched successfully",
  });
});
//update admin role
export const changerole = catchasyncerror(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new Errorhandelr("user not found", 404));
  }

  if (user.Role === "user") {
    user.Role = "admin";
  } else {
    user.Role = "user";
  }

  await user.save();

  res.status(200).json({
    success: true,

    message: "users role changed successfully",
  });
});

export const deleteuser = catchasyncerror(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new Errorhandelr("user not found", 404));
  }

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "users removed successfully",
  });
});

export const deleteme = catchasyncerror(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  await user.remove();
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "users removed successfully",
    });
});

User.watch().on("change", async () => {
  const stats = await Stats.find({})
    .sort({ createdAt: "desc" })
    .limit(1);

    const enrollment = await User.find({"enrollments.enrollmentstatus":"enrolled"});
    stats[0].users=await User.countDocuments();
    stats[0].enrollments=enrollment.length;
    stats[0].createdAt=new Date(Date.now());

    await stats[0].save();
});


