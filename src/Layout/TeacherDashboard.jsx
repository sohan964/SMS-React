import React, { useContext, useEffect } from "react";
import HomeHeader from "./layoutComponents/HomeHeader";
import { Outlet, useNavigate } from "react-router";
import TeacherSidebar from "./layoutComponents/TeacherSidebar";
import { AuthContext } from "../providers/AuthProvider";
import Footer from "./layoutComponents/Footer";


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
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
    <HomeHeader />

    <div className="flex">
      <TeacherSidebar />

      <div className="flex-1 p-6">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 min-h-[80vh]">
          <Outlet />
        </div>
      </div>
    </div>

    <Footer />
  </div>
);
};

export default TeacherDashboard;
