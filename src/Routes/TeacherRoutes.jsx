import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router';

const TeacherRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if(loading){
        return <div>Loading...</div>;
    }
    if(user?.id && user?.role[0] === "Teacher"){
        return children;
    }

    if(user?.id && user?.role[0] !== "Teacher"){
        return <Navigate to="/teacher-dashboard" state={{from: location}} replace></Navigate>
    }
    return <Navigate to="/teacher-login" state={{from: location}} replace></Navigate>
};

export default TeacherRoutes;