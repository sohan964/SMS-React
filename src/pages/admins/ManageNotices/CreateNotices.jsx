import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const CreateNotices = () => {
    const axiosSecure = useAxiosSecure();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
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
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Create New Notice</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Notice Title</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter notice title"
                        className="input input-bordered w-full"
                        {...register("notice_title", { required: "Notice title is required" })}
                    />
                    {errors.notice_title && (
                        <span className="text-error text-sm mt-1">{errors.notice_title.message}</span>
                    )}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Notice Description</span>
                    </label>
                    <textarea
                        placeholder="Enter notice description"
                        className="textarea textarea-bordered w-full h-32"
                        {...register("notice_description", { required: "Notice description is required" })}
                    ></textarea>
                    {errors.notice_description && (
                        <span className="text-error text-sm mt-1">{errors.notice_description.message}</span>
                    )}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Expiry Date</span>
                    </label>
                    <input
                        type="date"
                        className="input input-bordered w-full"
                        {...register("expiry_date", { required: "Expiry date is required" })}
                    />
                    {errors.expiry_date && (
                        <span className="text-error text-sm mt-1">{errors.expiry_date.message}</span>
                    )}
                </div>

                <div className="form-control mt-6">
                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Adding Notice..." : "Add Notice"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateNotices;