import React, { useContext } from "react";
import { FaAngleDown, FaChalkboardTeacher, FaHome, FaUser } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";

const TeacherSidebar = () => {
    const {user} = useContext(AuthContext);
  return (
    <aside
      role="navigation"
      aria-label="Teacher sidebar"
      className="w-64 min-h-screen bg-base-200 border-r p-4 relative"
    >
      <nav className="space-y-3">
        {/* Home button */}
        <a
          href="/"
          className="btn btn-ghost btn-block justify-start gap-3 text-base-content"
          aria-label="Home"
        >
          <FaHome></FaHome>
          <span>Home</span>
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
              <a href="#" className="flex justify-between items-center"></a>
            </li>
            {/* Placeholder for more teacher items */}
            <li>
              <a href="#" className="flex justify-between items-center">
                Manage Profile
              </a>
            </li>
            {/* Add more teacher options as needed */}
          </ul>
        </div>

        {/* Divider for visual separation */}
        <div className="divider my-2"></div>

        {/* Placeholder area for future items */}
        <div className="text-sm text-base-content/70 px-2">
          You can add more links, quick actions, or tools here later.
        </div>
      </nav>
      
      {/* User info section at the bottom */}
      <div className="absolute bottom-20 left-0 right-0 p-4 border-t bg-base-200">
        <div className="flex items-center gap-3">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-12">
              <span className="text-xl">
                {user?.name ? user.name.charAt(0).toUpperCase() : <FaUser />}
              </span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-base-content">
              {user?.fullName || "User"}
            </p>
            <p className="text-xs text-base-content/70">
              {user?.email || "No email"}
            </p>
            <p className="text-xs text-base-content/70">
              {user?.role || "Teacher"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default TeacherSidebar;
