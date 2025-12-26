import React from 'react';
import { Link } from 'react-router';
import { FiPlus, FiFileText} from 'react-icons/fi';

const ManageExams = () => {
    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-2 text-center">Manage Exams</h2>
            <p className="text-lg text-gray-600 text-center mb-8 max-w-3xl mx-auto">
                Select an option below to manage exam-related activities
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <Link
                    to="/admin-dashboard/manage-exams/create-exam-session"
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 p-6 text-white text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                    <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
                    <div className="relative z-10">
                        
                        <div className="bg-red bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FiPlus size={32} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Create Exam Session</h3>
                        <p className="text-sm opacity-90">Set up a new exam session with schedules and details</p>
                    </div>
                </Link>
                
                <Link
                    to="/admin-dashboard/manage-exams/exam-sessions"
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-pink-500 to-red-500 p-6 text-white text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                    <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
                    <div className="relative z-10">
                        <div className="bg-red bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiFileText size={32} />
                           
                        </div>
                        <h3 className="text-xl font-semibold mb-2">View Exam Sessions</h3>
                        <p className="text-sm opacity-90">Browse and manage existing exam sessions</p>
                    </div>
                </Link>
                
                {/* <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-6 text-white text-center transition-all duration-300 opacity-70 cursor-not-allowed">
                    <div className="relative z-10">
                        <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiAward size={32} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Exam Results</h3>
                        <p className="text-sm opacity-90">Manage exam results and grades</p>
                        <span className="absolute top-2 right-2 bg-white bg-opacity-30 text-xs font-semibold px-2 py-1 rounded">Coming Soon</span>
                    </div>
                </div>
                
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500 to-teal-400 p-6 text-white text-center transition-all duration-300 opacity-70 cursor-not-allowed">
                    <div className="relative z-10">
                        <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiBarChart2 size={32} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Exam Reports</h3>
                        <p className="text-sm opacity-90">Generate comprehensive exam reports</p>
                        <span className="absolute top-2 right-2 bg-white bg-opacity-30 text-xs font-semibold px-2 py-1 rounded">Coming Soon</span>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default ManageExams;