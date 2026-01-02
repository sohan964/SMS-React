// ...existing code...
import React, { useContext } from "react";
import {  FaHome, FaSignOutAlt } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { MdSchedule } from "react-icons/md";

import { Link } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { FcDepartment } from "react-icons/fc";
import { GiTeacher } from "react-icons/gi";
import { PiExam, PiStudent } from "react-icons/pi";

const AdminSidebar = () => {
    const {user, logout} = useContext(AuthContext);

    const getInitials = (name) => {
        if (!name) return "";
        return name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
    };

    const displayName = user?.fullName || user?.name || user?.displayName || user?.email?.split("@")[0] || "Unknown";
    const displayRole = user?.role?.[0] || "No Role";

  return (
    <aside
      role="navigation"
      aria-label="Main sidebar"
      className="w-64 h-screen bg-gradient-to-b from-base-200 to-base-300 border-r border-base-300 shadow-lg flex flex-col"
    >
      {/*
        Make the main nav scrollable (flex-1 + overflow-y-auto).
        The bottom user info stays outside the scrollable area so it remains fixed at the bottom.
      */}
      <nav className="flex-1 overflow-y-auto pr-2 space-y-2 pb-6">
        {/* Home button */}
        <a
          href="/admin-dashboard"
          className="btn btn-ghost btn-block justify-start gap-3 text-base-content hover:bg-primary/10 transition-colors duration-200 rounded-lg"
          aria-label="Home"
        >
          <FaHome className="text-primary" />
          <span className="font-medium">Home</span>
        </a>

        {/* Routine */}
        <div className="dropdown w-full">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-block justify-between hover:bg-primary/10 transition-colors duration-200 rounded-lg"
          >
            <span className="flex items-center gap-3">
              <MdSchedule className="text-primary" />
              <span className="font-medium">Manage Routines</span>
            </span>
            <FaAngleDown className="text-primary/70" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-56 z-20"
          >
            <li>
              <Link to="/admin-dashboard/teacher-routine" className="flex justify-between items-center hover:bg-primary/10 rounded-md px-2 py-1">
                Teacher Routine
              </Link>
            </li>
            <li>
              <Link to="/admin-dashboard/create-class-routine" className="flex justify-between items-center hover:bg-primary/10 rounded-md px-2 py-1">
                Add Class Routine
              </Link>
            </li>
          </ul>
        </div>


        {/* departments */}
        <div className="dropdown w-full">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-block justify-between hover:bg-primary/10 transition-colors duration-200 rounded-lg"
          >
            <span className="flex items-center gap-3">
              <FcDepartment />
              <span className="font-medium">Manage Departments</span>
            </span>
            <FaAngleDown className="text-primary/70" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-56 z-20"
          >
            <li>
              <Link to="/admin-dashboard/manage-departments" className="flex justify-between items-center hover:bg-primary/10 rounded-md px-2 py-1">
                Department List
              </Link>
            </li>
            <li>
              <Link to="/admin-dashboard/manage-departments/add-department" className="flex justify-between items-center hover:bg-primary/10 rounded-md px-2 py-1">
                Add Department
              </Link>
            </li>
            
          </ul>
        </div>

        {/* Students */}
        <div className="dropdown w-full">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-block justify-between hover:bg-primary/10 transition-colors duration-200 rounded-lg"
          >
            <span className="flex items-center gap-3">
              <PiStudent className="text-primary" />
              <span className="font-medium">Manage Students</span>
            </span>
            <FaAngleDown className="text-primary/70" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-56 z-20"
          >
            <li>
              <Link to="/admin-dashboard/student-register" className="flex justify-between items-center hover:bg-primary/10 rounded-md px-2 py-1">
                Student Register
              </Link>
            </li>
            <li>
              <Link to="/admin-dashboard/student-admission" className="flex justify-between items-center hover:bg-primary/10 rounded-md px-2 py-1">
                Student Admission
              </Link>
            </li>

            <li>
              <Link to="/admin-dashboard/student-enrollment" className="flex justify-between items-center hover:bg-primary/10 rounded-md px-2 py-1">
                  Course Enrollments
              </Link>
            </li>
            
          </ul>
        </div>

        {/* Teachers */}
        <div className="dropdown w-full">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-block justify-between hover:bg-primary/10 transition-colors duration-200 rounded-lg"
          >
            <span className="flex items-center gap-3">
              <GiTeacher className="text-primary" />
              <span className="font-medium">Manage Teachers</span>
            </span>
            <FaAngleDown className="text-primary/70" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-56 z-20"
          >
            <li>
              <Link to="/admin-dashboard/manage-teachers" className="flex justify-between items-center hover:bg-primary/10 rounded-md px-2 py-1">
                Manage Teachers
              </Link>
            </li>
            <li>
              <Link to="/admin-dashboard/teacher-register" className="flex justify-between items-center hover:bg-primary/10 rounded-md px-2 py-1">
                Register Teacher
              </Link>
            </li>
            <li>
              <Link to="/admin-dashboard/create-teacher" className="flex justify-between items-center hover:bg-primary/10 rounded-md px-2 py-1">
                Create Teacher
              </Link>
            </li>
          </ul>
        </div>

        {/* Exams */}
        <div className="dropdown w-full">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-block justify-between hover:bg-primary/10 transition-colors duration-200 rounded-lg"
          >
            <span className="flex items-center gap-3">
              <PiExam className="text-primary" />
              <span className="font-medium">Manage Exams</span>
            </span>
            <FaAngleDown className="text-primary/70" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-56 z-20"
          >
            <li>
              <Link to="/admin-dashboard/manage-exams" className="flex justify-between items-center hover:bg-primary/10 rounded-md px-2 py-1">
                Manage Exams
              </Link>
            </li>
            <li>
              <Link to="/admin-dashboard/manage-exams/create-exam-session" className="flex justify-between items-center hover:bg-primary/10 rounded-md px-2 py-1">
                Create Exam-Session
              </Link>
            </li>
            <li>
              <Link to="/admin-dashboard/manage-exams/exam-sessions" className="flex justify-between items-center hover:bg-primary/10 rounded-md px-2 py-1">
                Exam Schedule
              </Link>
            </li>
          </ul>
        </div>
        {/* Add other navigation items here */}

        <div className="dropdown w-full">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-block justify-between hover:bg-primary/10 transition-colors duration-200 rounded-lg"
          >
            <span className="flex items-center gap-3">
              <GiTeacher className="text-primary" />
              <span className="font-medium">Manage Subjects</span>
            </span>
            <FaAngleDown className="text-primary/70" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-56 z-20"
          >
            <li>
              <Link to="/admin-dashboard/manage-subjects" className="flex justify-between items-center hover:bg-primary/10 rounded-md px-2 py-1">
                Manage Subjects
              </Link>
            </li>
            <li>
              <Link to="/admin-dashboard/manage-subjects/add-subject" className="flex justify-between items-center hover:bg-primary/10 rounded-md px-2 py-1">
                Add Subject
              </Link>
            </li>
            
          </ul>
        </div>

        <div className="dropdown w-full">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-block justify-between hover:bg-primary/10 transition-colors duration-200 rounded-lg"
          >
            <span className="flex items-center gap-3">
              <GiTeacher className="text-primary" />
              <span className="font-medium">Manage Classes</span>
            </span>
            <FaAngleDown className="text-primary/70" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-56 z-20"
          >
            <li>
              <Link to="/admin-dashboard/manage-classes" className="flex justify-between items-center hover:bg-primary/10 rounded-md px-2 py-1">
                Manage Classes
              </Link>
            </li>
            <li>
              <Link to="/admin-dashboard/manage-classes/add-class-subjects" className="flex justify-between items-center hover:bg-primary/10 rounded-md px-2 py-1">
                Add Subjects to Class
              </Link>
            </li>
            
          </ul>
        </div>

        <div className="dropdown w-full">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-block justify-between hover:bg-primary/10 transition-colors duration-200 rounded-lg"
          >
            <span className="flex items-center gap-3">
              <GiTeacher className="text-primary" />
              <span className="font-medium">Manage Notices</span>
            </span>
            <FaAngleDown className="text-primary/70" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-56 z-20"
          >
            <li>
              <Link to="/admin-dashboard/notices" className="flex justify-between items-center hover:bg-primary/10 rounded-md px-2 py-1">
                Notices
              </Link>
            </li>
            <li>
              <Link to="/admin-dashboard/notices/add-notices" className="flex justify-between items-center hover:bg-primary/10 rounded-md px-2 py-1">
                Create Notices
              </Link>
            </li>
            
          </ul>
        </div>
      </nav>

      {/* User info at the bottom (fixed) */}
      <div
        className="sticky bottom-0 bg-gradient-to-r from-base-200 to-base-300 pt-4 border-t border-base-300 flex-none z-10 shadow-inner"
      >
        <div className="flex items-center gap-3 p-2 rounded-lg bg-base-100/50 backdrop-blur-sm">
          <div className="avatar ring-2 ring-primary/20">
            {user?.photoURL || user?.avatar || user?.photo ? (
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={user?.photoURL || user?.avatar || user?.photo}
                  alt={`${displayName} profile`}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center text-lg font-bold shadow-md">
                {getInitials(displayName)}
              </div>
            )}
          </div>
          <div className="text-sm flex-1">
            <div className="font-semibold text-base-content">{displayName}</div>
            <div className="text-xs opacity-80 truncate">{user?.email || 'No email'}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="badge badge-primary badge-xs text-white">{displayRole}</span>
            </div>
          </div>
          <button
            onClick={logout}
            className="btn btn-sm btn-circle btn-ghost hover:bg-error/20 hover:text-error transition-all duration-200 group"
            aria-label="Logout"
            title="Logout"
          >
            <FaSignOutAlt className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
// ...existing code...