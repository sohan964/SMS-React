
import AdminSidebar from "./layoutComponents/AdminSidebar";
import { Outlet, useNavigate } from "react-router";
import HomeHeader from "./layoutComponents/HomeHeader";
import { AuthContext } from "../providers/AuthProvider";
import { useContext, useEffect } from "react";

const AdminDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    // Redirect if user is already logged in as a student
        useEffect(() => {
            if (user?.role && user?.role[0] !== 'Admin') {
                logout();
                navigate('/');
            }
        }, [user, logout, navigate]);
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
