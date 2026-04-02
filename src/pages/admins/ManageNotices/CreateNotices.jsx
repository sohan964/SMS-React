import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CreateNotices = () => {
  const axiosSecure = useAxiosSecure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axiosSecure.post("/Notices/add-notice", data);
      if (response.data.success) {
        toast.success("Notice added successfully!");
        reset();
      } else {
        toast.error("Failed to add notice");
      }
    } catch (error) {
      console.error("Error adding notice:", error);
      toast.error("Error adding notice");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl p-6 shadow-md">
        <h2 className="text-2xl font-bold">Create New Notice</h2>
        <p className="text-sm opacity-90">
          Publish announcements for students and teachers
        </p>
      </div>

      {/* FORM CARD */}
      <div className="bg-gradient-to-br from-white/70 to-blue-50/60 backdrop-blur-md rounded-2xl shadow-md p-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* TITLE */}
          <div>
            <label className="text-sm text-gray-600">Notice Title</label>
            <input
              type="text"
              placeholder="Enter notice title"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              {...register("notice_title", {
                required: "Notice title is required",
              })}
            />
            {errors.notice_title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.notice_title.message}
              </p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm text-gray-600">Notice Description</label>
            <textarea
              placeholder="Enter notice description"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none transition"
              {...register("notice_description", {
                required: "Notice description is required",
              })}
            ></textarea>
            {errors.notice_description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.notice_description.message}
              </p>
            )}
          </div>

          {/* DATE */}
          <div>
            <label className="text-sm text-gray-600">Expiry Date</label>
            <input
              type="date"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              {...register("expiry_date", {
                required: "Expiry date is required",
              })}
            />
            {errors.expiry_date && (
              <p className="text-red-500 text-xs mt-1">
                {errors.expiry_date.message}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:scale-[1.02] transition disabled:opacity-50"
          >
            {isSubmitting ? "Adding Notice..." : "Add Notice"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNotices;
