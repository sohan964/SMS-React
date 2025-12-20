import React, { useContext, useEffect } from "react";
import HomeHeader from "./layoutComponents/HomeHeader";
import { Outlet, useNavigate } from "react-router";
import TeacherSidebar from "./layoutComponents/TeacherSidebar";
import { AuthContext } from "../providers/AuthProvider";


const TeacherDashboard = () => {
  const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    
        useEffect(() => {
            if (user?.role && user?.role[0] !== 'Teacher') {
                logout();
                navigate('/');
            }
        }, [user, logout, navigate]);
 
  return (
    <>
      <HomeHeader />
      <div className="flex">
        <TeacherSidebar></TeacherSidebar>
        <div className="flex-1 p-6">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
