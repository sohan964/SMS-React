import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const StudentAdmission = () => {
    const axiosSecure = useAxiosSecure();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const emailFromState = location.state?.email;
    
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    // Fetch user data by email
    const fetchUserData = async (emailToFetch) => {
        if (!emailToFetch) {
            toast.error('Email is required');
            return;
        }

        setLoading(true);
        try {
            const response = await axiosSecure.get(`/Auth/getuser/${emailToFetch}`);
            if (response.data.success) {
                setUserData(response.data.data);
                // Set form values with user data
                setValue('user_id', response.data.data.id);
                const fullName = response.data.data.fullName;
                if (fullName) {
                    const nameParts = fullName.split(' ');
                    setValue('first_name', nameParts[0] || '');
                    setValue('last_name', nameParts.slice(1).join(' ') || '');
                }
                setEmailSubmitted(true);
            } else {
                toast.error(response.data.message || 'User not found');
            }
        } catch (error) {
            toast.error('Error fetching user data');
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Auto-fetch user data if email is in state
    useEffect(() => {
        if (emailFromState) {
            setEmailInput(emailFromState);
            fetchUserData(emailFromState);
        } else {
            setLoading(false);
        }
    },[emailFromState]);

    // Handle email form submission
    const handleEmailSubmit = (e) => {
        e.preventDefault();
        fetchUserData(emailInput);
    };

    // Handle image upload
    const handleImageUpload = async (file) => {
        if (!file) return null;
        
        setImageUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(image_hosting_api, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            
            if (data.success) {
                return data.data.url;
            } else {
                toast.error('Failed to upload image');
                return null;
            }
        } catch (error) {
            toast.error('Error uploading image');
            console.error('Image upload error:', error);
            return null;
        } finally {
            setImageUploading(false);
        }
    };

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            let photoUrl = '';
            
            // Upload image if provided
            if (data.photo && data.photo[0]) {
                photoUrl = await handleImageUpload(data.photo[0]);
                if (!photoUrl) return; // Stop if image upload failed
            }

            // Prepare admission data
            const admissionData = {
                user_id: data.user_id,
                first_name: data.first_name,
                last_name: data.last_name,
                dob: data.dob,
                gender: data.gender,
                photo: photoUrl,
                admission_year: parseInt(data.admission_year),
                address: data.address
            };

            const response = await axiosSecure.post("/Students/add-student", admissionData);
            
            if (response.data.success) {
                toast.success('Student added successfully!');
                // Redirect to student list or dashboard
                navigate('/admin-dashboard');
            } else {
                toast.error(response.data.message || 'Failed to add student');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred while adding student';
            toast.error(errorMessage);
            console.error('Student admission error:', error);
        }
    };

    // Show email input form if no user data is loaded
    if (!emailSubmitted && !userData) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Find Student</h2>
                    <p className="text-gray-600 text-center mb-6">
                        Enter the student's email to proceed with admission
                    </p>
                    
                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Student Email
                            </label>
                            <input
                                type="email"
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter student email"
                                required
                            />
                        </div>
                        
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium disabled:bg-blue-300"
                        >
                            {loading ? 'Searching...' : 'Find Student'}
                        </button>
                        
                        <div className="text-center mt-4">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => navigate('/admin-dashboard/student-register')}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Register Student
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-600 border-t-transparent"></div>
                    <p className="mt-2">Loading user data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Student Admission Form</h2>
                
                {userData && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-md">
                        <p className="text-sm text-blue-800">
                            <strong>Email:</strong> {userData.email}
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Hidden user_id field */}
                    <input
                        type="hidden"
                        {...register('user_id', { required: true })}
                    />

                    {/* First Name Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            {...register('first_name', {
                                required: 'First name is required',
                                minLength: {
                                    value: 2,
                                    message: 'First name must be at least 2 characters'
                                }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter first name"
                        />
                        {errors.first_name && (
                            <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>
                        )}
                    </div>

                    {/* Last Name Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            {...register('last_name', {
                                required: 'Last name is required',
                                minLength: {
                                    value: 2,
                                    message: 'Last name must be at least 2 characters'
                                }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter last name"
                        />
                        {errors.last_name && (
                            <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>
                        )}
                    </div>

                    {/* Date of Birth Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            {...register('dob', {
                                required: 'Date of birth is required'
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.dob && (
                            <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>
                        )}
                    </div>

                    {/* Gender Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Gender
                        </label>
                        <select
                            {...register('gender', {
                                required: 'Gender is required'
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                        </select>
                        {errors.gender && (
                            <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
                        )}
                    </div>

                    {/* Photo Upload Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Photo
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register('photo')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {imageUploading && (
                            <p className="text-blue-500 text-xs mt-1">Uploading image...</p>
                        )}
                    </div>

                    {/* Admission Year Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Admission Year
                        </label>
                        <input
                            type="number"
                            {...register('admission_year', {
                                required: 'Admission year is required',
                                min: {
                                    value: 2000,
                                    message: 'Admission year must be 2000 or later'
                                },
                                max: {
                                    value: 2030,
                                    message: 'Admission year must be 2030 or earlier'
                                }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter admission year (e.g., 2025)"
                        />
                        {errors.admission_year && (
                            <p className="text-red-500 text-xs mt-1">{errors.admission_year.message}</p>
                        )}
                    </div>

                    {/* Address Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                        </label>
                        <textarea
                            {...register('address', {
                                required: 'Address is required',
                                minLength: {
                                    value: 5,
                                    message: 'Address must be at least 5 characters'
                                }
                            })}
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter address"
                        ></textarea>
                        {errors.address && (
                            <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={imageUploading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium disabled:bg-blue-300"
                    >
                        {imageUploading ? 'Processing...' : 'Submit Admission'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentAdmission;