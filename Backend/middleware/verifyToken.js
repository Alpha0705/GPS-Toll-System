import jwt from "jsonwebtoken";

export const verifyToken = (req, res ,next) =>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({success:false,message: "Unauthorised - no token provided"});
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if(!decoded) return res.status(401).json({success:false,message:"Unauthorised-invalid token"})
        req.userId = decoded.userId;
        next(); 
    } catch (error) {
        console.log("Error in verify Token",error);
        return res.status(500).json({success:false,message:"Server Error"});
        
    }
}