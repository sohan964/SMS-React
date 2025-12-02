import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useTeacher = () => {
    const axiosPublic = useAxiosPublic();
    const {data:teachers=[],isPending:loading, refetch} = useQuery({
        queryKey: ['teachers'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/Teachers/teacher-list');
            // console.log(res.data);
            return res.data.data;
        }
    });
    return[teachers, loading, refetch];
};

export default useTeacher;