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
                { name: "Create Exam-Session", path: "/admin-dashboard/manage-exams/create-exam-session" },
                { name: "Schedule Exam", path: "/admin-dashboard/manage-exams/exam-sessions" }
            ],
            color: "from-red-400 to-red-600",
            hoverColor: "hover:from-red-500 hover:to-red-700"
        }
    ];

    return (
  <div className="space-y-6">

    {/* HEADER */}
    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl p-6 shadow-md">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="text-sm opacity-90">
        Manage your school's administrative tasks efficiently
      </p>
    </div>

    {/* CARDS */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {adminCards.map((card, index) => (
        <div
          key={index}
          className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-md hover:scale-[1.02] transition-all duration-300 flex flex-col"
        >

          {/* ICON */}
          <div className="mb-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow">
              {card.icon}
            </div>
          </div>

          {/* TITLE */}
          <h2 className="text-lg font-semibold text-gray-800">
            {card.title}
          </h2>

          {/* DESCRIPTION */}
          <p className="text-sm text-gray-500 mt-1 mb-4">
            {card.description}
          </p>

          {/* LINKS */}
          <div className="mt-auto space-y-2">
            {card.links.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className="block text-sm px-3 py-2 rounded-lg bg-slate-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
              >
                → {link.name}
              </Link>
            ))}
          </div>

        </div>
      ))}

    </div>

  
  

  </div>
);
};

export default AdminHome;