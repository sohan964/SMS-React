import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useTeacherRoutine = ({teacher_id, year_id}) => {
    const axiosSecure = useAxiosSecure();
    console.log("from the routine",teacher_id, year_id);
    
    
    const { data: teacherRoutineData = {}, isPending: loading, refetch } = useQuery({
        queryKey: ['teacherRoutineData', teacher_id, year_id],
        queryFn: async () => {
            if (!teacher_id && !year_id) return null;
            const res = await axiosSecure.get(`/ClassRoutines/teacher-routine/${teacher_id}/${year_id}`);
            return res.data.data;
        },
        enabled: !!teacher_id && !!year_id
    });
    
    return [teacherRoutineData, loading, refetch];
};

export default useTeacherRoutine;