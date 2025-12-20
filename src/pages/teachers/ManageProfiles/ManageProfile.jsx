import React from 'react';
import useTeacherData from '../../../hooks/useTeacherData';

const ManageProfile = () => {
    const [teacherData, loading] = useTeacherData();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex-shrink-0">
                    <img
                        src={teacherData?.photo || 'https://png.pngtree.com/png-vector/20230729/ourmid/pngtree-picture-of-a-teacher-vector-png-image_7009012.png'}
                        alt={`${teacherData?.first_name} ${teacherData?.last_name}`}
                        className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                    />
                </div>
                <div className="flex-grow text-center md:text-left">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {teacherData?.first_name} {teacherData?.last_name}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Teacher Code</p>
                            <p className="font-semibold text-gray-800">{teacherData?.teacher_code}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Department</p>
                            <p className="font-semibold text-gray-800">{teacherData?.department_name}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Contact</p>
                            <p className="font-semibold text-gray-800">{teacherData?.contact}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-semibold text-gray-800">{teacherData?.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProfile;