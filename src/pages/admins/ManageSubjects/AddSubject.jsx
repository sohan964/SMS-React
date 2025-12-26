import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useDepartment from '../../../hooks/useDepartment';

const AddSubject = () => {
    const axiosSecure = useAxiosSecure();
    const [departments] = useDepartment();
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
            const response = await axiosSecure.post("/Subjects/add-subject", data);
            if (response.data) {
                toast.success('Subject added successfully!');
                reset();
            }
        } catch (error) {
            console.error('Error adding subject:', error);
            toast.error('Failed to add subject');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Add New Subject</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Subject Code */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Subject Code</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter subject code"
                            className="input input-bordered w-full"
                            {...register('subject_code', { required: 'Subject code is required' })}
                        />
                        {errors.subject_code && (
                            <span className="text-error text-sm mt-1">{errors.subject_code.message}</span>
                        )}
                    </div>

                    {/* Subject Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Subject Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter subject name"
                            className="input input-bordered w-full"
                            {...register('name', { required: 'Subject name is required' })}
                        />
                        {errors.name && (
                            <span className="text-error text-sm mt-1">{errors.name.message}</span>
                        )}
                    </div>

                    {/* Department Dropdown */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Department</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            {...register('department_id', { required: 'Department is required' })}
                        >
                            <option value="">Select a department</option>
                            {departments?.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                        {errors.department_id && (
                            <span className="text-error text-sm mt-1">{errors.department_id.message}</span>
                        )}
                    </div>

                    {/* Credit Hours */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Credit Hours</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter credit hours"
                            className="input input-bordered w-full"
                            {...register('credit_hours', {
                                required: 'Credit hours is required',
                                valueAsNumber: true,
                                min: { value: 0, message: 'Credit hours must be positive' }
                            })}
                        />
                        {errors.credit_hours && (
                            <span className="text-error text-sm mt-1">{errors.credit_hours.message}</span>
                        )}
                    </div>

                    {/* Default Marks */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Default Marks</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter default marks"
                            className="input input-bordered w-full"
                            {...register('default_marks', {
                                required: 'Default marks is required',
                                valueAsNumber: true,
                                min: { value: 0, message: 'Default marks must be positive' }
                            })}
                        />
                        {errors.default_marks && (
                            <span className="text-error text-sm mt-1">{errors.default_marks.message}</span>
                        )}
                    </div>

                    {/* Theory and Practical Checkboxes */}
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Theory Subject</span>
                            <input
                                type="checkbox"
                                className="checkbox"
                                {...register('is_theory')}
                            />
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Practical Subject</span>
                            <input
                                type="checkbox"
                                className="checkbox"
                                {...register('is_practical')}
                            />
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-6">
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    Adding Subject...
                                </>
                            ) : (
                                'Add Subject'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSubject;