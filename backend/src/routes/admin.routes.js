import { Router } from "express";
import {
  changePassword,
  fetchAllStudents,
  loginAdmin,
  logOutAdmin,
  registerAdmin,
  removeStudent,
  updateStudent,
  updateTeacher,
} from "../controllers/admin.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { registerStudent } from "../controllers/student.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { registerTeacher } from "../controllers/teacher.controllers.js";

const router = Router();

router.route("/registration").post(registerAdmin);
router.route("/login").post(loginAdmin);

router.route("/logout").post(verifyJWT, logOutAdmin);

router.route("/changepassword").post(verifyJWT, changePassword);
router
  .route("/createStudent")
  .post(verifyJWT, upload.single("profilePhoto"), registerStudent);
router.route("/fetchAllStudents/:id").get(verifyJWT, fetchAllStudents);
router.route("/removeStudent/:id").delete(verifyJWT, removeStudent);
router.route("/updateStudent/:id").patch(verifyJWT,updateStudent)

// teacher
router.route("/createTeacher").post(verifyJWT,registerTeacher)
router.route("/updateTeacher/:id").patch(verifyJWT,updateTeacher)

export default router;
