import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"

import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
const app = express();
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
    console.log(error)
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

app.listen(PORT,()=>{
    console.log(`Server is working on port Number:${PORT}`);
});