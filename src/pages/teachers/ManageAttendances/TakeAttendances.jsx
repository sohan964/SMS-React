import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import useTeacher from '../../../hooks/useTeacher';
import useAcademicYear from '../../../hooks/useAcademicYear';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const TakeAttendances = () => {
    const { user } = useContext(AuthContext);
    const [teachers] = useTeacher();
    const [years] = useAcademicYear();
    const axiosSecure = useAxiosSecure();

    // State management
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedRoutine, setSelectedRoutine] = useState('');
    const [attendanceDate, setAttendanceDate] = useState('');
    const [teacherRoutines, setTeacherRoutines] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentTeacher, setCurrentTeacher] = useState(null);

    // Find current teacher based on user ID
    useEffect(() => {
        if (user && teachers.length > 0) {
            const teacher = teachers.find(t => t.user_id === user.id);
            setCurrentTeacher(teacher);
        }
    }, [user, teachers]);

    // Fetch teacher routine when year is selected
    useEffect(() => {
        if (currentTeacher && selectedYear) {
            fetchTeacherRoutine();
        }
    }, [currentTeacher, selectedYear]);

    const fetchTeacherRoutine = async () => {
        try {
            setLoading(true);
            const response = await axiosSecure.get(`/ClassRoutines/teacher-routine/${currentTeacher.teacher_id}/${selectedYear}`);
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

    const fetchEnrollments = async () => {
        if (!selectedRoutine || !attendanceDate) {
            toast.error('Please select routine and date');
            return;
        }

        try {
            setLoading(true);
            const routine = teacherRoutines.find(r => r.routine_id === parseInt(selectedRoutine));
            
            const response = await axiosSecure.get(
                `/Enrollments/get-enrollments?year_id=${selectedYear}&class_id=${routine.class_id}&section_id=${routine.section_id}&status=Active`
            );
            
            if (response.data.success) {
                setEnrollments(response.data.data);
                // Initialize attendance data with default "Present" status
                const initialAttendance = response.data.data.map(enrollment => ({
                    enrollment_id: enrollment.enrollment_id,
                    status: 'Present'
                }));
                setAttendanceData(initialAttendance);
            }
        } catch (error) {
            console.error('Error fetching enrollments:', error);
            toast.error('Failed to fetch enrollments');
        } finally {
            setLoading(false);
        }
    };

    const handleAttendanceStatusChange = (enrollmentId, status) => {
        setAttendanceData(prev => 
            prev.map(item => 
                item.enrollment_id === enrollmentId 
                    ? { ...item, status }
                    : item
            )
        );
    };

    const handleSubmitAttendance = async () => {
        if (!selectedRoutine || !attendanceDate) {
            toast.error('Please select routine and date');
            return;
        }

        try {
            setLoading(true);
            const payload = {
                routine_id: parseInt(selectedRoutine),
                session_date: attendanceDate,
                attendanceInputs: attendanceData
            };

            const response = await axiosSecure.post('/Attendances/take-attendance', payload);
            console.log(response);
            if (response.data.success) {
                toast.success(response.data.message);
                // Reset form
                setSelectedRoutine('');
                setAttendanceDate('');
                setEnrollments([]);
                setAttendanceData([]);
            }
        } catch (error) {
            console.error('Error submitting attendance:', error);
            toast.error(error?.response?.data?.message || 'Failed to submit attendance');
        } finally {
            setLoading(false);
        }
    };

    const formatRoutineDisplay = (routine) => {
        return `${routine.day_name}-${routine.start_time}-${routine.subject_name}-${routine.class_name}-${routine.section_name}`;
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Take Attendance</h2>
            
            {/* Year Selection */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Select Academic Year</label>
                <select 
                    className="select select-bordered w-full max-w-xs"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
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
                    <label className="block text-sm font-medium mb-2">Select Routine</label>
                    <select 
                        className="select select-bordered w-full max-w-xs"
                        value={selectedRoutine}
                        onChange={(e) => setSelectedRoutine(e.target.value)}
                    >
                        <option value="">Select Routine</option>
                        {teacherRoutines.map(routine => (
                            <option key={routine.routine_id} value={routine.routine_id}>
                                {formatRoutineDisplay(routine)}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Date Selection */}
            {selectedRoutine && (
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Select Date</label>
                    <input 
                        type="date" 
                        className="input input-bordered w-full max-w-xs"
                        value={attendanceDate}
                        onChange={(e) => setAttendanceDate(e.target.value)}
                    />
                </div>
            )}

            {/* Get Students Button */}
            {selectedRoutine && attendanceDate && (
                <div className="mb-6">
                    <button 
                        className="btn btn-primary"
                        onClick={fetchEnrollments}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Get Students'}
                    </button>
                </div>
            )}

            {/* Attendance Table */}
            {enrollments.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Student Number</th>
                                <th>Student Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enrollments.map((enrollment) => (
                                <tr key={enrollment.enrollment_id}>
                                    <td>{enrollment.student_number}</td>
                                    <td>{enrollment.student_name}</td>
                                    <td>
                                        <select 
                                            className="select select-bordered select-sm"
                                            value={attendanceData.find(item => item.enrollment_id === enrollment.enrollment_id)?.status || 'Present'}
                                            onChange={(e) => handleAttendanceStatusChange(enrollment.enrollment_id, e.target.value)}
                                        >
                                            <option value="Present">Present</option>
                                            <option value="Absent">Absent</option>
                                            <option value="Late">Late</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {/* Submit Attendance Button */}
                    <div className="mt-6">
                        <button 
                            className="btn btn-success"
                            onClick={handleSubmitAttendance}
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit Attendance'}
                        </button>
                    </div>
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

export default TakeAttendances;