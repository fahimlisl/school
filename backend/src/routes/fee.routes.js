import { Router } from "express";
import { feeRegister } from "../controllers/fee.controllers.js";
import {verifyJWT} from "../middlewares/auth.middlewares.js"


const router = Router();

router.route("/registration").post(verifyJWT,feeRegister)

export default router