import React, { useState, useEffect } from 'react';
import useStudentData from '../../../hooks/useStudentData';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaDownload } from 'react-icons/fa';

const StudentResult = () => {
    const [studentData, isStudentLoading] = useStudentData();
    const [resultData, setResultData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchResultData = async () => {
            if (!studentData?.current_enrollment_id) {
                setError('Student enrollment ID not found');
                return;
            }

            setIsLoading(true);
            setError('');

            try {
                const response = await axiosSecure.get(`/Results/get-final-result/${studentData.current_enrollment_id}`);
                console.log('Result data:', response.data);
                setResultData(response.data.data);
            } catch (err) {
                setError('Failed to fetch result data. Please try again.');
                console.error('Error fetching result data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResultData();
    }, [studentData, axiosSecure]);

    const getGradeStyle = (grade) => {
        switch (grade?.toUpperCase()) {
            case 'A+':
            case 'A':
                return { color: '#059669', fontWeight: 'bold' };
            case 'A-':
            case 'B+':
                return { color: '#2563eb', fontWeight: '600' };
            case 'B':
            case 'B-':
                return { color: '#d97706', fontWeight: '600' };
            case 'C':
            case 'D':
                return { color: '#ea580c', fontWeight: '600' };
            case 'F':
                return { color: '#dc2626', fontWeight: 'bold' };
            default:
                return { color: '#374151' };
        }
    };

    const handlePrint = () => {
        if (!resultData) {
            alert('Result data not available for printing');
            return;
        }
        
        const printWindow = window.open('', '_blank');
        
        // Create student info HTML
        const studentInfoHTML = `
            <div style="margin-bottom: 32px;">
                <h3 style="font-size: 20px; font-weight: 600; text-align: center; margin-bottom: 16px;">Academic Result Sheet</h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px;">
                    <div>
                        <p style="font-size: 14px; color: #6b7280;">Student Number</p>
                        <p style="font-weight: 600;">${resultData.student_number}</p>
                    </div>
                    <div>
                        <p style="font-size: 14px; color: #6b7280;">Student Name</p>
                        <p style="font-weight: 600;">${resultData.student_name}</p>
                    </div>
                    <div>
                        <p style="font-size: 14px; color: #6b7280;">Class</p>
                        <p style="font-weight: 600;">${resultData.class_name}</p>
                    </div>
                    <div>
                        <p style="font-size: 14px; color: #6b7280;">Section</p>
                        <p style="font-weight: 600;">${resultData.section_name}</p>
                    </div>
                    <div>
                        <p style="font-size: 14px; color: #6b7280;">Academic Year</p>
                        <p style="font-weight: 600;">${resultData.year_label}</p>
                    </div>
                    <div>
                        <p style="font-size: 14px; color: #6b7280;">Enrollment ID</p>
                        <p style="font-weight: 600;">${resultData.enrollment_id}</p>
                    </div>
                </div>
            </div>
        `;
        
        // Create subject results table HTML
        const subjectTableHTML = `
            <div style="margin-bottom: 32px;">
                <h4 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Subject-wise Results</h4>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="background-color: #f9fafb;">
                        <tr>
                            <th style="border: 1px solid #000; padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 500; color: #6b7280; text-transform: uppercase;">Subject Name</th>
                            <th style="border: 1px solid #000; padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 500; color: #6b7280; text-transform: uppercase;">Subject Code</th>
                            <th style="border: 1px solid #000; padding: 12px 16px; text-align: center; font-size: 12px; font-weight: 500; color: #6b7280; text-transform: uppercase;">Credit Hours</th>
                            <th style="border: 1px solid #000; padding: 12px 16px; text-align: center; font-size: 12px; font-weight: 500; color: #6b7280; text-transform: uppercase;">Total Marks</th>
                            <th style="border: 1px solid #000; padding: 12px 16px; text-align: center; font-size: 12px; font-weight: 500; color: #6b7280; text-transform: uppercase;">Max Marks</th>
                            <th style="border: 1px solid #000; padding: 12px 16px; text-align: center; font-size: 12px; font-weight: 500; color: #6b7280; text-transform: uppercase;">Percentage</th>
                            <th style="border: 1px solid #000; padding: 12px 16px; text-align: center; font-size: 12px; font-weight: 500; color: #6b7280; text-transform: uppercase;">Grade</th>
                            <th style="border: 1px solid #000; padding: 12px 16px; text-align: center; font-size: 12px; font-weight: 500; color: #6b7280; text-transform: uppercase;">Grade Point</th>
                            <th style="border: 1px solid #000; padding: 12px 16px; text-align: center; font-size: 12px; font-weight: 500; color: #6b7280; text-transform: uppercase;">Weighted GP</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${resultData.eachSubjectResultDtos.map((subject) => `
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="border: 1px solid #000; padding: 12px 16px; font-size: 14px; color: #111827;">${subject.subject_name}</td>
                                <td style="border: 1px solid #000; padding: 12px 16px; font-size: 14px; color: #111827;">${subject.subject_code}</td>
                                <td style="border: 1px solid #000; padding: 12px 16px; font-size: 14px; text-align: center; color: #111827;">${subject.credit_hours}</td>
                                <td style="border: 1px solid #000; padding: 12px 16px; font-size: 14px; text-align: center; color: #111827;">${subject.total_marks}</td>
                                <td style="border: 1px solid #000; padding: 12px 16px; font-size: 14px; text-align: center; color: #111827;">${subject.max_marks}</td>
                                <td style="border: 1px solid #000; padding: 12px 16px; font-size: 14px; text-align: center; color: #111827;">${subject.percentage.toFixed(1)}%</td>
                                <td style="border: 1px solid #000; padding: 12px 16px; font-size: 14px; text-align: center; font-weight: bold; color: ${getGradeStyle(subject.grade_name).color};">${subject.grade_name}</td>
                                <td style="border: 1px solid #000; padding: 12px 16px; font-size: 14px; text-align: center; color: #111827;">${subject.grade_point}</td>
                                <td style="border: 1px solid #000; padding: 12px 16px; font-size: 14px; text-align: center; color: #111827;">${subject.weighted_grade_point}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        
        // Create summary HTML
        const summaryHTML = `
            <div style="border-top: 1px solid #e5e7eb; padding-top: 24px;">
                <h4 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Result Summary</h4>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
                    <div style="text-align: center;">
                        <p style="font-size: 14px; color: #6b7280;">Total Credit Hours</p>
                        <p style="font-size: 20px; font-weight: bold; color: #1f2937;">${resultData.total_credit_hours}</p>
                    </div>
                    <div style="text-align: center;">
                        <p style="font-size: 14px; color: #6b7280;">Total Weighted Grade Points</p>
                        <p style="font-size: 20px; font-weight: bold; color: #1f2937;">${resultData.total_weighted_grade_points}</p>
                    </div>
                    <div style="text-align: center;">
                        <p style="font-size: 14px; color: #6b7280;">GPA</p>
                        <p style="font-size: 20px; font-weight: bold; color: #1f2937;">${resultData.gpa.toFixed(2)}</p>
                    </div>
                    <div style="text-align: center;">
                        <p style="font-size: 14px; color: #6b7280;">Overall Grade</p>
                        <p style="font-size: 30px; font-weight: bold; color: ${getGradeStyle(resultData.overall_grade).color};">${resultData.overall_grade}</p>
                    </div>
                </div>
            </div>
        `;
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Student Result - ${resultData?.student_name || 'Unknown'}</title>
                <style>
                    body {
                        font-family: 'Times New Roman', Times, serif;
                        margin: 20px;
                        padding: 20px;
                        font-size: 12pt;
                        line-height: 1.4;
                        color: #000;
                        background: #fff;
                    }
                    h3, h4 {
                        color: #333;
                    }
                    @media print {
                        body { margin: 10px; }
                        table { page-break-inside: auto; }
                        tr { page-break-inside: avoid; page-break-after: auto; }
                    }
                </style>
            </head>
            <body>
                ${studentInfoHTML}
                ${subjectTableHTML}
                ${summaryHTML}
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

    if (isLoading || isStudentLoading) {
        return (
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '256px' }}>
                    <div style={{ fontSize: '18px', color: '#4b5563' }}>Loading result data...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
                <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fca5a5', color: '#b91c1c', padding: '12px 16px', borderRadius: '6px' }}>
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '24px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>Student Result</h2>
                    <button
                        onClick={handlePrint}
                        style={{ padding: '8px 16px', backgroundColor: '#2563eb', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <FaDownload />
                        Download PDF
                    </button>
                </div>

                {resultData ? (
                    <div id="result-sheet">
                        {/* Student Information */}
                        <div style={{ marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: '600', textAlign: 'center', marginBottom: '16px' }}>Academic Result Sheet</h3>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
                                <div>
                                    <p style={{ fontSize: '14px', color: '#6b7280' }}>Student Number</p>
                                    <p style={{ fontWeight: '600' }}>{resultData.student_number}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '14px', color: '#6b7280' }}>Student Name</p>
                                    <p style={{ fontWeight: '600' }}>{resultData.student_name}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '14px', color: '#6b7280' }}>Class</p>
                                    <p style={{ fontWeight: '600' }}>{resultData.class_name}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '14px', color: '#6b7280' }}>Section</p>
                                    <p style={{ fontWeight: '600' }}>{resultData.section_name}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '14px', color: '#6b7280' }}>Academic Year</p>
                                    <p style={{ fontWeight: '600' }}>{resultData.year_label}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '14px', color: '#6b7280' }}>Enrollment ID</p>
                                    <p style={{ fontWeight: '600' }}>{resultData.enrollment_id}</p>
                                </div>
                            </div>
                        </div>

                        {/* Subject Results Table */}
                        <div style={{ marginBottom: '32px' }}>
                            <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Subject-wise Results</h4>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead style={{ backgroundColor: '#f9fafb' }}>
                                        <tr>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                                                Subject Name
                                            </th>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                                                Subject Code
                                            </th>
                                            <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                                                Credit Hours
                                            </th>
                                            <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                                                Total Marks
                                            </th>
                                            <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                                                Max Marks
                                            </th>
                                            <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                                                Percentage
                                            </th>
                                            <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                                                Grade
                                            </th>
                                            <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                                                Grade Point
                                            </th>
                                            <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                                                Weighted GP
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ backgroundColor: '#ffffff' }}>
                                        {resultData.eachSubjectResultDtos.map((subject, index) => (
                                            <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                                <td style={{ padding: '12px 16px', fontSize: '14px', color: '#111827' }}>
                                                    {subject.subject_name}
                                                </td>
                                                <td style={{ padding: '12px 16px', fontSize: '14px', color: '#111827' }}>
                                                    {subject.subject_code}
                                                </td>
                                                <td style={{ padding: '12px 16px', fontSize: '14px', textAlign: 'center', color: '#111827' }}>
                                                    {subject.credit_hours}
                                                </td>
                                                <td style={{ padding: '12px 16px', fontSize: '14px', textAlign: 'center', color: '#111827' }}>
                                                    {subject.total_marks}
                                                </td>
                                                <td style={{ padding: '12px 16px', fontSize: '14px', textAlign: 'center', color: '#111827' }}>
                                                    {subject.max_marks}
                                                </td>
                                                <td style={{ padding: '12px 16px', fontSize: '14px', textAlign: 'center', color: '#111827' }}>
                                                    {subject.percentage.toFixed(1)}%
                                                </td>
                                                <td style={{ padding: '12px 16px', fontSize: '14px', textAlign: 'center', ...getGradeStyle(subject.grade_name) }}>
                                                    {subject.grade_name}
                                                </td>
                                                <td style={{ padding: '12px 16px', fontSize: '14px', textAlign: 'center', color: '#111827' }}>
                                                    {subject.grade_point}
                                                </td>
                                                <td style={{ padding: '12px 16px', fontSize: '14px', textAlign: 'center', color: '#111827' }}>
                                                    {subject.weighted_grade_point}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Summary */}
                        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
                            <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Result Summary</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ fontSize: '14px', color: '#6b7280' }}>Total Credit Hours</p>
                                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>{resultData.total_credit_hours}</p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ fontSize: '14px', color: '#6b7280' }}>Total Weighted Grade Points</p>
                                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>{resultData.total_weighted_grade_points}</p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ fontSize: '14px', color: '#6b7280' }}>GPA</p>
                                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>{resultData.gpa.toFixed(2)}</p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ fontSize: '14px', color: '#6b7280' }}>Overall Grade</p>
                                    <p style={{ fontSize: '30px', fontWeight: 'bold', ...getGradeStyle(resultData.overall_grade) }}>
                                        {resultData.overall_grade}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '32px 0', color: '#6b7280' }}>
                        No result data available
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentResult;