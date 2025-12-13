import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAcademicYear from '../../../hooks/useAcademicYear';
import useExamType from '../../../hooks/useExamType';
import useClass from '../../../hooks/useClass';
import useSection from '../../../hooks/useSection';
import useSubject from '../../../hooks/useSubject';
import useExamSlot from '../../../hooks/useExamSlot';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const AddExamSession = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [years] = useAcademicYear();
    const [examTypes] = useExamType();
    const [classes] = useClass();
    const [sections] = useSection();
    const [subjects] = useSubject();
    const [examSlots] = useExamSlot();

    const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
        defaultValues: {
            year_id: 0,
            exam_type_id: 0,
            subject_id: 0,
            class_id: 0,
            section_id: 0,
            exam_date: '',
            exam_slot_id: 0,
            max_marks: 0
        }
    });

    const watchedValues = watch(['class_id', 'section_id']);
    const classId = watchedValues[0];
    const sectionId = watchedValues[1];

    // Filter sections based on selected class
    const filteredSections = classId && sections
        ? sections.filter(section => section.class_id === parseInt(classId))
        : [];

    // Filter subjects based on selected class and section
    const filteredSubjects = React.useMemo(() => {
        if (!classId || !sectionId || !subjects) return [];
        
        const selectedSection = sections.find(s => s.section_id === parseInt(sectionId));
        if (!selectedSection) return [];
        
        return subjects.filter(subject =>
            subject.department_id === 5 || subject.department_id === selectedSection.department_id
        );
    }, [classId, sectionId, subjects, sections]);

    // Reset dependent fields when class changes
    useEffect(() => {
        setValue('section_id', 0);
        setValue('subject_id', 0);
    }, [classId, setValue]);

    // Reset subject when section changes
    useEffect(() => {
        setValue('subject_id', 0);
    }, [sectionId, setValue]);

    const onSubmit = async (data) => {
        try {
            const response = await axiosSecure.post("/Exam/add-exam", data);
            console.log('Exam session added successfully:', response.data);
            // Reset form after successful submission
            reset();
            toast.success('Exam session added successfully!');
            navigate('/admins-dashboard/manage-exams');
        } catch (error) {
            console.error('Error adding exam session:', error);
            toast.error('Failed to add exam session. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Add Exam Session</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl mx-auto">
                {/* Year Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Academic Year
                    </label>
                    <select
                        {...register('year_id', {
                            required: 'Please select a year',
                            valueAsNumber: true,
                            validate: value => value !== 0 || 'Please select a year'
                        })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value={0}>Select Year</option>
                        {years?.map(year => (
                            <option key={year.year_id} value={year.year_id}>
                                {year.year_lable}
                            </option>
                        ))}
                    </select>
                    {errors.year_id && <p className="text-red-500 text-sm mt-1">{errors.year_id.message}</p>}
                </div>

                {/* Exam Type Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Exam Type
                    </label>
                    <select
                        {...register('exam_type_id', {
                            required: 'Please select an exam type',
                            valueAsNumber: true,
                            validate: value => value !== 0 || 'Please select an exam type'
                        })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value={0}>Select Exam Type</option>
                        {examTypes?.map(examType => (
                            <option key={examType.exam_type_id} value={examType.exam_type_id}>
                                {examType.type_name} ({examType.weight_percentage}%)
                            </option>
                        ))}
                    </select>
                    {errors.exam_type_id && <p className="text-red-500 text-sm mt-1">{errors.exam_type_id.message}</p>}
                </div>

                {/* Exam Slot Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Exam Slot
                    </label>
                    <select
                        {...register('exam_slot_id', {
                            required: 'Please select an exam slot',
                            valueAsNumber: true,
                            validate: value => value !== 0 || 'Please select an exam slot'
                        })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value={0}>Select Exam Slot</option>
                        {examSlots?.map(slot => (
                            <option key={slot.exam_slot_id} value={slot.exam_slot_id}>
                                {slot.exam_slot_name} ({slot.exam_start_time} - {slot.exam_end_time})
                            </option>
                        ))}
                    </select>
                    {errors.exam_slot_id && <p className="text-red-500 text-sm mt-1">{errors.exam_slot_id.message}</p>}
                </div>

                {/* Class Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Class
                    </label>
                    <select
                        {...register('class_id', {
                            required: 'Please select a class',
                            valueAsNumber: true,
                            validate: value => value !== 0 || 'Please select a class'
                        })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value={0}>Select Class</option>
                        {classes?.map(cls => (
                            <option key={cls.class_id} value={cls.class_id}>
                                {cls.class_name}
                            </option>
                        ))}
                    </select>
                    {errors.class_id && <p className="text-red-500 text-sm mt-1">{errors.class_id.message}</p>}
                </div>

                {/* Section Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section
                    </label>
                    <select
                        {...register('section_id', {
                            required: 'Please select a section',
                            valueAsNumber: true,
                            validate: value => value !== 0 || 'Please select a section'
                        })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        disabled={!classId}
                    >
                        <option value={0}>Select Section</option>
                        {filteredSections.map(section => (
                            <option key={section.section_id} value={section.section_id}>
                                {section.section_name}
                            </option>
                        ))}
                    </select>
                    {errors.section_id && <p className="text-red-500 text-sm mt-1">{errors.section_id.message}</p>}
                </div>

                {/* Subject Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                    </label>
                    <select
                        {...register('subject_id', {
                            required: 'Please select a subject',
                            valueAsNumber: true,
                            validate: value => value !== 0 || 'Please select a subject'
                        })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        disabled={!sectionId}
                    >
                        <option value={0}>Select Subject</option>
                        {filteredSubjects.map(subject => (
                            <option key={subject.subject_id} value={subject.subject_id}>
                                {subject.name} ({subject.subject_code})
                            </option>
                        ))}
                    </select>
                    {errors.subject_id && <p className="text-red-500 text-sm mt-1">{errors.subject_id.message}</p>}
                </div>

                {/* Exam Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Exam Date
                    </label>
                    <input
                        type="date"
                        {...register('exam_date', { required: 'Please select an exam date' })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.exam_date && <p className="text-red-500 text-sm mt-1">{errors.exam_date.message}</p>}
                </div>

                {/* Max Marks */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Maximum Marks
                    </label>
                    <input
                        type="number"
                        {...register('max_marks', {
                            required: 'Please enter maximum marks',
                            valueAsNumber: true,
                            min: { value: 1, message: 'Maximum marks must be at least 1' }
                        })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter maximum marks"
                        min="1"
                    />
                    {errors.max_marks && <p className="text-red-500 text-sm mt-1">{errors.max_marks.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
                    >
                        Add Exam Session
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddExamSession;