import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))


// middleware
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes
import onlineRegsitrationRouter from "./routes/onlineRegistration.routes.js"
import adminRouter from "./routes/admin.routes.js"
import studentRouter from "./routes/student.routes.js"
import feeRouter from "./routes/fee.routes.js"
// route declaration
app.use('/api/v1/admissionStudent',onlineRegsitrationRouter)
app.use('/api/v1/admin',adminRouter)
app.use('/api/v1/student',studentRouter)
app.use('/api/v1/fee',feeRouter)

export {app}