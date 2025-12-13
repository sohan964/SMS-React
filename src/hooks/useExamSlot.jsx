import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useExamSlot = () => {
    const axiosPublic = useAxiosPublic();
    const {data:examSlots=[],isPending:loading, refetch} = useQuery({
        queryKey: ['examSlots'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/Exam/get-exam-slots');
            // console.log(res.data);
            return res.data.data;
        }
    });
    return[examSlots, loading, refetch];
};

export default useExamSlot;