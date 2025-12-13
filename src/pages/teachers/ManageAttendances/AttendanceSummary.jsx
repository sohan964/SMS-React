import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import useTeacherData from '../../../hooks/useTeacherData';
import useAcademicYear from '../../../hooks/useAcademicYear';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const AttendanceSummary = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [teacherData] = useTeacherData(user?.id);
    const [years] = useAcademicYear();
    const navigate = useNavigate();

    // State management
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedRoutine, setSelectedRoutine] = useState('');
    const [teacherRoutines, setTeacherRoutines] = useState([]);
    const [attendanceSummary, setAttendanceSummary] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);

    // Fetch teacher routine when year is selected
    useEffect(() => {
        if (teacherData && selectedYear) {
            fetchTeacherRoutine();
        }
    }, [teacherData, selectedYear]);

    const fetchTeacherRoutine = async () => {
        try {
            setLoading(true);
            const response = await axiosSecure.get(`/ClassRoutines/teacher-routine/${teacherData.teacher_id}/${selectedYear}`);
            if (response.data.success) {
                setTeacherRoutines(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching teacher routine:', error);
            toast.error('Failed to fetch teacher routine');
        } finally {
            setLoading(false);
        }
    };

    // Filter routines to get unique combinations of class_id, section_id, and subject_id
    const getUniqueRoutines = () => {
        const uniqueMap = new Map();
        
        teacherRoutines.forEach(routine => {
            const key = `${routine.class_id}-${routine.section_id}-${routine.subject_id}`;
            if (!uniqueMap.has(key)) {
                uniqueMap.set(key, {
                    ...routine,
                    display_name: `${routine.class_name}-${routine.section_name}-${routine.subject_name}`
                });
            }
        });
        
        return Array.from(uniqueMap.values());
    };

    const handleSubmit = async () => {
        if (!selectedYear || !selectedRoutine) {
            toast.error('Please select both year and routine');
            return;
        }

        try {
            setLoading(true);
            const routine = getUniqueRoutines().find(r => r.display_name === selectedRoutine);
            
            const response = await axiosSecure.get(
                `/Attendances/attendance-summary?year_id=${selectedYear}&class_id=${routine.class_id}&section_id=${routine.section_id}&subject_id=${routine.subject_id}`
            );
            
            if (response.data.success) {
                setAttendanceSummary(response.data.data);
                setShowResults(true);
                toast.success('Attendance summary loaded successfully');
            }
        } catch (error) {
            console.error('Error fetching attendance summary:', error);
            toast.error('Failed to fetch attendance summary');
        } finally {
            setLoading(false);
        }
    };

    const handleDetails = (student) => {
        const routine = getUniqueRoutines().find(r => r.display_name === selectedRoutine);
        navigate('/teacher-dashboard/manage-attendances/attendance-details', {
            state: {
                enrollment_id: student.enrollment_id,
                year_id: selectedYear,
                subject_id: routine.subject_id
            }
        });
    };

    const getAttendancePercentageColor = (percentage) => {
        if (percentage >= 90) return 'text-green-600';
        if (percentage >= 75) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Attendance Summary</h2>
            
            {/* Year Selection */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Select Academic Year</label>
                <select 
                    className="select select-bordered w-full max-w-xs"
                    value={selectedYear}
                    onChange={(e) => {
                        setSelectedYear(e.target.value);
                        setSelectedRoutine('');
                        setShowResults(false);
                    }}
                >
                    <option value="">Select Year</option>
                    {years.map(year => (
                        <option key={year.year_id} value={year.year_id}>
                            {year?.year_lable}
                        </option>
                    ))}
                </select>
            </div>

            {/* Routine Selection */}
            {teacherRoutines.length > 0 && (
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Select Class-Section-Subject</label>
                    <select 
                        className="select select-bordered w-full max-w-xs"
                        value={selectedRoutine}
                        onChange={(e) => {
                            setSelectedRoutine(e.target.value);
                            setShowResults(false);
                        }}
                    >
                        <option value="">Select Routine</option>
                        {getUniqueRoutines().map((routine, index) => (
                            <option key={index} value={routine.display_name}>
                                {routine.display_name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Submit Button */}
            {selectedYear && selectedRoutine && (
                <div className="mb-6">
                    <button 
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Get Attendance Summary'}
                    </button>
                </div>
            )}

            {/* Attendance Summary Table */}
            {showResults && attendanceSummary.length > 0 && (
                <div className="overflow-x-auto">
                    <h3 className="text-xl font-semibold mb-4">Attendance Summary Results</h3>
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Student Number</th>
                                <th>Student Name</th>
                                <th>Total Classes</th>
                                <th>Total Present</th>
                                <th>Total Absent</th>
                                <th>Attendance %</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceSummary.map((student) => (
                                <tr key={student.enrollment_id}>
                                    <td>{student.student_number}</td>
                                    <td>{student.first_name} {student.last_name}</td>
                                    <td>{student.total_classes}</td>
                                    <td>{student.total_present}</td>
                                    <td>{student.total_absent}</td>
                                    <td className={`font-semibold ${getAttendancePercentageColor(student.attendance_percentage)}`}>
                                        {student.attendance_percentage}%
                                    </td>
                                    <td>
                                        <button 
                                            className="btn btn-sm btn-info"
                                            onClick={() => handleDetails(student)}
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* No Results Message */}
            {showResults && attendanceSummary.length === 0 && (
                <div className="alert alert-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>No attendance data found for the selected criteria.</span>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center py-8">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            )}
        </div>
    );
};

export default AttendanceSummary;