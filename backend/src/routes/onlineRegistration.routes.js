import { Router } from "express";
import { studentRegistration } from "../controllers/onlineRegistration.controllers.js";
import {upload} from "../middlewares/multer.middlewares.js"
const router = Router()

router.route("/registration").post(upload.fields([
    {
        name:"passportPhoto",
        maxCount:1,
    },
    {
        name:"marksheetPhoto",
        maxCount:1
    }
]),studentRegistration)

export default router