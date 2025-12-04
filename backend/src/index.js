import { app } from "./app.js";
import dotenv from "dotenv"
import { connectDB } from "./db/index.js";

dotenv.config({
    path: './.env'
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 3040 , (req,res) => {
        console.log(`app is listening on port http://localhost:${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log(`error connecitng to run server ${err}`)
})