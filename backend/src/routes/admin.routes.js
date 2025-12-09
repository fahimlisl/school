import { Router } from "express";
import {
  changePassword,
  fetchAllStudents,
  fetchAllTeacher,
  loginAdmin,
  logOutAdmin,
  registerAdmin,
  removeStudent,
  updateFeeStatus,
  updateStudent,
  updateTeacher,
} from "../controllers/admin.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { registerStudent } from "../controllers/student.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { registerTeacher } from "../controllers/teacher.controllers.js";
import { feeRegister, fetchFee, updateFeeStructure } from "../controllers/fee.controllers.js";
import { fetchOnlineStudent } from "../controllers/onlineRegistration.controllers.js";

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
router.route("/updateStudentFee/:id").patch(verifyJWT,updateFeeStatus)

// teacher
router.route("/createTeacher").post(verifyJWT,registerTeacher)
router.route("/updateTeacher/:id").patch(verifyJWT,updateTeacher)
// router.route("/fetchAllTeachers/:subject").get(verifyJWT,fetchAllStudents)
router.route("/fetchAllTeachers").get(verifyJWT,fetchAllTeacher)

// fees section
router.route("/fetchFee").get(verifyJWT,fetchFee)
router.route("/registerFee").post(verifyJWT,feeRegister)
router.route("/updateFee/:id").patch(verifyJWT,updateFeeStructure)
// online studnet 
router.route("/fetchOnlineStudent").get(verifyJWT,fetchOnlineStudent)
export default router;
