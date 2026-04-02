import React, { useContext, useState } from "react";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { MdPayment, MdSchedule, MdSubject } from "react-icons/md";
import { Link } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { FcDepartment } from "react-icons/fc";
import { GiTeacher } from "react-icons/gi";
import { PiExam, PiNotification, PiStudent } from "react-icons/pi";

const AdminSidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  };

  const displayName =
    user?.fullName ||
    user?.name ||
    user?.email?.split("@")[0] ||
    "Admin";

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col shadow-xl">

      {/* TOP */}
      <div className="p-6 text-lg font-bold border-b border-slate-700">
        ⚙️ Admin Panel
      </div>

      {/* NAV */}
      <nav className="flex-1 p-4 space-y-2 text-sm overflow-y-auto">

        {/* HOME */}
        <Link
          to="/admin-dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 transition"
        >
          <FaHome />
          Dashboard
        </Link>

        {/* ROUTINE */}
        <div>
          <button
            onClick={() => toggleMenu("routine")}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
          >
            <span className="flex items-center gap-3">
              <MdSchedule />
              Manage Routines
            </span>
            <FaAngleDown className={`${openMenu === "routine" ? "rotate-180" : ""} transition`} />
          </button>

          {openMenu === "routine" && (
            <div className="ml-6 mt-2 space-y-1">
              <Link to="/admin-dashboard/teacher-routine" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400">
                Teacher Routine
              </Link>
              <Link to="/admin-dashboard/create-class-routine" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400">
                Add Class Routine
              </Link>
            </div>
          )}
        </div>

        {/* DEPARTMENTS */}
        <div>
          <button
            onClick={() => toggleMenu("dept")}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
          >
            <span className="flex items-center gap-3">
              <FcDepartment />
              Departments
            </span>
            <FaAngleDown className={`${openMenu === "dept" ? "rotate-180" : ""} transition`} />
          </button>

          {openMenu === "dept" && (
            <div className="ml-6 mt-2 space-y-1">
              <Link to="/admin-dashboard/manage-departments" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400">
                Department List
              </Link>
              <Link to="/admin-dashboard/manage-departments/add-department" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400">
                Add Department
              </Link>
            </div>
          )}
        </div>

        {/* add subjects */}
        <div>
          <button
            onClick={() => toggleMenu("subject")}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
          >
            <span className="flex items-center gap-3">
              <MdSubject />
              Subject
            </span>
            <FaAngleDown className={`${openMenu === "subject" ? "rotate-180" : ""} transition`} />
          </button>

          {openMenu === "subject" && (
            <div className="ml-6 mt-2 space-y-1">
              <Link to="/admin-dashboard/manage-subjects" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400">
                Subject List
              </Link>
              <Link to="/admin-dashboard/manage-subjects/add-subject" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400">
                Add Subject
              </Link>
            </div>
          )}
        </div>

        {/* add classes */}
        <div>
          <button
            onClick={() => toggleMenu("class")}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
          >
            <span className="flex items-center gap-3">
              <MdSubject />
              Manage Class
            </span>
            <FaAngleDown className={`${openMenu === "class" ? "rotate-180" : ""} transition`} />
          </button>

          {openMenu === "class" && (
            <div className="ml-6 mt-2 space-y-1">
              <Link to="/admin-dashboard/manage-classes" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400">
                Class List
              </Link>
              <Link to="/admin-dashboard/manage-classes/add-class-subjects" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400">
                Add Class subjects
              </Link>
            </div>
          )}
        </div>

        {/* STUDENTS */}
        <div>
          <button
            onClick={() => toggleMenu("students")}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
          >
            <span className="flex items-center gap-3">
              <PiStudent />
              Students
            </span>
            <FaAngleDown className={`${openMenu === "students" ? "rotate-180" : ""} transition`} />
          </button>

          {openMenu === "students" && (
            <div className="ml-6 mt-2 space-y-1">
              <Link to="/admin-dashboard/student-register" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400">
                Register
              </Link>
              <Link to="/admin-dashboard/student-admission" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400">
                Admission
              </Link>
              <Link to="/admin-dashboard/student-enrollment" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400">
                Enrollments
              </Link>
            </div>
          )}
        </div>

        {/* TEACHERS */}
        <div>
          <button
            onClick={() => toggleMenu("teachers")}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
          >
            <span className="flex items-center gap-3">
              <GiTeacher />
              Teachers
            </span>
            <FaAngleDown className={`${openMenu === "teachers" ? "rotate-180" : ""} transition`} />
          </button>

          {openMenu === "teachers" && (
            <div className="ml-6 mt-2 space-y-1">
              <Link to="/admin-dashboard/manage-teachers" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400">
                Manage Teachers
              </Link>
              <Link to="/admin-dashboard/teacher-register" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400">
                Register Teacher
              </Link>
            </div>
          )}
        </div>

        {/* EXAMS */}
        <div>
          <button
            onClick={() => toggleMenu("exams")}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
          >
            <span className="flex items-center gap-3">
              <PiExam />
              Exams
            </span>
            <FaAngleDown className={`${openMenu === "exams" ? "rotate-180" : ""} transition`} />
          </button>

          {openMenu === "exams" && (
            <div className="ml-6 mt-2 space-y-1">
              <Link to="/admin-dashboard/manage-exams" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400">
                Manage Exams
              </Link>
            </div>
          )}
        </div>
        

        {/* FEES */}
        <Link
          to="/admin-dashboard/manage-fees/pending-payments"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
        >
          <MdPayment />
          Fees
        </Link>

        <div>
          <button
            onClick={() => toggleMenu("fees")}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
          >
            <span className="flex items-center gap-3">
              <PiNotification />
              Fees
            </span>
            <FaAngleDown className={`${openMenu === "fees" ? "rotate-180" : ""} transition`} />
          </button>

          {openMenu === "fees" && (
            <div className="ml-6 mt-2 space-y-1">
              <Link to="/admin-dashboard/manage-fees/pending-payments" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400">
                Pending Payments
              </Link>
              <Link to="/admin-dashboard/manage-fees/generate-monthly-fees" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400">
                Add Notice
              </Link>
            </div>
          )}
        </div>

        {/* notice */}
        <div>
          <button
            onClick={() => toggleMenu("notice")}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
          >
            <span className="flex items-center gap-3">
              <PiNotification />
              notice
            </span>
            <FaAngleDown className={`${openMenu === "notice" ? "rotate-180" : ""} transition`} />
          </button>

          {openMenu === "notice" && (
            <div className="ml-6 mt-2 space-y-1">
              <Link to="/admin-dashboard/notices" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400">
                See Notice
              </Link>
              <Link to="/admin-dashboard/notices/add-notices" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400">
                Add Notice
              </Link>
            </div>
          )}
        </div>

      </nav>

      {/* USER */}
      <div className="p-4 border-t border-slate-700">
        <div className="bg-slate-800 rounded-xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center font-bold">
            {getInitials(displayName)}
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold">{displayName}</p>
            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>

          <button
            onClick={logout}
            className="p-2 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;