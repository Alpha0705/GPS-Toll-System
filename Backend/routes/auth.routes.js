//here in this file we have created routes i.e when you move from one page to another for example form signup to login,etc after login to homepage 
//we have created routes for that,the changes can be seen in the url
//we are calling the function from the auth.controller.js file to make the routes easy to unders.post
import express from "express";
import { login, logout, signup, verifyemail,forgotpassword,resetPassword,checkAuth } from "../controllers/auth.controllers.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth",verifyToken,checkAuth); //used while refreshing the page

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verifyemail",verifyemail);
router.post("/forgot-password",forgotpassword);
router.post("/reset-password/:token",resetPassword);

export default router;