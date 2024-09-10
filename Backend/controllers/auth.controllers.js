//we have creaed this controller file to check of the files that control movement
//import { generateKey } from 'crypto';
import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { generateTokenandSetCookie } from '../utils/generateTokenandSetCookie.js';
import { sendVerificationEmail,sendWelcomeEmail } from '../mailtrap/email.js';



export const signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        if (!email || !password || !name) {
            throw new Error("All fields are required.");
        }

        const userAlreadyExists = await User.findOne({ email });
        //console.log("userAlreadyExists", userAlreadyExists);

        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User Already Exists." })
        }

        const hashedPassword = await bcryptjs.hash(password, 12);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({ email, password: hashedPassword, name, verificationToken, verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 }); //expires token 24 hours

        await sendVerificationEmail(user.email, verificationToken);

        await user.save();

        //jwt
        generateTokenandSetCookie(res, user._id)

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined,
            },

        })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const verifyemail = async (req, res) => {
    // UI seen like - - - - - - where after entering looks like this 1 2 3 4 5 6 
    const { code } = req.body;

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or Expired verification code" })
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);
        res.status(200).json({ success: true, message: "Email verified Successfully.", user: { ...user._doc, password: undefined, }, });

    } catch (error) {

    }
};

export const login = async (req, res) => {
    res.send("Login route.");
};

export const logout = async (req, res) => {
    res.send("Logout route.");
};
