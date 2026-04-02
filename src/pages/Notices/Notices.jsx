import React, { useContext, useState } from "react";
import useNotice from "../../hooks/useNotice";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaCalendarAlt, FaClock, FaBell, FaEdit } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";

const Notices = () => {
  const [notices, loading] = useNotice();
  const { user } = useContext(AuthContext);

  const axiosPublic = useAxiosPublic();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Check if user is admin
  const isAdmin = user?.role[0] === "admin" || user?.role[0] === "Admin";
    
  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Check if a notice is expired
  const isExpired = (expiryDate) => {
    return new Date(expiryDate) < new Date();
  };

  // Handle edit button click
  const handleEditClick = (notice) => {
    setEditingNotice(notice);
    setIsEditModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingNotice(null);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingNotice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle update notice
  const handleUpdateNotice = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await axiosPublic.put(
        `/Notices/update-notice/${editingNotice.notice_id}`,
        {
          notice_title: editingNotice.notice_title,
          notice_description: editingNotice.notice_description,
          notice_date: editingNotice.notice_date,
          expiry_date: editingNotice.expiry_date,
        }
      );
      if (response.data.success) {
        toast.success("Notice updated successfully!");
        handleCloseModal();
        // Reload the page to fetch updated data
        window.location.reload();
      } else {
        toast.error("Failed to update notice");
      }
    } catch (error) {
      console.error("Error updating notice:", error);
      toast.error("Error updating notice");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl p-6 shadow-md text-center">
        <h1 className="text-2xl md:text-3xl font-bold">📢 Notices</h1>
        <p className="text-sm opacity-90">
          Stay updated with the latest announcements
        </p>
      </div>

      {/* EMPTY STATE */}
      {notices.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white/80 backdrop-blur-md rounded-2xl shadow-md">
          <FaBell className="text-5xl text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-1">
            No Notices Available
          </h2>
          <p className="text-gray-400 text-sm">
            There are no notices right now
          </p>
        </div>
      ) : (
        /* NOTICE GRID */
        <div className="grid gap-6  md:grid-cols-2 lg:grid-cols-3">
          {notices.map((notice) => {
            const expired = isExpired(notice.expiry_date);

            return (
              <div
                key={notice.notice_id}
                className={`bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-md hover:shadow-lg transition ${
                  expired ? "opacity-70" : ""
                }`}
              >
                {/* TITLE + STATUS */}
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-black">
                    {notice.notice_title}
                  </h2>

                  <div className="flex items-center gap-2">
                    {isAdmin && (
                      <button
                        onClick={() => handleEditClick(notice)}
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="Edit Notice"
                      >
                        <FaEdit className="text-sm" />
                      </button>
                    )}
                    {expired && (
                      <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-600">
                        Expired
                      </span>
                    )}
                  </div>
                </div>

                {/* DESCRIPTION */}
                <p className="text-sm text-gray-600 mb-4">
                  {notice.notice_description}
                </p>

                {/* DATE INFO */}
                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-500" />
                    <span>Posted: {formatDate(notice.notice_date)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaClock className="text-indigo-500" />
                    <span>Expires: {formatDate(notice.expiry_date)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditModalOpen && editingNotice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-t-2xl">
              <h3 className="text-xl font-bold">Edit Notice</h3>
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-white hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleUpdateNotice} className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="text-sm text-gray-600">Notice Title</label>
                <input
                  type="text"
                  name="notice_title"
                  value={editingNotice.notice_title}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm text-gray-600">Notice Description</label>
                <textarea
                  name="notice_description"
                  value={editingNotice.notice_description}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  required
                ></textarea>
              </div>

              {/* Expiry Date */}
              <div>
                <label className="text-sm text-gray-600">Expiry Date</label>
                <input
                  type="date"
                  name="expiry_date"
                  value={editingNotice.expiry_date}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:scale-[1.02] transition disabled:opacity-50"
                >
                  {isUpdating ? "Updating..." : "Update Notice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notices;
