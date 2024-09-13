import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { generateTokenandSetCookie } from '../utils/generateTokenandSetCookie.js';
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from '../mailtrap/email.js';

export const signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        if (!email || !password || !name) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 16);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // expires token in 24 hours
        });

        await sendVerificationEmail(user.email, verificationToken);
        await user.save();

        generateTokenandSetCookie(res, user._id);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: { ...user._doc, password: undefined }
        });
    } catch (error) {
        console.error("Error in Signup:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const verifyemail = async (req, res) => {
    const { code } = req.body;

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);
        res.status(200).json({
            success: true,
            message: "Email verified successfully.",
            user: { ...user._doc, password: undefined }
        });
    } catch (error) {
        console.error("Error in VerifyEmail:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials." });
        }

        generateTokenandSetCookie(res, user._id);

        user.lastlogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: { ...user._doc, password: undefined }
        });
    } catch (error) {
        console.error("Error in Login:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in Logout:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const forgotpassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found." });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        res.status(200).json({ success: true, message: "Reset email sent" });
    } catch (error) {
        console.error("Error in Forgot Password:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired token." });
        }

        const hashedPassword = await bcrypt.hash(password, 16);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);
        res.status(200).json({ success: true, message: "Password reset successful" });
    } catch (error) {
        console.error("Error in Reset Password:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error in Check Auth:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
