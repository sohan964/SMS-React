import React, { useState } from 'react';
import { FaChalkboardTeacher, FaHome, FaBars, FaTimes } from 'react-icons/fa';
import { FaAngleDown } from "react-icons/fa6";
import { FcContacts } from 'react-icons/fc';
import { MdAdminPanelSettings, MdOutlineRoundaboutRight } from 'react-icons/md';
import { PiStudentBold } from 'react-icons/pi';
import { RiNotificationLine } from 'react-icons/ri';
import { Link } from 'react-router';

const MainSidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav role="navigation" aria-label="Main navigation" className="sticky top-0 z-50 bg-base-200 border-b shadow-sm">
      <div className="navbar px-4">
        {/* Mobile menu toggle */}
        <div className="navbar-start lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">
            {/* Home button */}
            <li>
              <Link to="/" className="flex items-center gap-2">
                <FaHome />
                <span>Home</span>
              </Link>
            </li>

            {/* Teachers dropdown */}
            <li className="dropdown">
              <div tabIndex={0} role="button" className="flex items-center gap-2">
                <FaChalkboardTeacher />
                <span>Teachers</span>
                <FaAngleDown className="ml-1" />
              </div>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-56 mt-2">
                <li>
                  <Link to="/teacher-login" className="flex justify-between items-center">
                    Teacher Login
                  </Link>
                </li>
                <li>
                  <a href="#" className="flex justify-between items-center">
                    Manage Profile
                  </a>
                </li>
              </ul>
            </li>

            {/* Students dropdown */}
            <li className="dropdown">
              <div tabIndex={0} role="button" className="flex items-center gap-2">
                <PiStudentBold />
                <span>Students</span>
                <FaAngleDown className="ml-1" />
              </div>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-56 mt-2">
                <li>
                  <Link to="/student-login" className="flex justify-between items-center">
                    Student Login
                  </Link>
                </li>
                <li>
                  <a href="#" className="flex justify-between items-center">
                    Routine
                  </a>
                </li>
                <li>
                  <a href="#" className="opacity-70" aria-disabled="true">
                    More...
                  </a>
                </li>
              </ul>
            </li>

            {/* Administration dropdown */}
            <li className="dropdown">
              <div tabIndex={0} role="button" className="flex items-center gap-2">
                <MdAdminPanelSettings />
                <span>Administration</span>
                <FaAngleDown className="ml-1" />
              </div>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-56 mt-2">
                <li>
                  <Link to="/admin-login" className="flex justify-between items-center">
                    Admin Login
                  </Link>
                </li>
                <li>
                  <a href="#" className="flex justify-between items-center">
                    Routine
                  </a>
                </li>
                <li>
                  <a href="#" className="opacity-70" aria-disabled="true">
                    More...
                  </a>
                </li>
              </ul>
            </li>

            {/* About us button */}
            <li>
              <Link to="/about-us" className="flex items-center gap-2">
                <MdOutlineRoundaboutRight />
                <span>About Us</span>
              </Link>
            </li>

            {/* Notices button */}
            <li>
              <Link to="/notices" className="flex items-center gap-2">
                <RiNotificationLine />
                <span>Notices</span>
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="flex items-center gap-2">
                <FcContacts />
                <span>Contact Us</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-base-200 border-t">
          <ul className="menu p-4 space-y-2">
            {/* Home button */}
            <li>
              <Link to="/" onClick={toggleMobileMenu} className="flex items-center gap-2">
                <FaHome />
                <span>Home</span>
              </Link>
            </li>

            {/* Teachers dropdown */}
            <li className="dropdown">
              <div tabIndex={0} role="button" className="flex items-center gap-2 justify-between">
                <span className="flex items-center gap-2">
                  <FaChalkboardTeacher />
                  <span>Teachers</span>
                </span>
                <FaAngleDown />
              </div>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full">
                <li>
                  <Link to="/teacher-login" onClick={toggleMobileMenu} className="flex justify-between items-center">
                    Teacher Login
                  </Link>
                </li>
                <li>
                  <a href="#" className="flex justify-between items-center">
                    Manage Profile
                  </a>
                </li>
              </ul>
            </li>

            {/* Students dropdown */}
            <li className="dropdown">
              <div tabIndex={0} role="button" className="flex items-center gap-2 justify-between">
                <span className="flex items-center gap-2">
                  <PiStudentBold />
                  <span>Students</span>
                </span>
                <FaAngleDown />
              </div>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full">
                <li>
                  <Link to="/student-login" onClick={toggleMobileMenu} className="flex justify-between items-center">
                    Student Login
                  </Link>
                </li>
                <li>
                  <a href="#" className="flex justify-between items-center">
                    Routine
                  </a>
                </li>
                <li>
                  <a href="#" className="opacity-70" aria-disabled="true">
                    More...
                  </a>
                </li>
              </ul>
            </li>

            {/* Administration dropdown */}
            <li className="dropdown">
              <div tabIndex={0} role="button" className="flex items-center gap-2 justify-between">
                <span className="flex items-center gap-2">
                  <MdAdminPanelSettings />
                  <span>Administration</span>
                </span>
                <FaAngleDown />
              </div>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full">
                <li>
                  <Link to="/admin-login" onClick={toggleMobileMenu} className="flex justify-between items-center">
                    Admin Login
                  </Link>
                </li>
                <li>
                  <a href="#" className="flex justify-between items-center">
                    Routine
                  </a>
                </li>
                <li>
                  <a href="#" className="opacity-70" aria-disabled="true">
                    More...
                  </a>
                </li>
              </ul>
            </li>

            {/* About us button */}
            <li>
              <Link to="/about-us" onClick={toggleMobileMenu} className="flex items-center gap-2">
                <MdOutlineRoundaboutRight />
                <span>About Us</span>
              </Link>
            </li>

            {/* Notices button */}
            <li>
              <Link to="/notices" onClick={toggleMobileMenu} className="flex items-center gap-2">
                <RiNotificationLine />
                <span>Notices</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default MainSidebar;