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
  <div className="space-y-6">

    {/* HEADER */}
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
      <h1 className="text-2xl md:text-3xl font-bold">
        👩‍🏫 Teacher Profile
      </h1>
      <p className="opacity-90 text-sm">
        Manage your personal information
      </p>
    </div>

    {/* PROFILE CARD */}
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-6">

      <div className="flex flex-col md:flex-row items-center gap-6">

        {/* IMAGE */}
        <div className="relative group">
          <img
            src={
              teacherData?.photo ||
              'https://png.pngtree.com/png-vector/20230729/ourmid/pngtree-picture-of-a-teacher-vector-png-image_7009012.png'
            }
            alt="Teacher"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md group-hover:scale-105 transition"
          />
          <span className="absolute bottom-2 right-2 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
        </div>

        {/* INFO */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">
            {teacherData?.first_name} {teacherData?.last_name}
          </h2>

          <p className="text-gray-500 mt-1">
            {teacherData?.department_name}
          </p>

          <button
            onClick={openModal}
            className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition shadow"
          >
            <FaUserEdit />
            Edit Profile
          </button>
        </div>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

        <div className="bg-slate-50 p-4 rounded-xl hover:bg-blue-50 transition">
          <div className="flex items-center gap-3 text-blue-500 text-sm mb-1">
            <FaIdBadge />
            Teacher Code
          </div>
          <p className="font-semibold text-gray-800">
            {teacherData?.teacher_code}
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl hover:bg-blue-50 transition">
          <div className="flex items-center gap-3 text-blue-500 text-sm mb-1">
            <FaBuilding />
            Department
          </div>
          <p className="font-semibold text-gray-800">
            {teacherData?.department_name}
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl hover:bg-blue-50 transition">
          <div className="flex items-center gap-3 text-blue-500 text-sm mb-1">
            <FaPhone />
            Contact
          </div>
          <p className="font-semibold text-gray-800">
            {teacherData?.contact}
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl hover:bg-blue-50 transition">
          <div className="flex items-center gap-3 text-blue-500 text-sm mb-1">
            <FaEnvelope />
            Email
          </div>
          <p className="font-semibold text-gray-800">
            {teacherData?.email}
          </p>
        </div>

      </div>
    </div>

    {/* MODAL */}
    {isModalOpen && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl p-4 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">
              Edit Profile
            </h3>
            <button onClick={closeModal}>
              <FaTimes className="text-white hover:text-gray-200" />
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">

            {[
              { label: "Teacher Code", name: "teacher_code" },
              { label: "First Name", name: "first_name" },
              { label: "Last Name", name: "last_name" },
              { label: "Contact", name: "contact" },
              { label: "Photo URL", name: "photo" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm text-gray-600 mb-1">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  required={field.name !== "photo"}
                />
              </div>
            ))}

            {/* ACTIONS */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 px-4 py-2 bg-slate-200 text-gray-700 rounded-lg hover:bg-slate-300 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isUpdating}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:scale-105 transition disabled:opacity-50"
              >
                {isUpdating ? "Updating..." : "Update"}
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