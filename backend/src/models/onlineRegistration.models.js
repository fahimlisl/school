import mongoose,{Schema} from "mongoose";


const onlineRegistration = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        lowercase:true
    },
    phoneNumber:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    previousClass:{
        type:Number,
        required:true,
    },
    desiredClass:{
        type:Number,
        required:true,
    },
    fatherSName:{
        type:String,
        lowercase:true
    },
    motherSName:{
        type:String,
        lowercase:true
    },
    familyIncome:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    passportPhoto:{
        type:String,
        required:true
    },
    marksheetPhoto:{
        type:String,
        required:true
    }
},{timestamps:true})


export const OnlineStudent = mongoose.model("OnlineStudent",onlineRegistration)

