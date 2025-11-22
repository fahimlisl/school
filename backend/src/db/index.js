import mongoose from "mongoose"
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)        
    console.log(`mongodb connection successful`)
    console.log(`its connection instance is ${connectionInstance}`)
    } catch (error) {
        console.log(`mongodb conneection error ${error}`);
        process.exit(1)
    }
}

export { connectDB }