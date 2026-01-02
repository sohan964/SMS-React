import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useNotice = () => {
    const axiosPublic = useAxiosPublic();
    const {data:notices=[],isPending:loading, refetch} = useQuery({
        queryKey: ['notices'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/Notices/get-all-notices');
            // console.log(res.data);
            return res.data.data;
        }
    });
    return[notices, loading, refetch];
};

export default useNotice;