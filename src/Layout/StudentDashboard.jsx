import React from "react";
import HomeHeader from "./layoutComponents/HomeHeader";
import StudentSidebar from "./layoutComponents/StudentSidebar";
import { Outlet } from "react-router";

const StudentDashboard = () => {
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
