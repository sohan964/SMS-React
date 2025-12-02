import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useSlot = () => {
    const axiosPublic = useAxiosPublic();
    const {data:slots=[],isPending:loading, refetch} = useQuery({
        queryKey: ['slots'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/WeeklyDays/get-slots');
            // console.log(res.data);
            return res.data.data;
        }
    });
    return[slots, loading, refetch];
};

export default useSlot;