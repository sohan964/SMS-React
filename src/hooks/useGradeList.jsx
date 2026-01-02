import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';


const useGradeList = () => {
    const axiosPublic = useAxiosPublic();
    const {data:grades=[],isPending:loading, refetch} = useQuery({
        queryKey: ['grades'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/Grades/get-grade-list');
            // console.log(res.data);
            return res.data.data;
        }
    });
    return[grades, loading, refetch];
};

export default useGradeList;