import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useExamType = () => {
    const axiosPublic = useAxiosPublic();
    const {data:examTypes=[],isPending:loading, refetch} = useQuery({
        queryKey: ['examTypes'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/Exam/get-exam-types');
            // console.log(res.data);
            return res.data.data;
        }
    });
    return[examTypes, loading, refetch];
};

export default useExamType;