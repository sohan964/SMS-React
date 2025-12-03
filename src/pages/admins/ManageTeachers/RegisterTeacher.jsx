import React, { useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const RegisterTeacher = () => {
    const axiosPublic = useAxiosPublic();
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    
    // Watch password field for real-time validation
    const password = watch('password', '');
    
    // Password validation checks
    const passwordChecks = {
        minLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        hasNumber: /[0-9]/.test(password)
    };
    
    // Check if all password requirements are met
    const isPasswordValid = Object.values(passwordChecks).every(check => check === true);
    
    // Password validation function for form validation
    const validatePassword = () => {
        return isPasswordValid;
    };

    const onSubmit = async (data) => {
        try {
            const response = await axiosPublic.post("/Auth/signup", {
                fullName: data.fullName,
                email: data.email,
                password: data.password
            });

            if (response.data.success) {
                toast.success('Signup successful! Redirecting to admission form...');
                // Redirect to create teacher  page with email
                navigate('/admin-dashboard/create-teacher', { state: { email: data.email } });
            } else {
                toast.error(response.data.message || 'Registration failed');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred during registration';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register Teacher</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Full Name Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            {...register('fullName', {
                                required: 'Full name is required',
                                minLength: {
                                    value: 2,
                                    message: 'Full name must be at least 2 characters'
                                }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter full name"
                        />
                        {errors.fullName && (
                            <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter email address"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register('password', {
                                    required: 'Password is required',
                                    validate: validatePassword
                                })}
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password.type === 'validate'
                                    ? 'Password must be at least 8 characters with 1 uppercase, 1 special character, and 1 number'
                                    : errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Password Requirements with Real-time Validation */}
                    <div className="text-xs bg-gray-50 p-3 rounded">
                        <p className="font-medium mb-2 text-gray-700">Password requirements:</p>
                        <ul className="space-y-1">
                            <li className={`flex items-center ${passwordChecks.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                                {passwordChecks.minLength ? (
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1" fill="none" />
                                    </svg>
                                )}
                                At least 8 characters
                            </li>
                            <li className={`flex items-center ${passwordChecks.hasUpperCase ? 'text-green-600' : 'text-gray-500'}`}>
                                {passwordChecks.hasUpperCase ? (
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1" fill="none" />
                                    </svg>
                                )}
                                At least one uppercase letter
                            </li>
                            <li className={`flex items-center ${passwordChecks.hasSpecialChar ? 'text-green-600' : 'text-gray-500'}`}>
                                {passwordChecks.hasSpecialChar ? (
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                ) : ( 
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        {/* <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1" fill="none" /> */}
                                    </svg>
                                )}
                                At least one special character
                            </li>
                            <li className={`flex items-center ${passwordChecks.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                                {passwordChecks.hasNumber ? (
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1" fill="none" />
                                    </svg>
                                )}
                                At least one number
                            </li>
                        </ul>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
                    >
                        Register Teacher
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterTeacher;