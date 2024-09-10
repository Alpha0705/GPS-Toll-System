import express from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js"

dotenv.config();  //needed from connection with db,if not the db connection fails


const app = express();
const PORT = process.env.PORT || 9000;

//for testing purposes only
app.get("/", (req,res) => {
    res.send("Hello World!");
});
app.use(express.json()); //allows us to parse incoming requets:req.body 
app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log("Sever is running on port:", PORT);
});

//lsA1L0WEg8kEUKsW