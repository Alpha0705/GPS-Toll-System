import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    //userSchema created here
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },

    name:{
        type:String,
        required:true
    },
    lastlogin:{
        type:Date,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },

    resetPasswordToken: String,  //since we have only used type no need to enter the curly brackets
    resetPasswordExpiresAt: Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date,
},{timestamps:true});

export const User = mongoose.model('User', userSchema);
