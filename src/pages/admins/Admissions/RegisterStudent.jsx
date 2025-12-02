import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const RegisterStudent = () => {
    const axiosPublic = useAxiosPublic();

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    // Password validation function
    const validatePassword = (password) => {
        const minLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        
        return minLength && hasUpperCase && hasSpecialChar && hasNumber;
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
                // Redirect to student admission page with email
                navigate('/admin-dashboard/student-admission', { state: { email: data.email } });
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
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register Student</h2>
                
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
                        <input
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                validate: validatePassword
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter password"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password.type === 'validate'
                                    ? 'Password must be at least 8 characters with 1 uppercase, 1 special character, and 1 number'
                                    : errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Password Requirements */}
                    <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                        <p className="font-medium mb-1">Password requirements:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>At least 8 characters</li>
                            <li>At least one uppercase letter</li>
                            <li>At least one special character</li>
                            <li>At least one number</li>
                        </ul>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
                    >
                        Register Student
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterStudent;