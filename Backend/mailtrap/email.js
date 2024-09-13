import { VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js";
import { client, sender} from "./mailtrap.config.js";
import nodemailer from 'nodemailer';

import dotenv from "dotenv";

dotenv.config();

// Create a transporter using Gmail's service with credentials stored in environment variables
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Using Gmail as the email service
    auth: {
        user: process.env.EMAIL,  // The email address from environment variables
        pass: process.env.PASSWORD, // The password from environment variables
    },
});

export const sendVerificationEmail = async (email, verificationToken) => {
        let transpoter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            },
        })
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Verify you Email!",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        }

        await transpoter.sendMail(mailOptions, (error,info) => {
            if(error){
                return console.log(error);
            }
            console.log('email sent: '+ info.response)
        })
}

// Function to send a welcome email
export const sendWelcomeEmail = async (email, name) => {
    // Define the email options, including recipient, subject, and content
    const mailOptions = {
        from: process.env.EMAIL, // Sender email address
        to: email, // Recipient email address
        subject: "Welcome to GPS Toll System!", // Email subject
        html: `
            <h1>Welcome, ${name}!</h1> 
            <p>We're excited to have you at GPS Toll System.</p>
            <p>Company Info:</p>
            <ul>
                <li>Company: GPS Toll System</li>
                <li>Address: Sakec, Mumbai, 400058, India</li>
            </ul>
        `, // HTML content with dynamic data like the user's name
    };

    try {
        // Send the email using the transporter and await the result
        const info = await transporter.sendMail(mailOptions);
        console.log("Welcome Email Sent Successfully", info.response); // Log success message
    } catch (error) {
        // Log any error and throw an exception with a detailed message
        console.error(`Error sending welcome email:`, error);
        throw new Error(`Error sending welcome email: ${error.message}`);
    }
};

// Function to send a password reset email
export const sendPasswordResetEmail = async (email, resetURL) => {
    // Define the email options for the password reset email
    const mailOptions = {
        from: process.env.EMAIL, // Sender email address
        to: email, // Recipient email address
        subject: "Reset Your Password", // Email subject
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL), // Replace reset URL in the template
    };

    try {
        // Send the email and log the result
        const info = await transporter.sendMail(mailOptions);
        console.log("Password Reset Email Sent Successfully", info.response); // Log success message
    } catch (error) {
        // Log any error and throw an exception with a detailed message
        console.error(`Error sending password reset email:`, error);
        throw new Error(`Error sending password reset email: ${error.message}`);
    }
};

// Function to send a success email after password reset
export const sendResetSuccessEmail = async (email) => {
    // Define the email options for the reset success email
    const mailOptions = {
        from: process.env.EMAIL, // Sender email address
        to: email, // Recipient email address
        subject: "Password Reset Successful", // Email subject
        html: PASSWORD_RESET_SUCCESS_TEMPLATE, // HTML content from the success template
    };

    try {
        // Send the email and log the result
        const info = await transporter.sendMail(mailOptions);
        console.log("Password Reset Success Email Sent Successfully", info.response); // Log success message
    } catch (error) {
        // Log any error and throw an exception with a detailed message
        console.error(`Error sending password reset success email:`, error);
        throw new Error(`Error sending password reset success email: ${error.message}`);
    }
};