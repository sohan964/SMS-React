import React, { useContext, useEffect } from "react";
import HomeHeader from "./layoutComponents/HomeHeader";
import StudentSidebar from "./layoutComponents/StudentSidebar";
import { Outlet, useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";

const StudentDashboard = () => {
  const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    
        useEffect(() => {
            if (user?.role && user?.role[0] !== 'Student') {
                logout();
                navigate('/');
            }
        }, [user, logout, navigate]);
  return (
    <>
     <HomeHeader></HomeHeader>
      <div className="flex">
        <StudentSidebar></StudentSidebar>
        <div className="flex-1 p-6">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
