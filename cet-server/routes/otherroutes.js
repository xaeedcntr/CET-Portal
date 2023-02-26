import express from  "express";
import { contact, courserequest, getstats } from "../controllers/othercontrollers.js";
import { authorizeadmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/contact").post(contact);


router.route("/request").post(courserequest);

router.route("/admin/stats").get(isAuthenticated,authorizeadmin,getstats)

export default router;