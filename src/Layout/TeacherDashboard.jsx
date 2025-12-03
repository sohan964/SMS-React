import React from "react";
import HomeHeader from "./layoutComponents/HomeHeader";
import { Outlet } from "react-router";
import TeacherSidebar from "./layoutComponents/TeacherSidebar";

const TeacherDashboard = () => {
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
