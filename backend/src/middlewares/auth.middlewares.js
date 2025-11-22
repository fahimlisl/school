import { Admin } from "../models/admin.models.js"
import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken"

export const verifyJWT = async(req,_,next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

        if (!token) {
            throw new ApiError(401,"unauthoried access")
        }

        const decodeToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        console.log(`this is the log of decodedToken ${decodeToken} and its type ${typeof decodeToken}`)
        const user = await Admin.findById(decodeToken?._id).select("-password -refreshToken")

        console.log("lets see what user logs in auth middleware ",user)
        if (!user) {
            throw new ApiError(500,"uswer wasn't foudn , or inavalid request")
        }
        req.user = user
        next()
   } catch (error) {
        throw new ApiError(401,error.message ||  "internal seerver error from line 21 auth file")
    }
}


