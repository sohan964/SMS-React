import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const AttendanceDetails = () => {
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();
    
    const [attendanceData, setAttendanceData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);
    
    // Get parameters from location state
    const { enrollment_id, year_id, subject_id } = location.state || {};

    useEffect(() => {
        if (enrollment_id && year_id && subject_id) {
            fetchAttendanceDetails();
        } else {
            toast.error('Missing required parameters');
            navigate('/teacher-dashboard/manage-attendances/attendance-summary');
        }
    }, [enrollment_id, year_id, subject_id]);

    const fetchAttendanceDetails = async () => {
        try {
            setLoading(true);
            const response = await axiosSecure.get(
                `/Attendances/attendance-details?enrollment_id=${enrollment_id}&year_id=${year_id}&subject_id=${subject_id}`
            );
            
            if (response.data.success) {
                setAttendanceData(response.data.data);
            } else {
                toast.error('Failed to fetch attendance details');
            }
        } catch (error) {
            console.error('Error fetching attendance details:', error);
            toast.error('Failed to fetch attendance details');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (recordId, newStatus) => {
        try {
            setUpdatingId(recordId);
            const response = await axiosSecure.put(
                `/Attendances/update-attendance/${recordId}/${newStatus}`
            );
            
            if (response.data.success) {
                toast.success('Attendance updated successfully');
                // Refresh the data
                fetchAttendanceDetails();
            } else {
                toast.error('Failed to update attendance');
            }
        } catch (error) {
            console.error('Error updating attendance:', error);
            toast.error('Failed to update attendance');
        } finally {
            setUpdatingId(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Present':
                return 'text-green-600 bg-green-100';
            case 'Absent':
                return 'text-red-600 bg-red-100';
            case 'Late':
                return 'text-yellow-600 bg-yellow-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    if (loading) {
        return (
            <div className="p-6">
                <div className="flex justify-center items-center py-8">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            </div>
        );
    }

    if (!attendanceData) {
        return (
            <div className="p-6">
                <div className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>No attendance data found</span>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <button 
                    className="btn btn-sm btn-outline mb-4"
                    onClick={() => navigate('/teacher-dashboard/manage-attendances/attendance-summary')}
                >
                    ← Back to Summary
                </button>
                <h2 className="text-2xl font-bold">Attendance Details</h2>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800">
                        Student: {attendanceData.student_name}
                    </h3>
                    <p className="text-blue-600">
                        Subject ID: {attendanceData.subject_id} | Class ID: {attendanceData.class_id} | Section ID: {attendanceData.section_id}
                    </p>
                </div>
            </div>

            {/* Attendance Table */}
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Session Date</th>
                            <th>Session ID</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.studentSubjectAttendances.map((attendance) => (
                            <tr key={attendance.record_id}>
                                <td>{attendance.session_date}</td>
                                <td>{attendance.session_id}</td>
                                <td>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(attendance.status)}`}>
                                        {attendance.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <select 
                                            className="select select-bordered select-sm"
                                            defaultValue={attendance.status}
                                            onChange={(e) => {
                                                if (e.target.value !== attendance.status) {
                                                    handleStatusUpdate(attendance.record_id, e.target.value);
                                                }
                                            }}
                                            disabled={updatingId === attendance.record_id}
                                        >
                                            <option value="Present">Present</option>
                                            <option value="Absent">Absent</option>
                                            <option value="Late">Late</option>
                                        </select>
                                        {updatingId === attendance.record_id && (
                                            <span className="loading loading-spinner loading-sm"></span>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {attendanceData.studentSubjectAttendances.length === 0 && (
                <div className="alert alert-info mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>No attendance records found for this student.</span>
                </div>
            )}
        </div>
    );
};

export default AttendanceDetails;