import React, { useContext } from "react";
import {
  FaAngleDown,
  FaChalkboardTeacher,
  FaHome,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router";
import useTeacherData from "../../hooks/useTeacherData";
import { MdOutlineRoundaboutRight } from "react-icons/md";

const TeacherSidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const [teacherData] = useTeacherData(user?.email);
  return (
    <aside
      role="navigation"
      aria-label="Teacher sidebar"
      className="w-64 min-h-screen bg-base-200 border-r p-4 relative"
    >
      <nav className="space-y-3">
        {/* Home button */}
        <a
          href="/teacher-dashboard"
          className="btn btn-ghost btn-block justify-start gap-3 text-base-content"
          aria-label="Home"
        >
          <FaHome></FaHome>
          <span>Teacher Home</span>
        </a>

        {/* Attendance dropdown */}
        <div className="dropdown w-full">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-block justify-between"
          >
            <span className="flex items-center gap-3">
              <FaChalkboardTeacher />
              <span>Manage Attendance</span>
            </span>
            <FaAngleDown />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-56"
          >
            {/* Replace <a href> with <Link to> if using react-router-dom */}
            <li>
              <Link
                to="/teacher-dashboard/manage-attendances"
                className="flex justify-between items-center"
              >
                Manage Attendances
              </Link>
            </li>
            {/* Placeholder for more teacher items */}
            <li>
              <Link to="/teacher-dashboard/manage-attendances/take-attendance" className="flex justify-between items-center">
                Take Attendance
              </Link>
            </li>
            <li>
              <Link to="/teacher-dashboard/manage-attendances/attendance-summary" className="flex justify-between items-center">
                Attendance Summary
              </Link>
            </li>
            {/* Add more teacher options as needed */}
          </ul>
        </div>



        <div className="dropdown w-full">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-block justify-between"
          >
            <span className="flex items-center gap-3">
              <FaChalkboardTeacher />
              <span>Manage Result</span>
            </span>
            <FaAngleDown />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-56"
          >
            {/* Replace <a href> with <Link to> if using react-router-dom */}
            <li>
              <Link
                to="/teacher-dashboard/manage-results/add-results"
                className="flex justify-between items-center"
              >
                Submit Result
              </Link>
            </li>
            {/* Placeholder for more teacher items */}
            
            {/* Add more teacher options as needed */}
          </ul>
        </div>

        {/* Divider for visual separation */}
        <div className="divider my-2"></div>
        <div>
          <Link
            to="/"
          className="btn btn-ghost btn-block justify-start gap-3 text-base-content"
          aria-label="Home"
        >
          <FaHome></FaHome>
          <span>Back to Home</span>
        </Link>
        <Link to="/about-us" className="btn btn-ghost btn-block justify-start gap-3 text-base-content">
                  <MdOutlineRoundaboutRight />
                  <span>About Us</span>
                </Link>
        </div>

        <Link to="/notices" className="btn btn-ghost btn-block justify-start gap-3 text-base-content">
                  <RiNotificationLine />
                  <span>Notices</span>
                </Link>
        {/* Placeholder area for future items */}
        <div className="text-sm text-base-content/70 px-2">
          You can add more links, quick actions, or tools here later.
        </div>

      </nav>

      {/* User info section at the bottom */}
      <div className="absolute bottom-20 left-0 right-0 p-4 border-t bg-base-200">
        <div className="flex items-center gap-3">
          <div className="avatar">
            {teacherData?.photo ? (
              <div className="w-12 rounded-full">
                <img src={teacherData.photo} alt={`${teacherData.first_name} ${teacherData.last_name}`} />
              </div>
            ) : (
              <div className="bg-neutral text-neutral-content rounded-full w-12 placeholder">
                <span className="text-xl">
                  {user?.name ? user.name.charAt(0).toUpperCase() : <FaUser />}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-base-content">
              {teacherData ? `${teacherData.first_name} ${teacherData.last_name}` : (user?.fullName || "User")}
            </p>
            <p className="text-xs text-base-content/70">
              {user?.email || "No email"}
            </p>
            <p className="text-xs text-base-content/70">
              {user?.role || "Teacher"}
            </p>
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

export default TeacherSidebar;
