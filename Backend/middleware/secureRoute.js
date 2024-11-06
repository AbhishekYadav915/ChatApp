import jwt  from "jsonwebtoken";
import User from "../models/user.model.js";

const secureRoute = async (req,res,next) =>{
    try{
      const token = req.cookies.jwt;
      if(!token){
        return res.status(401).json({error: "No token, authorization denied"});
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      if(!decoded){
        return res.status(401).json({error: "Invalid Token"})
      }
      const user = await User.findById(decoded.userId).select("-password");  //current logged-in user
      if(!user){
        return res.status(401).json({error: "No user found"});
      }
      req.user =user;
      next();
    }
    catch(error){
        console.log("Error in secureRoute: ", error)
        return res.status(500).json({ error: "Internal Server error" });
    }
}
export default secureRoute; 
