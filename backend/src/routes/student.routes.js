import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { getStudentProfile, loginStudent, logOutStudent, registerStudent } from "../controllers/student.controllers.js";
import { verifyJWTstudent } from "../middlewares/studentAuth.middlewares.js";

const router = Router();

router.route("/registration").post(
  upload.single("profilePhoto"), 
  registerStudent,
);
router.route("/login").post(loginStudent)
router.route("/logout").post(verifyJWTstudent,logOutStudent)
router.route("/getProfile/:id").get(verifyJWTstudent,getStudentProfile)

export default router;
