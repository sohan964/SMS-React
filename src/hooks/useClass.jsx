import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useClass = () => {
    const axiosPublic = useAxiosPublic();
    const {data:classes=[],isPending:loading, refetch} = useQuery({
        queryKey: ['classes'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/Classes/get-classes');
            // console.log(res.data);
            return res.data.data;
        }
    });
    return[classes, loading, refetch];
};

export default useClass;