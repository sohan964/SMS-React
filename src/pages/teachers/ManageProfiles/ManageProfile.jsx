import React, { useState } from "react";
import useTeacherData from "../../../hooks/useTeacherData";
import {
  FaUserEdit,
  FaEnvelope,
  FaPhone,
  FaIdBadge,
  FaBuilding,
  FaTimes,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageProfile = () => {
  const [teacherData, loading, refetch] = useTeacherData();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    teacher_code: "",
    first_name: "",
    last_name: "",
    contact: "",
    photo: "",
    description: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const openModal = () => {
    setFormData({
      teacher_code: teacherData?.teacher_code || "",
      first_name: teacherData?.first_name || "",
      last_name: teacherData?.last_name || "",
      contact: teacherData?.contact || "",
      photo: teacherData?.photo || "",
      description: teacherData?.description || "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      await axiosSecure.put(
        `/Teachers/update-teacher/${teacherData?.teacher_id}`,
        formData,
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile updated successfully!",
        confirmButtonColor: "#3B82F6",
      });
      closeModal();
      refetch();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update profile. Please try again.",
        confirmButtonColor: "#EF4444",
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
      {/* <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold">👩‍🏫 Teacher Profile</h1>
        <p className="opacity-90 text-sm">Manage your personal information</p>
      </div> */}

      {/* PROFILE CARD */}
      <div className="bg-white shadow-xl rounded-xl overflow-hidden grid md:grid-cols-3">
        {/* LEFT SIDE */}
        <div className="bg-gray-50 p-6 flex flex-col items-center text-center border-r">
          <img
            src={
              teacherData?.photo ||
              "https://png.pngtree.com/png-vector/20230729/ourmid/pngtree-picture-of-a-teacher-vector-png-image_7009012.png"
            }
            alt="Teacher"
            className="w-40 h-40 rounded-full border-4 border-gray-300 object-cover mb-4"
          />

          <h2 className="text-xl font-semibold text-gray-800">
            {teacherData?.first_name} {teacherData?.last_name}
          </h2>

          <p className="text-sm text-gray-600 mt-2 italic">
            {teacherData?.department_name}
          </p>

          <p className="text-sm text-gray-700 mt-2 font-medium">
            Assistant Professor
          </p>

          <p className="text-sm text-gray-600 mt-3">
            Teacher Code: {teacherData?.teacher_code}
          </p>

          <p className="text-sm text-gray-600 mt-1">
            Contact: {teacherData?.contact}
          </p>

          <p className="text-sm text-gray-600 mt-1">
            Email: {teacherData?.email}
          </p>

          {/* Edit Button */}
          <button
            onClick={openModal}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Edit Profile
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:col-span-2 p-8 text-gray-700 leading-relaxed space-y-5">
          <h3 className="text-xl font-semibold text-gray-800">
            Profile Description
          </h3>

          <p>{teacherData?.description || "No description available."}</p>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
            {/* HEADER */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl p-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Edit Profile</h3>
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
                { label: "Description", name: "description" },
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
