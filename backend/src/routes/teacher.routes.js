import { Router } from "express";
import { loginTeacher } from "../controllers/teacher.controllers.js";

const router = Router()


router.route("/login").post(loginTeacher)




export default router