import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../providers/AuthProvider';
import useTeacherData from '../../../hooks/useTeacherData';
import useAcademicYear from '../../../hooks/useAcademicYear';
import useClass from '../../../hooks/useClass';
import useSection from '../../../hooks/useSection';
import useSubject from '../../../hooks/useSubject';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const AddResults = () => {
    const [teacherData] = useTeacherData();
    const [years] = useAcademicYear();
    const [classes] = useClass();
    const [sections] = useSection();
    const [subjects] = useSubject();
    const axiosSecure = useAxiosSecure();
    
    const [teacherRoutineData, setTeacherRoutineData] = useState([]);
    const [examSessions, setExamSessions] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [submittedResults, setSubmittedResults] = useState(new Set());
    const [existingResults, setExistingResults] = useState({});
    const [loading, setLoading] = useState(false);
    
    const { register, formState: { errors }, setValue, watch } = useForm({
        defaultValues: {
            year_id: 0,
            class_id: 0,
            section_id: 0,
            subject_id: 0,
            exam_session_id: 0
        }
    });

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
    }, [yearId, classId, sectionId, subjectId, axiosSecure]);

    // Check if result exists for a specific enrollment
    const checkExistingResult = async (examSessionId, enrollmentId) => {
        try {
            const response = await axiosSecure.get(`/Results/get-result/${examSessionId}/${enrollmentId}`);
            return response.data;
        } catch (error) {
            console.error('Error checking existing result:', error);
            return { success: false, data: null };
        }
    };

    // Fetch enrollments when exam session is selected
    const fetchEnrollments = async () => {
        if (!yearId || !classId || !sectionId) {
            toast.error('Please select year, class, and section first');
            return;
        }
        
        setLoading(true);
        try {
            const response = await axiosSecure.get(
                `/Enrollments/get-enrollments?year_id=${yearId}&class_id=${classId}&section_id=${sectionId}&status=Active`
            );
            const enrollmentsData = response.data.data || [];
            setEnrollments(enrollmentsData);
            
            // Check for existing results if exam session is selected
            if (examSessionId && enrollmentsData.length > 0) {
                const resultsPromises = enrollmentsData.map(async (enrollment) => {
                    const resultData = await checkExistingResult(examSessionId, enrollment.enrollment_id);
                    return {
                        enrollmentId: enrollment.enrollment_id,
                        hasResult: resultData.success,
                        resultData: resultData.data
                    };
                });
                
                const results = await Promise.all(resultsPromises);
                const existingResultsMap = {};
                results.forEach(result => {
                    existingResultsMap[result.enrollmentId] = {
                        hasResult: result.hasResult,
                        resultData: result.resultData
                    };
                });
                setExistingResults(existingResultsMap);
            }
        } catch (error) {
            console.error('Error fetching enrollments:', error);
            toast.error('Failed to fetch enrollments');
            setEnrollments([]);
            setExistingResults({});
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
        setEnrollments([]);
    }, [yearId, setValue]);

    useEffect(() => {
        setValue('section_id', 0);
        setValue('subject_id', 0);
        setValue('exam_session_id', 0);
        setEnrollments([]);
    }, [classId, setValue]);

    useEffect(() => {
        setValue('subject_id', 0);
        setValue('exam_session_id', 0);
        setEnrollments([]);
    }, [sectionId, setValue]);

    useEffect(() => {
        setValue('exam_session_id', 0);
        setEnrollments([]);
    }, [subjectId, setValue]);

    // Check existing results when exam session changes
    useEffect(() => {
        if (examSessionId && enrollments.length > 0) {
            const checkResults = async () => {
                setLoading(true);
                try {
                    const resultsPromises = enrollments.map(async (enrollment) => {
                        const resultData = await checkExistingResult(examSessionId, enrollment.enrollment_id);
                        return {
                            enrollmentId: enrollment.enrollment_id,
                            hasResult: resultData.success,
                            resultData: resultData.data
                        };
                    });
                    
                    const results = await Promise.all(resultsPromises);
                    const existingResultsMap = {};
                    results.forEach(result => {
                        existingResultsMap[result.enrollmentId] = {
                            hasResult: result.hasResult,
                            resultData: result.resultData
                        };
                    });
                    setExistingResults(existingResultsMap);
                } catch (error) {
                    console.error('Error checking existing results:', error);
                    setExistingResults({});
                } finally {
                    setLoading(false);
                }
            };
            
            checkResults();
        } else {
            setExistingResults({});
        }
    }, [examSessionId, enrollments]);

    // Handle result submission for individual student
    const handleResultSubmission = async (enrollmentId, obtainedMarks) => {
        if (!examSessionId) {
            toast.error('Please select an exam session first');
            return;
        }

        if (obtainedMarks === '' || obtainedMarks === null || obtainedMarks === undefined) {
            toast.error('Please enter obtained marks');
            return;
        }

        try {
            const response = await axiosSecure.post("/Results/add-result", {
                exam_session_id: parseInt(examSessionId),
                enrollment_id: parseInt(enrollmentId),
                obtained_marks: parseFloat(obtainedMarks)
            });

            if (response.data.success) {
                toast.success('Result added successfully');
                setSubmittedResults(prev => new Set(prev).add(enrollmentId));
            } else {
                toast.error(response.data.message || 'Failed to add result');
            }
        } catch (error) {
            console.error('Error submitting result:', error);
            toast.error('Failed to submit result');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Add Results</h2>
            
            <div className="space-y-4 max-w-2xl mx-auto">
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

                {/* Exam Session Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Exam Session
                    </label>
                    <select
                        {...register('exam_session_id', {
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

                {/* Get Enrollments Button */}
                <div className="pt-4">
                    <button
                        type="button"
                        onClick={fetchEnrollments}
                        disabled={!yearId || !classId || !sectionId || loading}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 font-medium disabled:bg-gray-400"
                    >
                        {loading ? 'Loading...' : 'Get Enrollments'}
                    </button>
                </div>
            </div>

            {/* Enrollments Table */}
            {enrollments.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Student Enrollments</h3>
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
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {enrollments.map((enrollment) => (
                                    <tr key={enrollment.enrollment_id}>
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
                                            {existingResults[enrollment.enrollment_id]?.hasResult ? (
                                                <input
                                                    type="number"
                                                    value={existingResults[enrollment.enrollment_id]?.resultData?.obtained_marks || ''}
                                                    className="w-24 p-2 border border-gray-300 rounded-md bg-gray-100"
                                                    readOnly
                                                    disabled
                                                />
                                            ) : (
                                                <input
                                                    type="number"
                                                    id={`marks-${enrollment.enrollment_id}`}
                                                    className="w-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="0"
                                                    min="0"
                                                    step="0.01"
                                                    disabled={submittedResults.has(enrollment.enrollment_id)}
                                                />
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            {existingResults[enrollment.enrollment_id]?.hasResult ? (
                                                <button
                                                    disabled
                                                    className="px-4 py-2 rounded-md text-white font-medium bg-gray-400 cursor-not-allowed"
                                                >
                                                    Result Exists
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        const marksInput = document.getElementById(`marks-${enrollment.enrollment_id}`);
                                                        handleResultSubmission(enrollment.enrollment_id, marksInput.value);
                                                    }}
                                                    disabled={submittedResults.has(enrollment.enrollment_id)}
                                                    className={`px-4 py-2 rounded-md text-white font-medium ${
                                                        submittedResults.has(enrollment.enrollment_id)
                                                            ? 'bg-gray-400 cursor-not-allowed'
                                                            : 'bg-blue-600 hover:bg-blue-700'
                                                    }`}
                                                >
                                                    {submittedResults.has(enrollment.enrollment_id) ? 'Submitted' : 'Submit Result'}
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddResults;