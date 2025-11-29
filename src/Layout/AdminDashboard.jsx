
import AdminSidebar from "./layoutComponents/AdminSidebar";
import { Outlet } from "react-router";
import HomeHeader from "./layoutComponents/HomeHeader";
import { AuthContext } from "../providers/AuthProvider";

const AdminDashboard = () => {
    
  return (
    <>
      <HomeHeader></HomeHeader>
      <div className="flex">
        <AdminSidebar></AdminSidebar>
        <div className="flex-1 p-6">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
