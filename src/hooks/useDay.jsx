import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useDay = () => {
    const axiosPublic = useAxiosPublic();
    const {data: days=[], isPending:loading, refetch} = useQuery({
        queryKey: ['days'],
        queryFn:async()=>{
            const res = await axiosPublic.get('/WeeklyDays/get-days');
            // console.log(res.data);
            return res.data.data;
        }
    })
    return [days, loading, refetch];
};

export default useDay;