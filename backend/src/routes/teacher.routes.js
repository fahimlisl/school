import { Router } from "express";
import { assignMarksToStudent, loginTeacher, logOutTeacher } from "../controllers/teacher.controllers.js";
import { verifyJWTTeacher } from "../middlewares/teacherAuth.middlewares.js";

const router = Router()


router.route("/login").post(loginTeacher)
router.route("/logout").post(verifyJWTTeacher,logOutTeacher)
router.route("/updateMarksheet/:id").post(verifyJWTTeacher,assignMarksToStudent)




export default router