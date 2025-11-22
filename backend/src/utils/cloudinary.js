import {v2 as cloudinary} from "cloudinary"
import { ApiError } from "./ApiError.js"
import fs from "fs"
import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async(localFilePath) => {
    try {
        if (!localFilePath) {
            throw new ApiError(401,"no there no localFilePath found in line 13 of cloudinary.js")
        }
        const uploadedOnCloud = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })

        console.log(`file has been uploaded in cloudianry ${uploadedOnCloud.url}`)

        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath)
        }
        return uploadedOnCloud
        
    } catch (error) {
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath)
        }
        console.log(`got error while uploading file to cloudinary ${error}`)
    }
}

export {uploadOnCloudinary}