import { Student } from "../models/student.models.js";
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js";

export const verifyJWTstudent = async (req,_,next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        if (!decodedToken) {
            throw new ApiError(401,"unauthorized access")
        }

        const user = await Student.findById(decodedToken._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401,"unauthorized access")
        }

        req.user = user
        // user.save({validateBeforeSave:false})

        next()

    } catch (error) {
        throw new ApiError(401,error.message || "internal server erro from line 23 of studentAuth")
    }
}

