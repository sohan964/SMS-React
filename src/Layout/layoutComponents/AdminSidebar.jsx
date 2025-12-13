// ...existing code...
import React, { useContext } from "react";
import {  FaHome } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { MdSchedule } from "react-icons/md";

import { Link } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { FcDepartment } from "react-icons/fc";
import { GiTeacher } from "react-icons/gi";
import { PiExam, PiStudent } from "react-icons/pi";

const AdminSidebar = () => {
    const {user} = useContext(AuthContext);

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
      // change min-h-screen -> h-screen and keep column layout so the bottom area stays fixed
      className="w-64  h-screen bg-base-200 border-r p-4 flex flex-col"
    >
      {/*
        Make the main nav scrollable (flex-1 + overflow-y-auto).
        The bottom user info stays outside the scrollable area so it remains fixed at the bottom.
      */}
      <nav className="flex-1 overflow-y-auto pr-2 space-y-3 pb-6">
        {/* Home button */}
        <a
          href="/"
          className="btn btn-ghost btn-block justify-start gap-3 text-base-content"
          aria-label="Home"
        >
          <FaHome />
          <span>Home</span>
        </a>

        {/* Routine */}
        <div className="dropdown w-full">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-block justify-between"
          >
            <span className="flex items-center gap-3">
              <MdSchedule />
              <span>Manage Routines</span>
            </span>
            <FaAngleDown />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-56"
          >
            <li>
              <Link to="/admin-dashboard/teacher-routine" className="flex justify-between items-center">
                teacher Routine
              </Link>
            </li>
            <li>
              <Link to="/admin-dashboard/create-class-routine" className="flex justify-between items-center">
                Add Class Routine
              </Link>
            </li>
          </ul>
        </div>


        {/* departments */}
        <div className="dropdown w-full">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-block justify-between"
          >
            <span className="flex items-center gap-3">
              <FcDepartment />
              <span>ManageDepartments</span>
            </span>
            <FaAngleDown />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-56"
          >
            <li>
              <Link to="/admin-dashboard/manage-departments" className="flex justify-between items-center">
                Department List
              </Link>
            </li>
            <li>
              <Link to="/admin-dashboard/manage-departments/add-department" className="flex justify-between items-center">
                Add Department
              </Link>
            </li>
            
          </ul>
        </div>

        {/* admission */}
        
        <div className="dropdown w-full">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-block justify-between"
          >
            <span className="flex items-center gap-3">
              <PiStudent></PiStudent>
              <span>Manage Students</span>
            </span>
            <FaAngleDown />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-56"
          >
            <li>
              <Link to="/admin-dashboard/student-register" className="flex justify-between items-center">
                Student Register
              </Link>
            </li>
            <li>
              <Link to="/admin-dashboard/student-admission" className="flex justify-between items-center">
                Student Admission
              </Link>
            </li>

            <li>
              <Link to="/admin-dashboard/student-enrollment" className="flex justify-between items-center">
                  Course Enrollments
              </Link>
            </li>
            
          </ul>
        </div>

        {/* Teacher */}
        <div className="dropdown w-full">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-block justify-between"
          >
            <span className="flex items-center gap-3">
              <GiTeacher />
              <span>Manage Teachers</span>
            </span>
            <FaAngleDown />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-56"
          >
            <li>
              <Link to="/admin-dashboard/manage-teachers" className="flex justify-between items-center">
                Manage Teachers
              </Link>
            </li>
            <li>
              <Link to="/admin-dashboard/teacher-register" className="flex justify-between items-center">
                Register Teacher
              </Link>
            </li>
            <li>
              <Link to="/admin-dashboard/create-teacher" className="flex justify-between items-center">
                Create Teacher
              </Link>
            </li>
          </ul>
        </div>

        <div className="dropdown w-full">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-block justify-between"
          >
            <span className="flex items-center gap-3">
              <PiExam />
              <span>Manage Exams</span>
            </span>
            <FaAngleDown />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-56"
          >
            <li>
              <Link to="/admin-dashboard/manage-exams" className="flex justify-between items-center">
                Manage Exams
              </Link>
            </li>
            <li>
              <Link to="/admin-dashboard/create-exam-session" className="flex justify-between items-center">
                Create Exam-Session
              </Link>
            </li>
            <li>
              <Link to="/admin-dashboard/create-teacher" className="flex justify-between items-center">
                Schedule Exam
              </Link>
            </li>
          </ul>
        </div>
        {/* Add other navigation items here */}
      </nav>

      {/* User info at the bottom (fixed) */}
      <div
        className="sticky bottom-0 bg-base-200 pt-4 border-t flex-none z-10"
        // keep user info visually above the nav scrollbar when scrolling
      >
        <div className="flex items-center gap-3">
          <div className="avatar">
            {user?.photoURL || user?.avatar || user?.photo ? (
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={user?.photoURL || user?.avatar || user?.photo}
                  alt={`${displayName} profile`}
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg">
                {getInitials(displayName)}
              </div>
            )}
          </div>
          <div className="text-sm">
            <div className="font-medium">{displayName}</div>
            <div className="text-xs opacity-80">{user?.email || 'No email'}</div>
            <div className="text-xs opacity-70 inline-flex items-center gap-1 mt-1">
              <span className="badge badge-ghost text-xs">{displayRole}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
// ...existing code...