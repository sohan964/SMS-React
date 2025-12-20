import React, { useMemo } from 'react';
import useAcademicYear from '../../../hooks/useAcademicYear';
import useStudentData from '../../../hooks/useStudentData';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const StudentRoutine = () => {
    const [years] = useAcademicYear();
    const [StudentData, studentLoading] = useStudentData();
    const axiosPublic = useAxiosPublic();

    // Get current year and match with academic years using useMemo
    const currentYearId = useMemo(() => {
        if (!years || years.length === 0) return null;
        
        const currentYear = new Date().getFullYear();
        const matchedYear = years.find(year =>
            parseInt(year.year_lable) === currentYear
        );
        
        return matchedYear?.year_id || years.find(year => year.is_active)?.year_id || null;
    }, [years]);

    // Fetch routine data
    const { data: routineData = [], isLoading: routineLoading, error: routineError } = useQuery({
        queryKey: ['routine', currentYearId, StudentData?.class_id, StudentData?.section_id],
        queryFn: async () => {
            if (!currentYearId || !StudentData?.class_id || !StudentData?.section_id) {
                return [];
            }
            const res = await axiosPublic.get(`/ClassRoutines/class-routine?Year_id=${currentYearId}&Class_id=${StudentData.class_id}&Section_id=${StudentData.section_id}`);
            return res.data.data || [];
        },
        enabled: !!currentYearId && !!StudentData?.class_id && !!StudentData?.section_id
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
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Slot</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Start Time</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">End Time</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Subject</th>
                    </tr>
                </thead>
                <tbody>
                    ${routineData.map((routine) => `
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">${routine.day_name || '-'}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${routine.slot_number || '-'}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${routine.start_time || '-'}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${routine.end_time || '-'}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${routine.subject_name || '-'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        ` : '<p>No routine data available</p>';
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Class Routine - ${StudentData.class_name} (${StudentData.section_name})</title>
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
                    <h3>Class Routine</h3>
                    <div class="info-row"><strong>Academic Year:</strong> ${years.find(y => y.year_id === currentYearId)?.year_lable || 'N/A'}</div>
                    <div class="info-row"><strong>Class:</strong> ${StudentData.class_name} - ${StudentData.section_name}</div>
                    <div class="info-row"><strong>Student ID:</strong> ${StudentData.student_number || 'N/A'}</div>
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

    if (studentLoading || routineLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    if (routineError) {
        return (
            <div className="alert alert-error">
                <span>Error loading routine: {routineError.message}</span>
            </div>
        );
    }

    if (!StudentData?.class_id || !StudentData?.section_id) {
        return (
            <div className="alert alert-warning">
                <span>Student class or section information not available</span>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    My Class Routine - {StudentData.class_name} ({StudentData.section_name})
                </h2>
                <button
                    onClick={handlePrint}
                    className="btn btn-primary"
                >
                    Print Routine
                </button>
            </div>
            
            {/* Student Info Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <span className="text-sm text-gray-500">Academic Year</span>
                        <p className="font-medium">{years.find(y => y.year_id === currentYearId)?.year_lable || 'N/A'}</p>
                    </div>
                    <div>
                        <span className="text-sm text-gray-500">Class & Section</span>
                        <p className="font-medium">{StudentData.class_name} - {StudentData.section_name}</p>
                    </div>
                    <div>
                        <span className="text-sm text-gray-500">Student ID</span>
                        <p className="font-medium">{StudentData.student_number || 'N/A'}</p>
                    </div>
                </div>
            </div>
            
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
                                        Slot
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
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {routineData.map((routine, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {routine.day_name || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {routine.slot_number || '-'}
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
                    No routine data found for your class and section.
                </div>
            )}
        </div>
    );
};

export default StudentRoutine;