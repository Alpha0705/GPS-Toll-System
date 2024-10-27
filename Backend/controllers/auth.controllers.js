import { User, Profile,Payment } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { generateTokenandSetCookie } from '../utils/generateTokenandSetCookie.js';
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from '../mailtrap/email.js';
import { log } from 'console';

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

// Profile Controllers
export const getProfile = async (req, res) => {
    const { userId } = req.params;

    try {
        const profile = await Profile.findOne({ userId });
        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }

        res.status(200).json({ success: true, profile });
    } catch (error) {
        console.error("Error in Get Profile:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateProfile = async (req, res) => {
    const { userId } = req.params;
    const {
        email,
        name,
        phone,
        profilePicture,
        pid,
        bio,
        address,
        vehicles
    } = req.body;

    try {
        // Find the user in the User model
        const user = await User.findOne({userId});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the profile already exists for the user
        let profile = await Profile.findOne({ userId });

        if (!profile) {
            // If profile does not exist, create a new document
            profile = new Profile({
                userId: user._id,
                email,
                name,
                phone,
                profilePicture,
                pid,
                bio,
                address,
                vehicles: Array.isArray(vehicles) ? vehicles : [vehicles] // Ensure vehicles is an array
            });
            await profile.save();
            return res.status(201).json({ message: 'New profile created', profile });
        }

        // If profile exists, update general profile information
        if (email) profile.email = email;
        if (name) profile.name = name;
        if (phone) profile.phone = phone;
        if (profilePicture) profile.profilePicture = profilePicture;
        if (pid) profile.pid = pid;
        if (bio) profile.bio = bio;
        if (address) profile.address = { ...profile.address, ...address };

        // Handle vehicles - add or update as needed
        const vehiclesArray = Array.isArray(vehicles) ? vehicles : [vehicles];
        vehiclesArray.forEach((vehicle) => {
            const existingVehicleIndex = profile.vehicles.findIndex(
                (v) => v.vehicleNumber === vehicle.vehicleNumber
            );

            if (existingVehicleIndex !== -1) {
                // Update existing vehicle information
                profile.vehicles[existingVehicleIndex] = { ...profile.vehicles[existingVehicleIndex], ...vehicle };
            } else {
                // Add new vehicle
                profile.vehicles.push(vehicle);
            }
        });

        await profile.save();
        res.status(200).json({ message: 'Profile updated', profile });

    } catch (error) {
        if (error.code === 11000 && error.keyPattern?.userId) {
            // Handle duplicate key error specifically for userId
            return res.status(400).json({ message: 'A profile for this user already exists.' });
        }
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getVehicle = async (req, res) => {
    const { userId } = req.params;

    try {
        const vehicle = await Vehicle.find({ userId });
        if (!vehicle || vehicle.length === 0) {
            return res.status(404).json({ success: false, message: "Vehicle not found" });
        }

        res.status(200).json({ success: true, vehicle });
    } catch (error) {
        console.error("Error in Get Vehicle:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const deleteVehicle = async (req, res) => {
    const { userId, vehicleId } = req.params;

    try {
        const vehicle = await Vehicle.findOneAndDelete({ _id: vehicleId, userId });
        if (!vehicle) {
            return res.status(404).json({ success: false, message: "Vehicle not found" });
        }

        res.status(200).json({ success: true, message: "Vehicle deleted successfully" });
    } catch (error) {
        console.error("Error in Delete Vehicle:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
