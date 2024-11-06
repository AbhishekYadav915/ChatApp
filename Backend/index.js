import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import {app , server} from "./SocketIO/server.js"
// const app = express();
dotenv.config();

//middleware 
app.use(express.json())
app.use(cookieParser());
app.use(cors())


const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI ;

try {
    mongoose.connect(URI);
    console.log("Connected to MongoDB")
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
}

// MongoDB connection with proper error handling
// mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });

//routes
app.use('/api/user',userRoute);
app.use('/api/message',messageRoute);


server.listen(PORT,()=>{
    console.log(`Server is working on port Number:${PORT}`);
});