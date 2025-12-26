import React, { useState, useEffect, useMemo } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAcademicYear from '../../../hooks/useAcademicYear';
import useClass from '../../../hooks/useClass';
import useSection from '../../../hooks/useSection';

const ExamSessions = () => {
    const [years] = useAcademicYear();
    console.log('Academic Years:', years);
    const [classes] = useClass();
    const [sections] = useSection();
    const axiosSecure = useAxiosSecure();
    const [selectedYear, setSelectedYear] = useState('');
    const [examSessions, setExamSessions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    useEffect(() => {
        const fetchExamSessions = async () => {
            if (!selectedYear) return;
            
            try {
                setLoading(true);
                const res = await axiosSecure.get(`http://localhost:5074/api/Exam/get-exam-sessions?year_id=${selectedYear}`);
                if (res.data.success) {
                    setExamSessions(res.data.data);
                }
            } catch (err) {
                console.error('Error fetching exam sessions:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchExamSessions();
    }, [selectedYear, axiosSecure]);

    // Get class and section names
    const getClassName = (classId) => {
        const classItem = classes.find(c => c.class_id === classId);
        return classItem ? classItem.class_name : `Class ${classId}`;
    };

    const getSectionName = (sectionId) => {
        const sectionItem = sections.find(s => s.section_id === sectionId);
        return sectionItem ? sectionItem.section_name : `Section ${sectionId}`;
    };

    // Organize exam sessions by class, section, and subject
    const organizedSessions = useMemo(() => {
        const organized = {};
        
        examSessions.forEach(session => {
            const classKey = getClassName(session.class_id);
            const sectionKey = getSectionName(session.section_id);
            const subjectKey = session.subject_name;
            
            if (!organized[classKey]) {
                organized[classKey] = {};
            }
            
            if (!organized[classKey][sectionKey]) {
                organized[classKey][sectionKey] = {};
            }
            
            if (!organized[classKey][sectionKey][subjectKey]) {
                organized[classKey][sectionKey][subjectKey] = [];
            }
            
            organized[classKey][sectionKey][subjectKey].push(session);
        });
        
        return organized;
    }, [examSessions, classes, sections]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Exam Sessions</h1>
            
            <div className="mb-6">
                <label htmlFor="year-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Academic Year
                </label>
                <select
                    id="year-select"
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">-- Select Year --</option>
                    {years.map(year => (
                        <option key={year.year_id} value={year.year_id}>
                            {year?.year_lable}
                        </option>
                    ))}
                </select>
            </div>

            {loading && (
                <div className="text-center py-4">
                    <p>Loading exam sessions...</p>
                </div>
            )}

            {!loading && selectedYear && examSessions.length === 0 && (
                <div className="text-center py-4">
                    <p>No exam sessions found for the selected year.</p>
                </div>
            )}

            {!loading && examSessions.length > 0 && (
                <div>
                    {Object.entries(organizedSessions).map(([className, sections]) => (
                        <div key={className} className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">{className}</h2>
                            {Object.entries(sections).map(([sectionName, subjects]) => (
                                <div key={sectionName} className="mb-6 ml-4">
                                    <h3 className="text-lg font-medium mb-3">{sectionName}</h3>
                                    {Object.entries(subjects).map(([subjectName, sessions]) => (
                                        <div key={subjectName} className="mb-4 ml-4">
                                            <h4 className="text-md font-medium mb-2 text-blue-600">{subjectName}</h4>
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full bg-white border border-gray-200">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Type</th>
                                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Marks</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {sessions.map(session => (
                                                            <tr key={session.exam_session_id}>
                                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{session.exam_type_name}</td>
                                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{new Date(session.exam_date).toLocaleDateString()}</td>
                                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{session.max_marks}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExamSessions;