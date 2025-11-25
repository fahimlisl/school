import jwt from "jsonwebtoken"
import { Teacher } from "../models/teacher.models.js"
import { ApiError } from "../utils/ApiError.js"

export const verifyJWTTeacher = async (req,_,next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        if (!decodedToken) {
            throw new ApiError(400,"unauthroized access")
        }
    
        const user = await Teacher.findById(decodedToken._id).select("-password -refreshToken")

        if(!user) {
            throw new ApiError(400,"unautorhized access")
        }
    
        req.user = user
        // user.save({validateBeforeSave:false})
        next()
    } catch (error) {
        throw new ApiError(401,error.message || "interal server error")
    }
}