import { asyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { Teacher } from "../models/teacher.models.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const registerTeacher = asyncHandler( async(req,res) => {
    
    const {fullName,email,phoneNumber,subject,password,classAssigned} = req.body

    if([fullName,email,phoneNumber,subject,password,classAssigned].some((f) => !f && f !== 0 )){
        throw new ApiError(401,"all fields are required")
    }

    const ifTeacher = await Teacher.findOne({
        $or:[
            {email},{phoneNumber}
        ]
    })

    if (ifTeacher) {
        throw new ApiError(400,"teacher already exists")
    }

    const teacher = await Teacher.create({
        fullName,
        email,
        phoneNumber,
        subject,
        password,
        classAssigned
    })

    if (!teacher) {
        throw new ApiError(500,"internal server error ,not able to create the teacher")
    }

    console.log(`teacher creted successfully`) // gotta delete this line after checkout


    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            teacher,
            "teacher creted successfully"
        )
    )


})

export {registerTeacher}