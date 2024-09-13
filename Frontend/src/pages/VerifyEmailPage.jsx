import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../Store/AuthStore';
import toast from 'react-hot-toast';
import { Loader } from 'lucide-react';

const VerifyEmailPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const { error, isLoading, verifyEmail } = useAuthStore();

    // Handle changes in each input field
    const handleChange = (index, value) => {
        if (/^\d?$/.test(value)) {  // Only allow numeric values
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // Automatically move to next input if a digit is entered
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    // Handle keyboard navigation (backspace, arrow keys)
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus(); // Move to previous input on empty backspace
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1].focus(); // Navigate left
        } else if (e.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1].focus(); // Navigate right
        }
    };

    // Handle paste event for the input fields
    const handlePaste = (e) => {
        e.preventDefault();
        const value = e.clipboardData.getData('text').trim();
        const pastedCode = value.slice(0, 6).split("");  // Take only the first 6 digits if the pasted string is longer
        const newCode = [...code];

        // Fill the input fields with the pasted value
        for (let i = 0; i < 6; i++) {
            newCode[i] = pastedCode[i] || "";
        }
        setCode(newCode);

        // Focus on the first empty input or keep focus on the last filled input
        const lastFilledIndex = newCode.findIndex((digit) => digit === "");
        const focusIndex = lastFilledIndex === -1 ? 5 : lastFilledIndex;
        inputRefs.current[focusIndex].focus();
    };

    // Handle form submission (e.g., email verification)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (code.every(digit => digit)) {
            // Submit the code for verification
            const codeString = code.join('');
            try {
                await verifyEmail(codeString); // Ensure verifyEmail is awaited
                navigate("/");
                toast.success("Email Verified Successfully.");
            } catch (err) {
                toast.error("Invalid Verification Code");
            }
        }
    };

    // Auto-submit when all fields are filled
    useEffect(() => {
        if (code.every(digit => digit)) {
            handleSubmit(new Event('submit'));  // Automatically trigger form submission
        }
    }, [code]);  // Watch for changes in the code state

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <motion.div
                className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden p-8'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className='mb-6 text-center'>
                    <h2 className='text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                        Verify Your Email
                    </h2>
                    <p className='text-gray-400'>Enter the verification code sent to your email.</p>
                </div>
                <form onSubmit={handleSubmit} className='flex justify-center'>
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            ref={(el) => (inputRefs.current[index] = el)}
                            className='w-12 h-12 mx-2 text-center text-2xl border border-gray-600 bg-gray-700 text-white rounded'
                            maxLength={1}
                        />
                    ))}
                    {isLoading && <Loader className='ml-4 animate-spin' />} {/* Only show Loader */}
                </form>
                <motion.button
                    className='w-full mt-4 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg 
                               hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 
                               disabled:opacity-50'
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading || code.some((digit) => !digit)}  // Disable if any digit is missing
                >
                    {isLoading ? <Loader className='animate-spin mx-auto'/> : "Verify Email"}
                </motion.button>
                {error && <p className='text-red-500 mt-4 text-center'>{error}</p>}
            </motion.div>
        </div>
    );
};

export default VerifyEmailPage;
