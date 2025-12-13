import React from 'react';
import { FaAngleDown, FaChalkboardTeacher, FaHome } from 'react-icons/fa';
import { Link } from 'react-router';

const StudentSidebar = () => {
    return (
        <aside role="navigation" aria-label="Main sidebar" className="w-64 min-h-screen bg-base-200 border-r p-4">
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

        {/* Teachers dropdown */}
        <div className="dropdown w-full">
          <label tabIndex={0} className="btn btn-ghost btn-block justify-between">
            <span className="flex items-center gap-3">
              <FaChalkboardTeacher />
              <span>Results</span>
            </span>
            <FaAngleDown />
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-56">
            {/* Replace <a href> with <Link to> if using react-router-dom */}
            <li>
              <Link to="/teacher-login" className="flex justify-between items-center">
                Teacher Login
              </Link>
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
    </aside>
    );
};

export default StudentSidebar;