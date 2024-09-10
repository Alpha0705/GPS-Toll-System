//here in this file we have created routes i.e when you move from one page to another for example form signup to login,etc after login to homepage 
//we have created routes for that,the changes can be seen in the url
//we are calling the function from the auth.controller.js file to make the routes easy to unders.post
import express from "express";
import { login, logout, signup, verifyemail } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verifyemail",verifyemail);

export default router;