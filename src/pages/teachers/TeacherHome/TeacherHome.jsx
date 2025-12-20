import React, { useMemo } from 'react';
import useTeacherData from '../../../hooks/useTeacherData';
import useAcademicYear from '../../../hooks/useAcademicYear';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ManageProfile from '../ManageProfiles/ManageProfile';
import { useQuery } from '@tanstack/react-query';

const TeacherHome = () => {
    const [teacherData, teacherLoading] = useTeacherData();
    const [years, yearsLoading] = useAcademicYear();
    const axiosSecure = useAxiosSecure();

    // Get current year and match with academic years using useMemo
    const currentYearId = useMemo(() => {
        if (!years || years.length === 0) return null;
        
        const currentYear = new Date().getFullYear();
        const matchedYear = years.find(year =>
            parseInt(year.year_lable) === currentYear
        );
        
        return matchedYear?.year_id || years.find(year => year.is_active)?.year_id || null;
    }, [years]);

    // Fetch routine data using useQuery
    const { data: routineData = [], isLoading: routineLoading, error: routineError } = useQuery({
        queryKey: ['teacherRoutine', currentYearId, teacherData?.teacher_id],
        queryFn: async () => {
            console.log('Fetching routine for teacher:', teacherData?.teacher_id, 'year:', currentYearId);
            if (!currentYearId || !teacherData?.teacher_id) {
                console.log('Missing teacher_id or currentYearId', { teacherData, currentYearId });
                return [];
            }
            try {
                const res = await axiosSecure.get(`/ClassRoutines/teacher-routine/${teacherData.teacher_id}/${currentYearId}`);
                console.log('Routine response:', res.data);
                return res.data.data || [];
            } catch (error) {
                console.error('Error fetching routine:', error);
                throw error;
            }
        },
        enabled: !!currentYearId && !!teacherData?.teacher_id
    });

    // Function to handle print/download
    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        
        // Create table HTML for printing
        const tableHTML = routineData && routineData.length > 0 ? `
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <thead>
                    <tr style="background-color: #f2f2f2;">
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Day</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Time</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Subject</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Class</th>
                    </tr>
                </thead>
                <tbody>
                    ${routineData.map((routine) => `
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">${routine.day_name || '-'}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${routine.start_time || '-'} - ${routine.end_time || '-'}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${routine.subject_name || '-'}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${routine.class_name || '-'} (${routine.section_name || '-'})</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        ` : '<p>No routine data available</p>';
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Teacher Routine - ${teacherData?.first_name} ${teacherData?.last_name}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        padding: 20px;
                    }
                    h3 {
                        text-align: center;
                        color: #333;
                    }
                    .header-info {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .info-row {
                        margin-bottom: 10px;
                    }
                    @media print {
                        body { margin: 0; }
                        table { page-break-inside: auto; }
                        tr { page-break-inside: avoid; page-break-after: auto; }
                    }
                </style>
            </head>
            <body>
                <div class="header-info">
                    <h3>Teacher Routine</h3>
                    <div class="info-row"><strong>Academic Year:</strong> ${years.find(y => y.year_id === currentYearId)?.year_lable || 'N/A'}</div>
                    <div class="info-row"><strong>Teacher:</strong> ${teacherData?.first_name} ${teacherData?.last_name}</div>
                    <div class="info-row"><strong>Department:</strong> ${teacherData?.department_name || 'N/A'}</div>
                </div>
                ${tableHTML}
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        
        // Wait for the content to load before printing
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
    };


    if (teacherLoading || yearsLoading || routineLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    if (routineError) {
        console.error('Routine error:', routineError);
        return (
            <div className="alert alert-error">
                <span>Error loading routine: {routineError.message}</span>
            </div>
        );
    }

    if (!teacherData?.teacher_id) {
        console.log('Teacher data missing:', teacherData);
        return (
            <div className="alert alert-warning">
                <span>Teacher information not available</span>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            <ManageProfile />
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        My Routine - {teacherData.first_name} {teacherData.last_name}
                    </h2>
                    <button
                        onClick={handlePrint}
                        className="btn btn-primary"
                    >
                        Print Routine
                    </button>
                </div>
                
                {/* Teacher Info Card */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <span className="text-sm text-gray-500">Academic Year</span>
                            <p className="font-medium">{years.find(y => y.year_id === currentYearId)?.year_lable || 'N/A'}</p>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">Department</span>
                            <p className="font-medium">{teacherData.department_name || 'N/A'}</p>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">Teacher Code</span>
                            <p className="font-medium">{teacherData.teacher_code || 'N/A'}</p>
                        </div>
                    </div>
                </div>
                
                {/* Debug Info
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <p className="text-sm"><strong>Debug Info:</strong></p>
                    <p className="text-sm">Teacher ID: {teacherData?.teacher_id}</p>
                    <p className="text-sm">Current Year ID: {currentYearId}</p>
                    <p className="text-sm">Routine Data Length: {routineData?.length || 0}</p>
                    <p className="text-sm">Years Available: {years?.length || 0}</p>
                </div> */}

                {/* Routine Table */}
                {routineData && routineData.length > 0 ? (
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Day
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Start Time
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            End Time
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Subject
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Class
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Section
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {routineData.map((routine, index) => (
                                        <tr key={routine.routine_id || index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {routine.day_name || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {routine.start_time || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {routine.end_time || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {routine.subject_name || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {routine.class_name || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {routine.section_name || '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
                        No routine data found for you.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeacherHome;