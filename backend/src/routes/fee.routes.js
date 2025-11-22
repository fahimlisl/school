import { Router } from "express";
import { feeRegister } from "../controllers/fee.controllers.js";

const router = Router();

router.route("/registration").post(feeRegister)

export default router