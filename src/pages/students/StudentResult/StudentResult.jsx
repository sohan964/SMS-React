import React, { useState } from 'react';
import useGradeList from '../../../hooks/useGradeList';
import useStudentData from '../../../hooks/useStudentData';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaPrint } from 'react-icons/fa';
import './StudentResult.css';

const StudentResult = () => {
    const [, loading] = useGradeList();
    const [studentData] = useStudentData();
    const axiosSecure = useAxiosSecure();
    const [selectedSubject, setSelectedSubject] = useState(null);
    
    // Calculate GPA and result status from subject results
    const calculateGpaAndStatus = (results) => {
        // console.log('Calculating GPA and status for results:', results);
        if (results.length === 0) return { gpa: '0.00', status: 'PASSED' };
        
        // Calculate GPA
        const totalGradePoints = results.reduce((sum, subject) => sum + subject.grade_point, 0);
        const calculatedGpa = (totalGradePoints / results.length).toFixed(2);
        
        // Determine result status:
        // If any subject has grade_name "F", the result is FAILED
        // If no subjects have grade_name "F", the result is PASSED
        const hasFailed = results.some(subject => subject.grade_name === 'F');
        const status = hasFailed ? 'FAILED' : 'PASSED';
        return { gpa: calculatedGpa, resultStatus: status};
    };
   

    // Fetch subject results
    const { data: subjectResults = [], isLoading: resultsLoading } = useQuery({
        queryKey: ['subjectResults', studentData?.current_enrollment_id],
        queryFn: async () => {
            if (!studentData?.current_enrollment_id) return [];
            const res = await axiosSecure.get(`Results/get-subjects-results/${studentData.current_enrollment_id}`);
            return res.data.data;
        },
        enabled: !!studentData?.current_enrollment_id
    });

    // Fetch detailed results for a specific subject
    const { data: detailedResults = [], isLoading: detailsLoading } = useQuery({
        queryKey: ['detailedResults', selectedSubject?.subject_id, studentData?.current_enrollment_id],
        queryFn: async () => {
            if (!selectedSubject?.subject_id || !studentData?.current_enrollment_id) return [];
            const res = await axiosSecure.get(`Results/get-details-result/${studentData.current_enrollment_id}/${selectedSubject.subject_id}`);
            return res.data.data;
        },
        enabled: !!selectedSubject?.subject_id && !!studentData?.current_enrollment_id
    });

    // Calculate GPA and result status
    const { gpa, resultStatus } = calculateGpaAndStatus(subjectResults);

    // Format date of birth
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    // Format gender
    const formatGender = (gender) => {
        return gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : gender;
    };

    // Print function
    const handlePrint = () => {
        window.print();
    };

    // Handle subject click to open modal
    const handleSubjectClick = (subject) => {
        setSelectedSubject(subject);
        // Use DaisyUI's showModal method
        document.getElementById('subject_details_modal').showModal();
    };

    if (loading || resultsLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            {/* Print button - hidden when printing */}
            <div className="flex justify-between mb-4 print:hidden">
                <button
                    onClick={handlePrint}
                    className="btn bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                >
                    <FaPrint />
                    Print Result
                </button>
            </div>

            {/* Result Sheet */}
            <div className="bg-white shadow-lg w-3/4 rounded-lg p-6 print:shadow-none print:border print:border-gray-300">
                {/* Header */}
                <div className="text-center mb-6 border-b-2 border-green-500 pb-4">
                    <h1 className="text-2xl font-bold text-green-700">Student Result Sheet</h1>
                </div>

                {/* Student Information */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-evenly">
                        <div className="flex justify-between">
                            <span className="font-semibold text-green-700">Student Number:</span>
                            <span className="text-gray-700">{studentData?.student_number || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-green-700">Student Name:</span>
                            <span className="text-gray-700">{studentData ? `${studentData.first_name} ${studentData.last_name}` : 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-green-700">Date of Birth:</span>
                            <span className="text-gray-700">{formatDate(studentData?.dob)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-green-700">Gender:</span>
                            <span className="text-gray-700">{formatGender(studentData?.gender)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-green-700">Class:</span>
                            <span className="text-gray-700">{studentData?.class_name || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-green-700">Section:</span>
                            <span className="text-gray-700">{studentData?.section_name || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-green-700">Result:</span>
                            <span className={`font-bold text-lg ${resultStatus === 'PASSED' ? 'text-green-600' : 'text-red-600'}`}>
                                {resultStatus}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-green-700">GPA:</span>
                            <span className="font-bold text-lg text-blue-600">{gpa}</span>
                        </div>
                    </div>
                </div>

                {/* Subject Results Table */}
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr className="bg-green-100">
                                <th className="border border-green-300 text-green-700">Subject Name</th>
                                <th className="border border-green-300 text-green-700">Achieved Marks</th>
                                <th className="border border-green-300 text-green-700">Grade</th>
                                <th className="border border-green-300 text-green-700">Point</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjectResults.map((subject, index) => (
                                <tr key={index}>
                                    <td
                                        className="border border-green-200 cursor-pointer hover:bg-green-50 text-blue-600 hover:underline"
                                        onClick={() => handleSubjectClick(subject)}
                                    >
                                        {subject.subject_name}
                                    </td>
                                    <td className="border border-green-200 text-center">{subject.total_marks}</td>
                                    <td className="border border-green-200 text-center">
                                        <span className={`font-bold ${
                                            subject.grade_name === 'F' ? 'text-red-600' :
                                            subject.grade_point >= 4 ? 'text-green-600' :
                                            subject.grade_point >= 3 ? 'text-blue-600' :
                                            'text-yellow-600'
                                        }`}>
                                            {subject.grade_name}
                                        </span>
                                    </td>
                                    <td className="border border-green-200 text-center">{subject.grade_point}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t-2 border-green-300 flex justify-between">
                    {/* <div className="text-center">
                        <div className="h-16 border-b border-green-400 mb-2"></div>
                        <p className="text-green-700 font-medium">Class Teacher</p>
                    </div> */}
                    <div className="text-center">
                        <div className="h-16 border-b border-green-400 mb-2"></div>
                        <p className="text-green-700 font-medium">Principal</p>
                    </div>
                </div>
            </div>

            {/* Modal for Subject Details */}
            <dialog id="subject_details_modal" className="modal">
                <div className="modal-box w-11/12 max-w-4xl">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg text-green-700 mb-4">
                       Your {selectedSubject?.subject_name} - Exam Details
                    </h3>
                    
                    {detailsLoading ? (
                        <div className="flex justify-center py-8">
                            <div className="loading loading-spinner loading-md"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr className="bg-green-100">
                                        <th className="border border-green-300 text-green-700">Exam Type ID</th>
                                        <th className="border border-green-300 text-green-700">Exam Type</th>
                                        <th className="border border-green-300 text-green-700">Marks</th>
                                        <th className="border border-green-300 text-green-700">Weight (%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detailedResults.map((exam, index) => (
                                        <tr key={index}>
                                            <td className="border border-green-200 text-center">{exam.exam_type_id}</td>
                                            <td className="border border-green-200">{exam.type_name}</td>
                                            <td className="border border-green-200 text-center">
                                                {exam.marks !== null ? (
                                                    <span className="font-semibold text-blue-600">{exam.marks}</span>
                                                ) : (
                                                    <span className="text-gray-500 italic">Marks not submitted</span>
                                                )}
                                            </td>
                                            <td className="border border-green-200 text-center">{exam.weight_percentage}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn bg-green-600 hover:bg-green-700 text-white">Close</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default StudentResult;