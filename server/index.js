import express from 'express'
import mongoose from "mongoose";
import router from "./routes/index.js";
import ErrorHandler from "./middlewares/ErrorHandlerMiddleware.js";
import dotenv from "dotenv";
import cors from 'cors'
const app = express()
dotenv.config()
const PORT = process.env.PORT | 5000
const url = 'mongodb+srv://suetah:7lgy6vgkOnP0N0eQ@cluster0.nj0zclh.mongodb.net/?retryWrites=true&w=majority'
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(ErrorHandler)

const serverStart = async () => {
    try {
        await mongoose.connect(url)
        app.listen(PORT, ()=>console.log('server started on PORT'+PORT))
    } catch (e) {
        console.log(e.message)
    }
}
serverStart()
