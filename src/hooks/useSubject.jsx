import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useSubject = () => {
    const axiosPublic = useAxiosPublic();
    const {data:subjects=[],isPending:loading, refetch} = useQuery({
        queryKey: ['subjects'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/Subjects/get-subjects');
            // console.log(res.data);
            return res.data.data;
        }
    });
    return[subjects, loading, refetch];
};

export default useSubject;