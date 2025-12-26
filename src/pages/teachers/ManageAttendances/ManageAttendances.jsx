import React from 'react';
import { useNavigate } from 'react-router';
import { FaUserCheck, FaChartBar } from 'react-icons/fa';

const ManageAttendances = () => {
    const navigate = useNavigate();

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Manage Attendances</h1>
            
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Take Attendance Button */}
                    <div
                        className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                        onClick={() => navigate('/teacher-dashboard/manage-attendances/take-attendance')}
                    >
                        <div className="flex flex-col items-center text-white">
                            <div className="bg-white/20 p-4 rounded-full mb-4">
                                <FaUserCheck className="text-4xl" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Take Attendance</h2>
                            <p className="text-center text-blue-100">Record daily attendance for your classes</p>
                        </div>
                    </div>
                    
                    {/* Attendance Summary Button */}
                    <div
                        className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                        onClick={() => navigate('/teacher-dashboard/manage-attendances/attendance-summary')}
                    >
                        <div className="flex flex-col items-center text-white">
                            <div className="bg-white/20 p-4 rounded-full mb-4">
                                <FaChartBar className="text-4xl" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Attendance Summary</h2>
                            <p className="text-center text-purple-100">View attendance reports and statistics</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageAttendances;