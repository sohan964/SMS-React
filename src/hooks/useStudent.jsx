import React from 'react';

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useStudent = () => {
    const axiosSecure = useAxiosSecure();
    const {data:students=[],isPending:loading, refetch} = useQuery({
        queryKey: ['students'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/Students/get-all');
            // console.log(res.data);
            return res.data.data;
        }
    });
    return[students, loading, refetch];
};

export default useStudent;