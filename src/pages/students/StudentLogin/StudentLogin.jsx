
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
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">

    {/* CARD */}
    <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">

      {/* HEADER */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Student Login
        </h2>
        <p className="text-sm text-gray-500">
          Access your student dashboard
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* EMAIL */}
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            placeholder="student@example.com"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email format',
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-sm text-gray-600">Password</label>

          <div className="relative mt-1">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-12 focus:ring-2 focus:ring-blue-500 outline-none transition"
              {...register('password', {
                required: 'Password is required',
              })}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500 transition"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:scale-[1.02] transition disabled:opacity-50"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

      </form>

      {/* FOOTER */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <button
          type="button"
          onClick={() =>
            toast.info('Please contact administration for password reset')
          }
          className="text-blue-600 hover:underline"
        >
          Forgot password?
        </button>
      </div>

    </div>
  </div>
);
};

export default StudentLogin;