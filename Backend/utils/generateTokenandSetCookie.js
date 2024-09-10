import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateTokenandSetCookie = (res, userId) => {
    if (!process.env.SECRET_KEY) {
        throw new Error('SECRET_KEY is not defined');
    }

    const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
        expiresIn: '5d',
    });

    res.cookie('token', token, {
        httpOnly: true, // prevents XSS attacks
        secure: process.env.NODE_ENV === 'production', // only use cookies over HTTPS in production
        sameSite: 'strict', // prevents CSRF attacks
        maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
    });

    return token;
};
