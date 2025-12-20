import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router';

const AdminRoutes = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if(loading){
        return <div>Loading...</div>;
    }
    if(user?.id && user?.role[0] === "Admin"){
        return children;
    }

    if(user?.id && user?.role[0] !== "Admin"){
        return <Navigate to="/dashboard" state={{from: location}} replace></Navigate>
    }
    return <Navigate to="/admin-login" state={{from: location}} replace></Navigate>
};

export default AdminRoutes;