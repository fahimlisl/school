import {Router} from "express"
import { changePassword, fetchAllStudents, loginAdmin, logOutAdmin, registerAdmin } from "../controllers/admin.controllers.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js"
const router = Router()

router.route("/registration").post(registerAdmin)
router.route("/login").post(loginAdmin)
router.route("/logout").post(verifyJWT,logOutAdmin)
router.route("/changepassword").post(verifyJWT,changePassword)
router.route("/fetchAllStudents/:id").get(verifyJWT,fetchAllStudents)

export default router