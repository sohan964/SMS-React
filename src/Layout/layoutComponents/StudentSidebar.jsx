import React, { useContext } from "react";
import { FaAngleDown, FaChalkboardTeacher, FaHome, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router";
import useStudentData from "../../hooks/useStudentData";
import { MdSchedule } from "react-icons/md";
import { AuthContext } from "../../providers/AuthProvider";

const StudentSidebar = () => {
  const [studentData] = useStudentData();
  const { user, logout } = useContext(AuthContext);
  console.log("Student Data in Sidebar:", studentData);
  
  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const displayName = studentData?.fullName || studentData?.name || user?.displayName || user?.email?.split("@")[0] || "Unknown";
  const displayRole = "Student";

  return (
    <aside
      role="navigation"
      aria-label="Main sidebar"
      className="w-64 h-screen bg-gradient-to-b from-base-200 to-base-300 border-r border-base-300 shadow-lg flex flex-col"
    >
      <nav className="flex-1 overflow-y-auto pr-2 space-y-2 pb-6 p-4">
        {/* Home button */}
        <Link
          to="/student-dashboard"
          className="btn btn-ghost btn-block justify-start gap-3 text-base-content hover:bg-primary/10 transition-colors duration-200 rounded-lg"
          aria-label="Home"
        >
          <FaHome className="text-primary" />
          <span className="font-medium">Home</span>
        </Link>

        <Link
          to="/student-dashboard/student-routine"
          className="btn btn-ghost btn-block justify-start gap-3 text-base-content hover:bg-primary/10 transition-colors duration-200 rounded-lg"
          aria-label="Student Routine"
        >
          <MdSchedule className="text-primary" />
          <span className="font-medium">Student Routine</span>
        </Link>

        {/* Results dropdown */}
        <div className="dropdown w-full">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-block justify-between hover:bg-primary/10 transition-colors duration-200 rounded-lg"
          >
            <span className="flex items-center gap-3">
              <FaChalkboardTeacher className="text-primary" />
              <span className="font-medium">Results</span>
            </span>
            <FaAngleDown className="text-primary/70" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-56 z-20"
          >
            <li>
              <Link
                to="/student-dashboard/student-result"
                className="flex justify-between items-center hover:bg-primary/10 rounded-md px-2 py-1"
              >
                View Results
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* User info at the bottom (fixed) */}
      <div
        className="sticky bottom-0 bg-gradient-to-r from-base-200 to-base-300 pt-4 border-t border-base-300 flex-none z-10 shadow-inner"
      >
        <div className="flex items-center gap-3 p-2 rounded-lg bg-base-100/50 backdrop-blur-sm mx-4 mb-4">
          <div className="avatar ring-2 ring-primary/20">
            {studentData?.photoURL || studentData?.avatar || studentData?.photo || user?.photoURL || user?.avatar || user?.photo ? (
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={studentData?.photoURL || studentData?.avatar || studentData?.photo || user?.photoURL || user?.avatar || user?.photo}
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
            <div className="text-xs opacity-80 truncate">{studentData?.email || user?.email || 'No email'}</div>
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

export default StudentSidebar;
