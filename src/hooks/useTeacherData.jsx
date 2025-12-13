import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const useTeacherData = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    
    const { data: teacherData = {}, isPending: loading, refetch } = useQuery({
        queryKey: ['teacherData', user?.id],
        queryFn: async () => {
            if (!user?.id) return null;
            const res = await axiosSecure.get(`/Teachers/GetByUserId/${user.id}`);
            return res.data.data;
        },
        enabled: !!user?.id
    });
    
    return [teacherData, loading, refetch];
};

export default useTeacherData;