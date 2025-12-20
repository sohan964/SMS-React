import React from 'react';
import { Link } from 'react-router';
import { MdSchedule } from 'react-icons/md';
import { FcDepartment } from 'react-icons/fc';
import { GiTeacher } from 'react-icons/gi';
import { PiExam, PiStudent } from 'react-icons/pi';

const AdminHome = () => {
    const adminCards = [
        {
            title: "Manage Routines",
            icon: <MdSchedule className="text-5xl" />,
            description: "Create and manage teacher and class routines",
            links: [
                { name: "Teacher Routine", path: "/admin-dashboard/teacher-routine" },
                { name: "Add Class Routine", path: "/admin-dashboard/create-class-routine" }
            ],
            color: "from-blue-400 to-blue-600",
            hoverColor: "hover:from-blue-500 hover:to-blue-700"
        },
        {
            title: "Manage Departments",
            icon: <FcDepartment className="text-5xl" />,
            description: "Organize and manage academic departments",
            links: [
                { name: "Department List", path: "/admin-dashboard/manage-departments" },
                { name: "Add Department", path: "/admin-dashboard/manage-departments/add-department" }
            ],
            color: "from-purple-400 to-purple-600",
            hoverColor: "hover:from-purple-500 hover:to-purple-700"
        },
        {
            title: "Manage Students",
            icon: <PiStudent className="text-5xl" />,
            description: "Handle student admissions and enrollments",
            links: [
                { name: "Student Register", path: "/admin-dashboard/student-register" },
                { name: "Student Admission", path: "/admin-dashboard/student-admission" },
                { name: "Course Enrollments", path: "/admin-dashboard/student-enrollment" }
            ],
            color: "from-green-400 to-green-600",
            hoverColor: "hover:from-green-500 hover:to-green-700"
        },
        {
            title: "Manage Teachers",
            icon: <GiTeacher className="text-5xl" />,
            description: "Oversee teacher profiles and assignments",
            links: [
                { name: "Manage Teachers", path: "/admin-dashboard/manage-teachers" },
                { name: "Register Teacher", path: "/admin-dashboard/teacher-register" },
                { name: "Create Teacher", path: "/admin-dashboard/create-teacher" }
            ],
            color: "from-orange-400 to-orange-600",
            hoverColor: "hover:from-orange-500 hover:to-orange-700"
        },
        {
            title: "Manage Exams",
            icon: <PiExam className="text-5xl" />,
            description: "Schedule and manage examinations",
            links: [
                { name: "Manage Exams", path: "/admin-dashboard/manage-exams" },
                { name: "Create Exam-Session", path: "/admin-dashboard/create-exam-session" },
                { name: "Schedule Exam", path: "/admin-dashboard/create-exam" }
            ],
            color: "from-red-400 to-red-600",
            hoverColor: "hover:from-red-500 hover:to-red-700"
        }
    ];

    return (
        <div className="p-6 bg-base-200 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-base-content mb-2">Admin Dashboard</h1>
                    <p className="text-base-content/70">Manage your school's administrative tasks efficiently</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {adminCards.map((card, index) => (
                        <div key={index} className={`card bg-gradient-to-br ${card.color} ${card.hoverColor} shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl rounded-2xl overflow-hidden`}>
                            <div className="card-body p-6 text-white">
                                <div className="flex items-center mb-4">
                                    <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                                        {card.icon}
                                    </div>
                                </div>
                                <h2 className="card-title text-2xl font-bold mb-2">{card.title}</h2>
                                <p className="text-white/80 mb-4">{card.description}</p>
                                <div className="mt-auto">
                                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                        <div className="text-sm font-medium mb-2 text-white/90">Quick Actions:</div>
                                        <div className="space-y-1">
                                            {card.links.map((link, linkIndex) => (
                                                <Link
                                                    key={linkIndex}
                                                    to={link.path}
                                                    className="block text-sm text-white/90 hover:text-white hover:bg-white/20 rounded px-2 py-1 transition-colors duration-200"
                                                >
                                                    → {link.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 stats shadow bg-base-100 rounded-2xl overflow-hidden">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div className="stat-title">System Status</div>
                        <div className="stat-value text-primary">Active</div>
                        <div className="stat-desc">All systems operational</div>
                    </div>
                    
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                        </div>
                        <div className="stat-title">Total Users</div>
                        <div className="stat-value text-secondary">425</div>
                        <div className="stat-desc">↗︎ 90 (14%)</div>
                    </div>
                    
                    <div className="stat">
                        <div className="stat-figure">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                        </div>
                        <div className="stat-title">New Registrations</div>
                        <div className="stat-value">32</div>
                        <div className="stat-desc">↗︎ 12 (23%)</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;