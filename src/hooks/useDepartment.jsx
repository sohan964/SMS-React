import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useDepartment = () => {
    const axiosPublic = useAxiosPublic();
    const {data:departments=[],isPending:loading, refetch} = useQuery({
        queryKey: ['departments'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/Department/getdepartments');
            // console.log(res.data);
            return res.data.data;
        }
    });
    return[departments, loading, refetch];
};

export default useDepartment;