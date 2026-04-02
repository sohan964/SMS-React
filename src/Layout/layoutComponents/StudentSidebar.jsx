import React, { useContext, useState } from "react";
import { FaAngleDown, FaChalkboardTeacher, FaHome, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router";
import useStudentData from "../../hooks/useStudentData";
import { MdOutlineRoundaboutRight, MdSchedule } from "react-icons/md";
import { AuthContext } from "../../providers/AuthProvider";

const StudentSidebar = () => {
  const [studentData] = useStudentData();
  const { user, logout } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
  };

  const displayName =
    studentData?.fullName ||
    studentData?.name ||
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "Student";

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col shadow-xl">

      {/* TOP */}
      <div className="p-6 text-lg font-bold border-b border-slate-700">
        🎓 Student Panel
      </div>

      {/* NAV */}
      <nav className="flex-1 p-4 space-y-2 text-sm">

        {/* HOME */}
        <Link
          to="/student-dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 transition"
        >
          <FaHome />
          Home
        </Link>

        {/* ROUTINE */}
        <Link
          to="/student-dashboard/student-routine"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 transition"
        >
          <MdSchedule />
          Student Routine
        </Link>

        {/* RESULTS */}
        <div>
          <button
            onClick={() => toggleMenu("results")}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
          >
            <span className="flex items-center gap-3">
              <FaChalkboardTeacher />
              Results
            </span>
            <FaAngleDown className={`${openMenu === "results" ? "rotate-180" : ""} transition`} />
          </button>

          {openMenu === "results" && (
            <div className="ml-6 mt-2 space-y-1">
              <Link
                to="/student-dashboard/student-result"
                className="block px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800"
              >
                View Results
              </Link>
            </div>
          )}
        </div>

        {/* FEES */}
        <div>
          <button
            onClick={() => toggleMenu("fees")}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
          >
            <span className="flex items-center gap-3">
              <FaChalkboardTeacher />
              Tuition & Fees
            </span>
            <FaAngleDown className={`${openMenu === "fees" ? "rotate-180" : ""} transition`} />
          </button>

          {openMenu === "fees" && (
            <div className="ml-6 mt-2 space-y-1">
              <Link
                to="/student-dashboard/student-fees/unpaid-fees"
                className="block px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800"
              >
                View Fees
              </Link>
            </div>
          )}
        </div>

        {/* DIVIDER */}
        <div className="border-t border-slate-700 my-3"></div>

        {/* EXTRA LINKS */}
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
        >
          <FaHome />
          Back to Home
        </Link>

        <Link
          to="/about-us"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
        >
          <MdOutlineRoundaboutRight />
          About Us
        </Link>

      </nav>

      {/* USER CARD */}
      <div className="p-4 border-t border-slate-700">
        <div className="bg-slate-800 rounded-xl p-3 flex items-center gap-3">

          {/* AVATAR */}
          {studentData?.photo || user?.photoURL ? (
            <img
              src={studentData?.photo || user?.photoURL}
              className="w-10 h-10 rounded-full object-cover"
              alt="user"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center font-bold">
              {getInitials(displayName)}
            </div>
          )}

          {/* INFO */}
          <div className="flex-1">
            <p className="text-sm font-semibold">{displayName}</p>
            <p className="text-xs text-slate-400">
              {studentData?.email || user?.email}
            </p>
            <span className="text-xs text-blue-400">Student</span>
          </div>

          {/* LOGOUT */}
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

export default StudentSidebar;