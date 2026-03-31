import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useTeacherData from '../../../hooks/useTeacherData';
import useAcademicYear from '../../../hooks/useAcademicYear';
import useClass from '../../../hooks/useClass';
import useSection from '../../../hooks/useSection';
import useSubject from '../../../hooks/useSubject';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';


const ResultList = () => {
    const [teacherData] = useTeacherData();
    const [years] = useAcademicYear();
    const [classes] = useClass();
    const [sections] = useSection();
    const [subjects] = useSubject();
    const axiosSecure = useAxiosSecure();
    
    const [teacherRoutineData, setTeacherRoutineData] = useState([]);
    const [examSessions, setExamSessions] = useState([]);
    const [studentResults, setStudentResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedResult, setSelectedResult] = useState(null);
    const [selectedEnrollment, setSelectedEnrollment] = useState(null);
    const [maxMarks, setMaxMarks] = useState(0);
    const [isUpdating, setIsUpdating] = useState(false);
    
    const { register: registerFilter, formState: { errors }, setValue, watch } = useForm({
        defaultValues: {
            year_id: 0,
            class_id: 0,
            section_id: 0,
            subject_id: 0,
            exam_session_id: 0
        }
    });

    const {
        register: registerEdit,
        handleSubmit: handleSubmitEdit,
        formState: { errors: editErrors },
        reset: resetEdit,
        setValue: setEditValue
    } = useForm();

    const watchedValues = watch(['year_id', 'class_id', 'section_id', 'subject_id', 'exam_session_id']);
    const yearId = watchedValues[0];
    const classId = watchedValues[1];
    const sectionId = watchedValues[2];
    const subjectId = watchedValues[3];
    const examSessionId = watchedValues[4];

    // Fetch teacher routine data when year is selected
    useEffect(() => {
        if (yearId && teacherData?.teacher_id) {
            const fetchTeacherRoutine = async () => {
                try {
                    const response = await axiosSecure.get(`/ClassRoutines/teacher-routine/${teacherData.teacher_id}/${yearId}`);
                    setTeacherRoutineData(response.data.data || []);
                } catch (error) {
                    console.error('Error fetching teacher routine:', error);
                    toast.error('Failed to fetch teacher routine data');
                    setTeacherRoutineData([]);
                }
            };
            fetchTeacherRoutine();
        } else {
            setTeacherRoutineData([]);
        }
    }, [yearId, teacherData?.teacher_id, axiosSecure]);

    // Filter classes based on teacher routine data
    const filteredClasses = React.useMemo(() => {
        if (!teacherRoutineData.length || !classes.length) return [];
        
        const classIdsFromRoutine = [...new Set(teacherRoutineData.map(routine => routine.class_id))];
        return classes.filter(cls => classIdsFromRoutine.includes(cls.class_id));
    }, [teacherRoutineData, classes]);

    // Filter sections based on selected class and teacher routine data
    const filteredSections = React.useMemo(() => {
        if (!classId || !teacherRoutineData.length || !sections.length) return [];
        
        const sectionIdsFromRoutine = [...new Set(
            teacherRoutineData
                .filter(routine => routine.class_id === parseInt(classId))
                .map(routine => routine.section_id)
        )];
        
        return sections.filter(section => sectionIdsFromRoutine.includes(section.section_id));
    }, [classId, teacherRoutineData, sections]);

    // Filter subjects based on selected class, section, and teacher routine data
    const filteredSubjects = React.useMemo(() => {
        if (!classId || !sectionId || !teacherRoutineData.length || !subjects.length) return [];
        
        const subjectIdsFromRoutine = [...new Set(
            teacherRoutineData
                .filter(routine => 
                    routine.class_id === parseInt(classId) && 
                    routine.section_id === parseInt(sectionId)
                )
                .map(routine => routine.subject_id)
        )];
        
        return subjects.filter(subject => subjectIdsFromRoutine.includes(subject.subject_id));
    }, [classId, sectionId, teacherRoutineData, subjects]);

    // Fetch exam sessions when all parameters are selected
    useEffect(() => {
        if (yearId && classId && sectionId && subjectId) {
            const fetchExamSessions = async () => {
                try {
                    const isTeacherAssigned = teacherRoutineData.some(routine =>
                        routine.class_id === parseInt(classId) &&
                        routine.section_id === parseInt(sectionId) &&
                        routine.subject_id === parseInt(subjectId)
                    );

                    if (!isTeacherAssigned) {
                        toast.error('You are not assigned to teach this subject for the selected class and section');
                        setExamSessions([]);
                        return;
                    }

                    const response = await axiosSecure.get(
                        `/Exam/get-exam-sessions?year_id=${yearId}&subject_id=${subjectId}&class_id=${classId}&section_id=${sectionId}`
                    );
                    setExamSessions(response.data.data || []);
                } catch (error) {
                    console.error('Error fetching exam sessions:', error);
                    toast.error('Failed to fetch exam sessions');
                    setExamSessions([]);
                }
            };
            fetchExamSessions();
        } else {
            setExamSessions([]);
        }
    }, [yearId, classId, sectionId, subjectId, axiosSecure, teacherRoutineData]);

    // Fetch student results when exam session is selected
    const fetchStudentResults = async () => {
        if (!yearId || !classId || !sectionId) {
            toast.error('Please select year, class, and section first');
            return;
        }
        
        if (!examSessionId) {
            toast.error('Please select an exam session first');
            return;
        }
        
        setLoading(true);
        try {
            // Fetch enrollments
            const enrollmentResponse = await axiosSecure.get(
                `/Enrollments/get-enrollments?year_id=${yearId}&class_id=${classId}&section_id=${sectionId}&status=Active`
            );
            const enrollmentsData = enrollmentResponse.data.data || [];
            
            // Fetch results for each enrollment
            const resultsPromises = enrollmentsData.map(async (enrollment) => {
                try {
                    const response = await axiosSecure.get(`/Results/get-result/${examSessionId}/${enrollment.enrollment_id}`);
                    console.log(response)
                    return {
                        enrollment: enrollment,
                        hasResult: response.data.success,
                        resultData: response.data.data
                    };
                } catch (err) {
                    console.error('Error fetching result for enrollment:', enrollment.enrollment_id, err);
                    return {
                        enrollment: enrollment,
                        hasResult: false,
                        resultData: null
                    };
                }
            });
            
            const results = await Promise.all(resultsPromises);
            // Filter only students with submitted results
            const submittedResults = results.filter(result => result.hasResult);
            setStudentResults(submittedResults);
            
            if (submittedResults.length === 0) {
                toast.info('No results found for the selected exam session');
            }
        } catch (err) {
            console.error('Error fetching student results:', err);
            toast.error('Failed to fetch student results, The Result is not submit yet');
            setStudentResults([]);
        } finally {
            setLoading(false);
        }
    };

    // Reset dependent fields when parent selections change
    useEffect(() => {
        setValue('class_id', 0);
        setValue('section_id', 0);
        setValue('subject_id', 0);
        setValue('exam_session_id', 0);
        setStudentResults([]);
    }, [yearId, setValue]);

    useEffect(() => {
        setValue('section_id', 0);
        setValue('subject_id', 0);
        setValue('exam_session_id', 0);
        setStudentResults([]);
    }, [classId, setValue]);

    useEffect(() => {
        setValue('subject_id', 0);
        setValue('exam_session_id', 0);
        setStudentResults([]);
    }, [sectionId, setValue]);

    useEffect(() => {
        setValue('exam_session_id', 0);
        setStudentResults([]);
    }, [subjectId, setValue]);

    useEffect(() => {
        setStudentResults([]);
    }, [examSessionId]);

    // Open edit modal
    const openEditModal = (resultItem) => {
        const result = resultItem.resultData;
        const enrollment = resultItem.enrollment;
        const session = examSessions.find(s => s.exam_session_id === parseInt(examSessionId));
        
        setSelectedResult(result);
        setSelectedEnrollment(enrollment);
        setMaxMarks(session?.max_marks || 0);
        
        // Pre-fill the form with current values
        setEditValue('obtained_marks', result?.obtained_marks || 0);
        // setEditValue('remarks', result?.remarks || '');
        
        setIsEditModalOpen(true);
    };

    // Close edit modal
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedResult(null);
        setSelectedEnrollment(null);
        resetEdit();
    };

    // Handle update result
    const handleUpdateResult = async (data) => {
        if (!selectedResult?.result_id) {
            toast.error('Result ID not found');
            return;
        }

        // Validate obtained marks against max marks
        const obtainedMarks = parseFloat(data.obtained_marks);
        if (obtainedMarks < 0) {
            toast.error('Obtained marks cannot be negative');
            return;
        }
        if (obtainedMarks > maxMarks) {
            toast.error(`Obtained marks cannot exceed maximum marks (${maxMarks})`);
            return;
        }

        setIsUpdating(true);
        try {
            const response = await axiosSecure.put(
                `Results/update-result/${selectedResult.result_id}/${obtainedMarks}`
            );

            if (response.data.success) {
                toast.success('Result updated successfully');
                closeEditModal();
                // Refresh the results
                await fetchStudentResults();
            } else {
                toast.error(response.data.message || 'Failed to update result');
            }
        } catch (error) {
            console.error('Error updating result:', error);
            toast.error(error.response?.data?.message || 'Failed to update result');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Result List</h2>
            
            <div className="space-y-4 max-w-2xl mx-auto">
                {/* Year Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Academic Year
                    </label>
                    <select
                        {...registerFilter('year_id', {
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

                {/* Class Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Class
                    </label>
                    <select
                        {...registerFilter('class_id', {
                            required: 'Please select a class',
                            valueAsNumber: true,
                            validate: value => value !== 0 || 'Please select a class'
                        })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        disabled={!yearId || !teacherRoutineData.length}
                    >
                        <option value={0}>Select Class</option>
                        {filteredClasses.map(cls => (
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
                        {...registerFilter('section_id', {
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
                        {...registerFilter('subject_id', {
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

                {/* Exam Session Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Exam Session
                    </label>
                    <select
                        {...registerFilter('exam_session_id', {
                            required: 'Please select an exam session',
                            valueAsNumber: true,
                            validate: value => value !== 0 || 'Please select an exam session'
                        })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        disabled={!subjectId}
                    >
                        <option value={0}>Select Exam Session</option>
                        {examSessions.map(session => (
                            <option key={session.exam_session_id} value={session.exam_session_id}>
                                {session.exam_type_name} - {session.subject_name} ({session.exam_date}) - Max: {session.max_marks}
                            </option>
                        ))}
                    </select>
                    {errors.exam_session_id && <p className="text-red-500 text-sm mt-1">{errors.exam_session_id.message}</p>}
                </div>

                {/* Get Results Button */}
                <div className="pt-4">
                    <button
                        type="button"
                        onClick={fetchStudentResults}
                        disabled={!yearId || !classId || !sectionId || !examSessionId || loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium disabled:bg-gray-400"
                    >
                        {loading ? 'Loading...' : 'Get Results'}
                    </button>
                </div>
            </div>

            {/* Results Table */}
            {studentResults.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Student Results</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Enrollment ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Student Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Student Number
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Obtained Marks
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {studentResults.map((item, index) => {
                                    const enrollment = item.enrollment;
                                    const result = item.resultData;
                                    const obtainedMarks = result?.obtained_marks || 0;
                                    
                                    
                                    return (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {enrollment.enrollment_id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {enrollment.student_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {enrollment.student_number}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {obtainedMarks}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <button
                                                    onClick={() => openEditModal(item)}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition duration-200 text-sm font-medium"
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    
                    
                </div>
            )}

            {/* Edit Result Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Background overlay */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                        onClick={closeEditModal}
                    ></div>

                    {/* Modal panel */}
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all scale-100">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Edit Result
                                </h3>
                            </div>
                            <button
                                onClick={closeEditModal}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="px-6 py-5">
                            {/* Student Info Card */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-5 border border-blue-100">
                                <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-800 truncate">
                                            {selectedEnrollment?.student_name}
                                        </p>
                                        <div className="flex items-center gap-4 mt-1">
                                            <p className="text-xs text-gray-500">
                                                <span className="font-medium">ID:</span> {selectedEnrollment?.enrollment_id}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                <span className="font-medium">No:</span> {selectedEnrollment?.student_number}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Edit Form */}
                            <form onSubmit={handleSubmitEdit(handleUpdateResult)} className="space-y-5">
                                {/* Obtained Marks */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Obtained Marks
                                        <span className="ml-2 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                            Max: {maxMarks}
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            max={maxMarks}
                                            {...registerEdit('obtained_marks', {
                                                required: 'Obtained marks is required',
                                                valueAsNumber: true,
                                                validate: value => {
                                                    if (value < 0) return 'Marks cannot be negative';
                                                    if (value > maxMarks) return `Marks cannot exceed ${maxMarks}`;
                                                    return true;
                                                }
                                            })}
                                            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                                                editErrors.obtained_marks
                                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                                                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                                            }`}
                                            placeholder="Enter obtained marks"
                                        />
                                        {editErrors.obtained_marks && (
                                            <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {editErrors.obtained_marks.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={closeEditModal}
                                        disabled={isUpdating}
                                        className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isUpdating}
                                        className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isUpdating ? (
                                            <>
                                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Update Result
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultList;
