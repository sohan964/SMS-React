import React, { useState } from 'react';
import useExamType from '../../../hooks/useExamType';
import useStudentData from '../../../hooks/useStudentData';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ExamRoutine = () => {
    const [examTypes] = useExamType();
    const [studentData] = useStudentData();
    const axiosSecure = useAxiosSecure();
    
    const [selectedExamType, setSelectedExamType] = useState(null);
    const [examSessions, setExamSessions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleExamTypeChange = async (e) => {
        const examTypeId = parseInt(e.target.value);
        const selectedType = examTypes.find(type => type.exam_type_id === examTypeId);
        setSelectedExamType(selectedType);
        
        if (selectedType && studentData) {
            setLoading(true);
            setError('');
            try {
                const response = await axiosSecure.get(
                    `Exam/get-exam-sessions?year_id=${studentData.current_year_id}&exam_type_id=${selectedType.exam_type_id}&class_id=${studentData.class_id}&section_id=${studentData.section_id}`
                );
                if (response.data.success) {
                    setExamSessions(response.data.data);
                } else {
                    setExamSessions([]);
                    setError(response.data.message || 'Failed to fetch exam sessions');
                }
            } catch (err) {
                console.error('Error fetching exam sessions:', err);
                setExamSessions([]);
                setError('An error occurred while fetching exam sessions');
            } finally {
                setLoading(false);
            }
        }
    };

    // Sort exam sessions by date
    const sortedExamSessions = [...examSessions].sort((a, b) => 
        new Date(a.exam_date) - new Date(b.exam_date)
    );

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Exam Routine</h2>
            
            {/* Exam Type Dropdown */}
            <div className="mb-6">
                <label htmlFor="examType" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Exam Type
                </label>
                <select
                    id="examType"
                    value={selectedExamType?.exam_type_id || ''}
                    onChange={handleExamTypeChange}
                    className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">-- Select Exam Type --</option>
                    {examTypes.map((type) => (
                        <option key={type.exam_type_id} value={type.exam_type_id}>
                            {type.type_name} ({type.weight_percentage}%)
                        </option>
                    ))}
                </select>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Exam Sessions Table */}
            {selectedExamType && !loading && sortedExamSessions.length > 0 && (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">
                            {selectedExamType.type_name} Exam Schedule
                        </h3>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Subject
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Exam Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Max Marks
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Exam Type
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sortedExamSessions.map((session) => (
                                <tr key={session.exam_session_id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {session.subject_name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {new Date(session.exam_date).toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {session.max_marks}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {session.exam_type_name}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* No Data State */}
            {selectedExamType && !loading && sortedExamSessions.length === 0 && !error && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                    <svg className="mx-auto h-12 w-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-yellow-800">No exam sessions found</h3>
                    <p className="mt-1 text-sm text-yellow-700">
                        There are no exam sessions scheduled for {selectedExamType.type_name} at this time.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ExamRoutine;
