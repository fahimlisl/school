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

// const uploadOnCloudinary = async(localFilePath) => {
//     try {
//         if (!localFilePath) {
//             throw new ApiError(401,"no there no localFilePath found in line 13 of cloudinary.js")
//         }
//         const uploadedOnCloud = await cloudinary.uploader.upload(localFilePath,{
//             resource_type:"auto"
//         })

//         console.log(`file has been uploaded in cloudianry ${uploadedOnCloud.url}`)

//         if (fs.existsSync(localFilePath)) {
//             fs.unlinkSync(localFilePath)
//         }
//         return uploadedOnCloud
        
//     } catch (error) {
//         if (localFilePath && fs.existsSync(localFilePath)) {
//             fs.unlinkSync(localFilePath)
//         }
//         console.log(`got error while uploading file to cloudinary ${error}`)
//     }
// }


export const uploadOnCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "students" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
};


const deleteFromCloudinary = async(filePath) => {
    try {
        if (!filePath) {
            throw new ApiError(400,"file wasn't able to found")
        }
        const deleteFCloud = await cloudinary.uploader.destroy(filePath,{
            resource_type:"image"
        })
        if (!deleteFCloud) {
            throw new ApiError(500,"wasn't abel to delete that particular file form cloud")
        }
        return deleteFCloud
    } catch (error) {
        throw new ApiError(500,error.message || `got error while deleting file from cloudinary`)
    }
}

export {uploadOnCloudinary,deleteFromCloudinary}