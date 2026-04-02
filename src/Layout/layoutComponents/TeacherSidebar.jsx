import React, { useContext, useState } from "react";
import {
  FaHome,
  FaSignOutAlt,
  FaUser,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, NavLink } from "react-router";
import useTeacherData from "../../hooks/useTeacherData";
import { MdOutlineRoundaboutRight } from "react-icons/md";
import { RiNotificationLine } from "react-icons/ri";
import { ChevronDown } from "lucide-react";

const TeacherSidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const [teacherData] = useTeacherData(user?.email);

  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col shadow-xl">

      {/* TOP */}
      <div className="p-6 text-lg font-bold border-b border-slate-700">
        🎓 Teacher Panel
      </div>

      {/* NAV */}
      <nav className="flex-1 p-4 space-y-2 text-sm">

        {/* Home */}
        <NavLink
          to="/teacher-dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
            ${isActive
              ? "bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md"
              : "text-slate-300 hover:bg-slate-800"
            }`
          }
        >
          <FaHome />
          Teacher Home
        </NavLink>

        {/* Attendance */}
        <div>
          <button
            onClick={() => toggleMenu("attendance")}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-300"
          >
            <span className="flex items-center gap-3">
              <FaChalkboardTeacher />
              Manage Attendance
            </span>
            <ChevronDown
              size={16}
              className={`transition ${openMenu === "attendance" ? "rotate-180" : ""}`}
            />
          </button>

          {openMenu === "attendance" && (
            <div className="ml-6 mt-2 space-y-1">
              <NavLink
                to="/teacher-dashboard/manage-attendances"
                className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400"
              >
                Manage Attendances
              </NavLink>
              <NavLink
                to="/teacher-dashboard/manage-attendances/take-attendance"
                className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400"
              >
                Take Attendance
              </NavLink>
              <NavLink
                to="/teacher-dashboard/manage-attendances/attendance-summary"
                className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400"
              >
                Attendance Summary
              </NavLink>
            </div>
          )}
        </div>

        {/* Results */}
        <div>
          <button
            onClick={() => toggleMenu("results")}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-300"
          >
            <span className="flex items-center gap-3">
              <FaChalkboardTeacher />
              Manage Result
            </span>
            <ChevronDown
              size={16}
              className={`transition ${openMenu === "results" ? "rotate-180" : ""}`}
            />
          </button>

          {openMenu === "results" && (
            <div className="ml-6 mt-2 space-y-1">
              <NavLink
                to="/teacher-dashboard/manage-results/add-results"
                className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400"
              >
                Submit Result
              </NavLink>
              <NavLink
                to="/teacher-dashboard/manage-results/result-list"
                className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400"
              >
                Student Results
              </NavLink>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-3"></div>

        {/* Other Links */}
        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-300"
        >
          <FaHome />
          Back to Home
        </NavLink>

        <NavLink
          to="/about-us"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-300"
        >
          <MdOutlineRoundaboutRight />
          About Us
        </NavLink>

        <NavLink
          to="/notices"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-300"
        >
          <RiNotificationLine />
          Notices
        </NavLink>
      </nav>

      {/* USER CARD */}
      <div className="p-4 border-t border-slate-700">
        <div className="bg-slate-800 rounded-xl p-3 flex items-center gap-3">

          {/* Avatar */}
          {teacherData?.photo ? (
            <img
              src={teacherData.photo}
              className="w-10 h-10 rounded-full object-cover"
              alt="user"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center font-bold">
              {user?.name ? user.name.charAt(0).toUpperCase() : <FaUser />}
            </div>
          )}

          {/* Info */}
          <div className="flex-1">
            <p className="text-sm font-semibold">
              {teacherData
                ? `${teacherData.first_name} ${teacherData.last_name}`
                : user?.fullName || "User"}
            </p>
            <p className="text-xs text-slate-400">
              {user?.email}
            </p>
          </div>

          {/* Logout */}
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

export default TeacherSidebar;