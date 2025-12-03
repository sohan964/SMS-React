import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');


    const { signIn, setToken, user } = useContext(AuthContext);
    const navigate = useNavigate();
    
        useEffect(() => {
                if (user?.role && user.role[0] === 'Admin') {
                    navigate('/admin-dashboard');
                }
            }, [user, navigate]);

    // password validation rules:
    // - at least 8 characters
    // - at least one uppercase letter
    // - at least one number
    // - at least one special character
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    const validateForm = () => {
        if (!email) {
            setError('Email is required.');
            return false;
        }
        if (!password) {
            setError('Password is required.');
            return false;
        }
        if (!passwordRegex.test(password)) {
            setError(
                'Password must be at least 8 characters, include an uppercase letter, a number, and a special character.'
            );
            return false;
        }
        setError('');
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log({email, password})
        if (!validateForm()) {
            console.log("validation failed");
        }
        try{
            const res = await signIn({email, password});
            //console.log("login response:", res?.data?.token );
            if(res?.success == true){
                localStorage.setItem('access-token', res?.data.token);
                setToken(res.data.token);
                toast.success('Login successful!');
                navigate('/admin-dashboard');
            }
        }catch(error){
            console.log("login error:", error);
        }

    };

    return (
        <div className="flex min-h-[70vh] items-center justify-center p-6">
            <div className="card w-full max-w-md bg-base-100 shadow-md">
                <div className="card-body">
                    <h2 className="card-title text-2xl">Admin Login</h2>

                    {error && (
                        <div className="alert alert-error py-2 px-3 text-sm">
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@example.com"
                                aria-label="Email"
                                className="input input-bordered w-full"
                                required
                            />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Your secure password"
                                    aria-label="Password"
                                    className="input input-bordered w-full pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    className="btn btn-ghost btn-sm absolute right-1 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            
                        </div>

                        {/* Submit */}
                        <div className="form-control mt-4">
                            <button
                                type="submit"
                                className={`btn btn-primary`}
                                
                            >
                               Login
                            </button>
                        </div>
                    </form>

                    {/* Optional links */}
                    <div className="divider my-2"></div>
                    <div className="text-sm text-center">
                        <button
                            type="button"
                            onClick={() =>
                                setError(
                                    'If you forgot your admin credentials, please contact the system administrator.'
                                )
                            }
                            className="link"
                        >
                            Forgot password?
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;