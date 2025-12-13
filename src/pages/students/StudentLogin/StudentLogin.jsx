
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../providers/AuthProvider';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const StudentLogin = () => {
    const { signIn, user, setToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Redirect if user is already logged in as a student
    useEffect(() => {
        if (user?.role && user?.role[0] === 'Student') {
            navigate('/student-dashboard');
        }
    }, [user, navigate]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const result = await signIn(data);
            console.log('Login result:', result);
            if (result?.success) {
                localStorage.setItem('access-token', result?.data?.token);
                setToken(result?.data?.token);
                toast.success('Login successful!');
                
            } else {
                toast.error(result.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.response?.data?.message || 'An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-[70vh] items-center justify-center p-6">
            <div className="card w-full max-w-md bg-base-100 shadow-md">
                <div className="card-body">
                    <h2 className="card-title text-2xl justify-center">Student Login</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="student@example.com"
                                className="input input-bordered w-full"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'Invalid email format',
                                    },
                                })}
                            />
                            {errors.email && (
                                <label className="label">
                                    <span className="label-text-alt text-error">
                                        {errors.email.message}
                                    </span>
                                </label>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full pr-10"
                                    {...register('password', {
                                        required: 'Password is required',
                                    })}
                                />
                                <button
                                    type="button"
                                    className="btn btn-ghost btn-sm absolute right-1 top-1/2 -translate-y-1/2"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.password && (
                                <label className="label">
                                    <span className="label-text-alt text-error">
                                        {errors.password.message}
                                    </span>
                                </label>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </form>

                    {/* Optional Forgot Password Link */}
                    <div className="divider my-2"></div>
                    <div className="text-sm text-center">
                        <button
                            type="button"
                            className="link"
                            onClick={() => toast.info('Please contact administration for password reset')}
                        >
                            Forgot password?
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentLogin;