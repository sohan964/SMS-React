import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router';

const StudentRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if(loading){
        return <div>Loading...</div>;
    }
    if(user?.id && user?.role[0] === "Student"){
        return children;
    }

    if(user?.id && user?.role[0] !== "Student"){
        return <Navigate to="/student-dashboard" state={{from: location}} replace></Navigate>
    }
    return <Navigate to="/student-login" state={{from: location}} replace></Navigate>
};

export default StudentRoutes;