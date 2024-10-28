import express from "express"
import {login, signup,logout, allUsers} from '../controller/user.controller.js'
import cookieParser from "cookie-parser"
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();

//middleware to parse cookies
router.use(cookieParser());

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.get("/allusers",secureRoute,allUsers)





export default router;