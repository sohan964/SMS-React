import { createBrowserRouter } from "react-router";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";

import AdminHome from "../pages/admins/AdminHome/AdminHome";
import AdminDashboard from "../Layout/AdminDashboard";
import AdminLogin from "../pages/admins/AdminLogin/AdminLogin";
import DepartmentList from "../pages/departments/DepartmentList";
import UpdateDepartment from "../pages/departments/UpdateDepartment";
import AddDepartment from "../pages/departments/AddDepartment";

export const router = createBrowserRouter([
    {
        path: "/",
        element:<Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path :"/admin-login",
                element: <AdminLogin></AdminLogin>
            }
        ]
    },
    {
        path: "/admin-dashboard",
        element: <AdminDashboard></AdminDashboard>,
        children: [
            {
                path : "",
                element: <AdminHome></AdminHome>
            },
            {
                path: "manage-departments",
                element:<DepartmentList></DepartmentList>
            },
            {
                path: "manage-departments/update-department/:id",
                element: <UpdateDepartment></UpdateDepartment>,
                loader: async({params})=> await fetch(`http://localhost:5074/api/Department/get-departmentbyid/${params?.id}`) 
            },
            {
                path: "manage-departments/add-department",
                element: <AddDepartment></AddDepartment>
            }
        ]
    }
])