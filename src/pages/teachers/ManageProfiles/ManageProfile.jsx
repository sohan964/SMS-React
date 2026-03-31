import React, { useState } from 'react';
import useTeacherData from '../../../hooks/useTeacherData';
import { FaUserEdit, FaEnvelope, FaPhone, FaIdBadge, FaBuilding, FaTimes } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const ManageProfile = () => {
    const [teacherData, loading, refetch] = useTeacherData();
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        teacher_code: '',
        first_name: '',
        last_name: '',
        contact: '',
        photo: ''
    });
    const [isUpdating, setIsUpdating] = useState(false);

    const openModal = () => {
        setFormData({
            teacher_code: teacherData?.teacher_code || '',
            first_name: teacherData?.first_name || '',
            last_name: teacherData?.last_name || '',
            contact: teacherData?.contact || '',
            photo: teacherData?.photo || ''
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);

        try {
            await axiosSecure.put(`/Teachers/update-teacher/${teacherData?.teacher_id}`, formData);

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Profile updated successfully!',
                confirmButtonColor: '#3B82F6'
            });
            closeModal();
            refetch();
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update profile. Please try again.',
                confirmButtonColor: '#EF4444'
            });
        } finally {
            setIsUpdating(false);
        }
    };
    

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg mb-8">
                <h1 className="text-3xl font-bold">👩‍🏫 Teacher Profile</h1>
                <p className="opacity-90">Manage your personal information</p>
            </div>

            {/* PROFILE CARD */}
            <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition duration-300">

                <div className="flex flex-col md:flex-row items-center gap-6">

                    {/* IMAGE */}
                    <div className="relative group">
                        <img
                            src={
                                teacherData?.photo ||
                                'https://png.pngtree.com/png-vector/20230729/ourmid/pngtree-picture-of-a-teacher-vector-png-image_7009012.png'
                            }
                            alt="Teacher"
                            className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow-md group-hover:scale-105 transition"
                        />
                        <span className="absolute bottom-2 right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>
                    </div>

                    {/* INFO */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-gray-800">
                            {teacherData?.first_name} {teacherData?.last_name}
                        </h2>

                        <p className="text-gray-500 mt-1">
                            {teacherData?.department_name}
                        </p>

                        {/* ACTION BUTTON */}
                        <button onClick={openModal} className="mt-4 inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                            <FaUserEdit />
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* DETAILS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

                    <div className="bg-gray-50 p-4 rounded-xl hover:bg-blue-50 transition">
                        <div className="flex items-center gap-3 mb-1 text-blue-600">
                            <FaIdBadge />
                            <span className="text-sm">Teacher Code</span>
                        </div>
                        <p className="font-semibold text-gray-800">
                            {teacherData?.teacher_code}
                        </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl hover:bg-blue-50 transition">
                        <div className="flex items-center gap-3 mb-1 text-blue-600">
                            <FaBuilding />
                            <span className="text-sm">Department</span>
                        </div>
                        <p className="font-semibold text-gray-800">
                            {teacherData?.department_name}
                        </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl hover:bg-blue-50 transition">
                        <div className="flex items-center gap-3 mb-1 text-blue-600">
                            <FaPhone />
                            <span className="text-sm">Contact</span>
                        </div>
                        <p className="font-semibold text-gray-800">
                            {teacherData?.contact}
                        </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl hover:bg-blue-50 transition">
                        <div className="flex items-center gap-3 mb-1 text-blue-600">
                            <FaEnvelope />
                            <span className="text-sm">Email</span>
                        </div>
                        <p className="font-semibold text-gray-800">
                            {teacherData?.email}
                        </p>
                    </div>

                </div>
            </div>

            {/* EDIT PROFILE MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 transform transition-all">
                        {/* MODAL HEADER */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-2xl p-4 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white">Edit Profile</h3>
                            <button onClick={closeModal} className="text-white hover:text-gray-200 transition">
                                <FaTimes size={24} />
                            </button>
                        </div>

                        {/* MODAL BODY */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Teacher Code</label>
                                <input
                                    type="text"
                                    name="teacher_code"
                                    value={formData.teacher_code}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                                <input
                                    type="text"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                                <input
                                    type="text"
                                    name="photo"
                                    value={formData.photo}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    placeholder="https://example.com/photo.jpg"
                                />
                            </div>

                            {/* MODAL FOOTER */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isUpdating ? 'Updating...' : 'Update Profile'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProfile;