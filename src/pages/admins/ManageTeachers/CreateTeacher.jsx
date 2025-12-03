import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useDepartment from '../../../hooks/useDepartment';
import toast from 'react-hot-toast';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateTeacher = () => {
    const axiosSecure = useAxiosSecure();
    const [departments] = useDepartment();
    const [, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [showEmailForm, setShowEmailForm] = useState(false);
    
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;
    
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    
    // Get user data on component mount or when email is submitted
    const fetchUserData = async (emailToFetch) => {
        setLoading(true);
        
        try {
            const response = await axiosSecure.get(`/Auth/getuser/${emailToFetch}`);
            if (response.data.success) {
                const user = response.data.data;
                setUserData(user);
                
                // Set form values
                setValue('user_id', user.id);
                setValue('teacher_code', emailToFetch.split('@')[0]);
                
                // Split full name into first and last name
                const nameParts = user.fullName.split(' ');
                setValue('first_name', nameParts[0] || '');
                setValue('last_name', nameParts.slice(1).join(' ') || '');
                
                setShowEmailForm(false);
                toast.success('User data loaded successfully');
            } else {
                toast.error(response.data.message || 'Failed to fetch user data');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred while fetching user data';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    
    // Handle email form submission
    const handleEmailSubmit = (e) => {
        e.preventDefault();
        if (!emailInput) {
            toast.error('Please enter an email address');
            return;
        }
        
        // Basic email validation
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(emailInput)) {
            toast.error('Please enter a valid email address');
            return;
        }
        
        fetchUserData(emailInput);
    };
    
    // Get user data on component mount if email is in state
    useEffect(() => {
        if (email) {
            fetchUserData(email);
        } else {
            setShowEmailForm(true);
            setLoading(false);
        }
    }, [email]);
    
    // Handle image upload
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        setImageUploading(true);
        
        try {
            const formData = new FormData();
            formData.append('image', file);
            
            const response = await fetch(image_hosting_api, {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                setUploadedImageUrl(result.data.url);
                setValue('photo', result.data.url);
                toast.success('Image uploaded successfully');
            } else {
                toast.error('Failed to upload image');
            }
        } catch {
            toast.error('An error occurred during image upload');
        } finally {
            setImageUploading(false);
        }
    };
    
    // Handle form submission
    const onSubmit = async (data) => {
        try {
            const response = await axiosSecure.post("/Teachers/add-teacher", data);
            
            if (response.data.success) {
                toast.success('Teacher added successfully');
                navigate('/admin-dashboard');
            } else {
                toast.error(response.data.message || 'Failed to add teacher');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred while adding teacher';
            toast.error(errorMessage);
        }
    };
    
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-600 border-t-transparent"></div>
                    <p className="mt-2 text-gray-600">Loading user data...</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Teacher Profile</h2>
                
                {/* Email input form for direct access */}
                {showEmailForm && (
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Enter Teacher Email</h3>
                        <form onSubmit={handleEmailSubmit} className="flex gap-2">
                            <input
                                type="email"
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter teacher email address"
                                required
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                            >
                                Load Data
                            </button>
                        </form>
                        <p className="text-sm text-gray-600 mt-2">Enter the email of an already registered teacher to create their profile.</p>
                    </div>
                )}
                
                {/* Teacher creation form */}
                {!showEmailForm && (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Hidden user_id field */}
                    <input type="hidden" {...register('user_id')} />
                    
                    {/* Teacher Code (auto-generated from email) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Teacher Code
                        </label>
                        <input
                            type="text"
                            {...register('teacher_code', { required: 'Teacher code is required' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                            readOnly
                        />
                        {errors.teacher_code && (
                            <p className="text-red-500 text-xs mt-1">{errors.teacher_code.message}</p>
                        )}
                    </div>
                    
                    {/* First Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            {...register('first_name', { required: 'First name is required' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter first name"
                        />
                        {errors.first_name && (
                            <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>
                        )}
                    </div>
                    
                    {/* Last Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            {...register('last_name', { required: 'Last name is required' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter last name"
                        />
                        {errors.last_name && (
                            <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>
                        )}
                    </div>
                    
                    {/* Department Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Department
                        </label>
                        <select
                            {...register('department_id', { required: 'Department is required' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select a department</option>
                            {departments && departments.map((dept) => (
                                <option key={dept.department_id} value={dept.department_id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                        {errors.department_id && (
                            <p className="text-red-500 text-xs mt-1">{errors.department_id.message}</p>
                        )}
                    </div>
                    
                    {/* Contact */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contact Number
                        </label>
                        <input
                            type="text"
                            {...register('contact', {
                                required: 'Contact number is required',
                                minLength: {
                                    value: 11,
                                    message: 'Contact number must be exactly 11 characters'
                                },
                                maxLength: {
                                    value: 11,
                                    message: 'Contact number must be exactly 11 characters'
                                },
                                pattern: {
                                    value: /^[0-9]{11}$/,
                                    message: 'Contact number must be exactly 11 digits'
                                }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter 11-digit contact number"
                            maxLength={11}
                        />
                        {errors.contact && (
                            <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>
                        )}
                    </div>
                    
                    {/* Photo Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Photo
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {imageUploading && (
                            <p className="text-blue-600 text-xs mt-1">Uploading image...</p>
                        )}
                        {uploadedImageUrl && (
                            <div className="mt-2">
                                <img src={uploadedImageUrl} alt="Teacher" className="h-20 w-20 object-cover rounded" />
                            </div>
                        )}
                        <input type="hidden" {...register('photo')} />
                    </div>
                    
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
                    >
                        Create Teacher Profile
                    </button>
                    
                    {/* Back to Email Search Button */}
                    <button
                        type="button"
                        onClick={() => {
                            setShowEmailForm(true);
                            setEmailInput('');
                        }}
                        className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200 font-medium"
                    >
                        Search for Different Teacher
                    </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CreateTeacher;