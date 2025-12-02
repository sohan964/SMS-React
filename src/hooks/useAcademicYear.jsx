import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useAcademicYear = () => {
    const axiosPublic = useAxiosPublic();
    const {data:years=[],isPending:loading, refetch} = useQuery({
        queryKey: ['years'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/Years/get-academic-years');
            // console.log(res.data);
            return res.data.data;
        }
    });
    return[years, loading, refetch];
};

export default useAcademicYear;