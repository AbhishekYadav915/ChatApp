import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    ConfirmPassword:{
        type:String,
        // required:true  
    }
},{timestamps:true}) //createdAt & updatedAt


const User = mongoose.model("User",userSchema)
export default User;