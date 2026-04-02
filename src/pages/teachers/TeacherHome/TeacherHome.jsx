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
  <div className="space-y-6">

    {/* TOP WELCOME CARD */}
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
      <h1 className="text-2xl md:text-3xl font-bold">
        👋 Welcome, {teacherData.first_name}
      </h1>
      <p className="opacity-90 mt-1 text-sm md:text-base">
        Here's what's happening with your classes today
      </p>
    </div>

    {/* PROFILE + INFO */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* PROFILE */}
      <div className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          👤 Profile Overview
        </h2>
        <ManageProfile />
      </div>

      {/* QUICK INFO CARDS */}
      <div className="space-y-4">

        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-5">
          <p className="text-xs text-gray-500">Academic Year</p>
          <p className="font-bold text-lg text-gray-800">
            {years.find(y => y.year_id === currentYearId)?.year_lable || 'N/A'}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-5">
          <p className="text-xs text-gray-500">Department</p>
          <p className="font-bold text-lg text-gray-800">
            {teacherData.department_name || 'N/A'}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-5">
          <p className="text-xs text-gray-500">Teacher Code</p>
          <p className="font-bold text-lg text-gray-800">
            {teacherData.teacher_code || 'N/A'}
          </p>
        </div>

      </div>
    </div>

    {/* ROUTINE SECTION */}
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          📅 Class Routine
        </h2>

        <button
          onClick={handlePrint}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-lg hover:scale-105 transition shadow"
        >
          🖨 Print
        </button>
      </div>

      {/* TABLE */}
      {routineData && routineData.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-gray-200">

          <table className="min-w-full text-sm">

            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Day</th>
                <th className="px-4 py-3 text-left">Start</th>
                <th className="px-4 py-3 text-left">End</th>
                <th className="px-4 py-3 text-left">Subject</th>
                <th className="px-4 py-3 text-left">Class</th>
                <th className="px-4 py-3 text-left">Section</th>
              </tr>
            </thead>

            <tbody>
              {routineData.map((routine, index) => (
                <tr
                  key={routine.routine_id || index}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="px-4 py-3">{routine.day_name || '-'}</td>
                  <td className="px-4 py-3">{routine.start_time || '-'}</td>
                  <td className="px-4 py-3">{routine.end_time || '-'}</td>
                  <td className="px-4 py-3 font-medium">{routine.subject_name || '-'}</td>
                  <td className="px-4 py-3">{routine.class_name || '-'}</td>
                  <td className="px-4 py-3">{routine.section_name || '-'}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      ) : (
        <div className="text-center text-gray-400 py-12">
          📭 No routine found
        </div>
      )}

    </div>

  </div>
);
};

export default TeacherHome;