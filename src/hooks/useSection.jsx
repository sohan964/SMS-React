import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useSection = () => {
    const axiosPublic = useAxiosPublic();
    const {data:sections=[],isPending:loading, refetch} = useQuery({
        queryKey: ['sections'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/Sections/get-sections');
            // console.log(res.data);
            return res.data.data;
        }
    });
    return[sections, loading, refetch];
};

export default useSection;