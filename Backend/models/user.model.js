import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date
}, { timestamps: true });

// Profile schema
const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
    },
    email: { type: String, trim: true, lowercase: true },
    name: { type: String, trim: true },
    phone: { type: String, trim: true },
    profilePicture: { type: String, default: null },
    pid: { type: String, trim: true },
    bio: { type: String, default: '' },
    address: {
        country: { type: String, trim: true },
        city: { type: String, trim: true },
        pincode: { type: Number },
    },
    vehicles: [
        {
            vehicletype: { type: String, trim: true },
            ownername: { type: String, trim: true },
            company: { type: String, trim: true },
            regnum: { type: String, trim: true },
            model: { type: String, trim: true },
            vehicleNumber: { type: String, trim: true, required: true },
            _id: false,
        }
    ],
}, { timestamps: true });

const paymentschema = new mongoose.Schema({
    razorpay_order_id: {
      type: String,
      required: true,
    },
    razorpay_payment_id: {
      type: String,
      required: true,
    },
    razorpay_signature: {
      type: String,
      required: true,
    },
  
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  

// Export models
export const User = mongoose.model('User', userSchema);
export const Profile = mongoose.model('Profile', profileSchema);
export const Payment = mongoose.model("Payment", paymentschema);