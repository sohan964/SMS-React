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
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">

    {/* LOGIN CARD */}
    <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">

      {/* HEADER */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Admin Login
        </h2>
        <p className="text-sm text-gray-500">
          Access your dashboard securely
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-4 text-sm bg-red-100 text-red-600 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleLogin} className="space-y-4">

        {/* EMAIL */}
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            required
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-sm text-gray-600">Password</label>

          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your secure password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-16 focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-blue-600 hover:underline"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:scale-[1.02] transition"
        >
          Login
        </button>

      </form>

      {/* FOOTER */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <button
          onClick={() =>
            setError(
              "If you forgot your admin credentials, please contact the system administrator."
            )
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

export default AdminLogin;