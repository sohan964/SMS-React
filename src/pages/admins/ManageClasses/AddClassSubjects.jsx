import React, { useState } from 'react';
import useClass from '../../../hooks/useClass';
import useSubject from '../../../hooks/useSubject';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const AddClassSubjects = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [classes, loadingClasses] = useClass();
    const [subjects, loadingSubjects] = useSubject();
    const axiosSecure = useAxiosSecure();
    console.log('Subjects:', subjects);
    const handleClassChange = (e) => {
        setSelectedClass(e.target.value);
        setSelectedSubjects([]); // Reset selected subjects when class changes
    };

    const handleSubjectChange = (subjectId) => {
        setSelectedSubjects(prev => 
            prev.includes(subjectId) 
                ? prev.filter(id => id !== subjectId)
                : [...prev, subjectId]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedClass) {
            toast.error('Please select a class');
            return;
        }
        
        if (selectedSubjects.length === 0) {
            toast.error('Please select at least one subject');
            return;
        }

        setIsSubmitting(true);
        
        try {
            const response = await axiosSecure.post("/Classes/add-class-subject", {
                class_id: parseInt(selectedClass),
                subjects_list: selectedSubjects
            });
            
            if (response.data.success) {
                toast.success('Subjects added to class successfully');
                setSelectedClass('');
                setSelectedSubjects([]);
            } else {
                toast.error('Failed to add subjects to class');
            }
        } catch (error) {
            console.error('Error adding subjects to class:', error);
            toast.error(error.response?.data?.message || 'Failed to add subjects to class');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Add Subjects to Class</h2>
            
            <div className="card bg-base-100 shadow-xl p-6">
                <form onSubmit={handleSubmit}>
                    {/* Class Selection */}
                    <div className="form-control mb-6">
                        <label className="label">
                            <span className="label-text font-semibold">Select Class</span>
                        </label>
                        <select 
                            className="select select-bordered w-full" 
                            value={selectedClass}
                            onChange={handleClassChange}
                            disabled={loadingClasses}
                        >
                            <option value="">-- Select a Class --</option>
                            {classes.map(cls => (
                                <option key={cls.class_id} value={cls.class_id}>
                                    {cls.class_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Subjects Selection */}
                    {selectedClass && (
                        <div className="form-control mb-6">
                            <label className="label">
                                <span className="label-text font-semibold">Select Subjects</span>
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {loadingSubjects ? (
                                    <div className="col-span-full text-center py-4">
                                        <span className="loading loading-spinner loading-md"></span>
                                        <p className="mt-2">Loading subjects...</p>
                                    </div>
                                ) : subjects.length === 0 ? (
                                    <div className="col-span-full text-center py-4">
                                        <p>No subjects available</p>
                                    </div>
                                ) : (
                                    subjects.map(subject => (
                                        <div key={subject.subject_id} className="form-control">
                                            <label className="label cursor-pointer justify-start gap-3">
                                                <input
                                                    type="checkbox"
                                                    className="checkbox checkbox-primary"
                                                    checked={selectedSubjects.includes(subject.subject_id)}
                                                    onChange={() => handleSubjectChange(subject.subject_id)}
                                                />
                                                <span className="label-text">{subject.name}</span>
                                            </label>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="form-control mt-6">
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={isSubmitting || !selectedClass || selectedSubjects.length === 0}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Adding Subjects...
                                </>
                            ) : (
                                'Add Subjects to Class'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClassSubjects;