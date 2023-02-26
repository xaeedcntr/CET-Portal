import { catchasyncerror } from "../middlewares/catchasyncerror.js";
import Errorhandelr from "../utils/errorhandler.js";
import { sendEmail } from "../utils/sendemail.js";
import { Stats } from "../models/statsmodel.js";

export const contact = catchasyncerror(async (req, res, next) => {
  const { name, email, message } = req.body;

  if ((!name, !email, !message)) {
    return next(new Errorhandelr("Enter fields", 400));
  }

  const to = process.env.MY_EMAIL;

  const subject = "Message from user of CET-Portal";
  const text = `I am ${name} having email : ${email} \n ${message}`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "your message has been sent",
  });
});
export const courserequest = catchasyncerror(async (req, res, next) => {
  const { name, email, course } = req.body;

  if ((!name, !email, !course)) {
    return next(new Errorhandelr("Enter fields", 400));
  }

  const to = process.env.MY_EMAIL;

  const subject = "Course request from user of CET-Portal";
  const text = `I am ${name} having email : ${email} \n ${course}`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "your request has been sent",
  });
});
export const getstats = catchasyncerror(async (req, res, next) => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(12);

  const statsdata = [];

  for (let i = 0; i < stats.length; i++) {
    statsdata.unshift(stats[i]);
  }
  const requiredsize = 12 - stats.length;

  for (let i = 0; i < requiredsize; i++) {
    statsdata.unshift({
      users: 0,
      enrollments: 0,
      views: 0,
    });
  }

  const usercount = statsdata[11].users;
  const enrollmentscount = statsdata[11].enrollments;
  const viewscount = statsdata[11].views;

  let userpercent = 0,
    enrollmentpercent = 0,
    viewspercent = 0;

  let userpositive = true,
    enrollmentpositive = true,
    viewspositive = true;

  if (statsdata[10].users === 0) {
    userpercent = usercount * 100;
  }
  if (statsdata[10].views === 0) {
    viewspercent = viewscount * 100;
  }
  if (statsdata[10].enrollments === 0) {
    enrollmentpercent = enrollmentscount * 100;
  } else {
    const difference = {
      users: statsdata[11].users - statsdata[10].users,
      views: statsdata[11].views - statsdata[10].views,
      enrollments: statsdata[11].enrollments - statsdata[10].enrollments,
    };

    userpercent = (difference.users / statsdata[10].users) * 100;
    viewspercent = (difference.views / statsdata[10].views) * 100;
    enrollmentpercent =
      (difference.enrollments / statsdata[10].enrollments) * 100;

    if (userpercent < 0) {
      userpositive = false;
    }
    if (viewspercent < 0) {
      viewspositive = false;
    }
    if (userpercent < 0) {
      enrollmentpositive = false;
    }
  }

  res.status(200).json({
    success: true,
    stats: statsdata,
    usercount,
    enrollmentscount,
    viewscount,
    viewspercent,
    viewspositive,
    userpercent,
    userpositive,
    enrollmentpercent,
    enrollmentpositive,
  });
});
