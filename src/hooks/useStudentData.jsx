import React, { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useStudentData = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    
    const { data: studentData = {}, isPending: loading, refetch } = useQuery({
        queryKey: ['studentData', user?.id],
        queryFn: async () => {
            if (!user?.id) return null;
            const res = await axiosSecure.get(`/Students/GetByUserId/${user.id}`);
            return res.data.data;
        },
        enabled: !!user?.id
    });
    
    return [studentData, loading, refetch];
};

export default useStudentData;