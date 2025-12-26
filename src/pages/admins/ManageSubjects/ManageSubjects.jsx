import React, { useMemo } from 'react';
import useSubject from '../../../hooks/useSubject';
import useDepartment from '../../../hooks/useDepartment';

const ManageSubjects = () => {
    const [subjects] = useSubject();
    const [departments] = useDepartment();
    
    // Group subjects by department_id
    const subjectsByDepartment = useMemo(() => {
        if (!subjects.length || !departments.length) return {};
        
        const grouped = {};
        
        // Initialize groups for all departments
        departments.forEach(dept => {
            grouped[dept.department_id] = {
                department: dept,
                subjects: []
            };
        });
        
        // Add subjects to their respective departments
        subjects.forEach(subject => {
            if (grouped[subject.department_id]) {
                grouped[subject.department_id].subjects.push(subject);
            }
        });
        
        return grouped;
    }, [subjects, departments]);
    
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Manage Subjects</h1>
            
            {Object.keys(subjectsByDepartment).length > 0 ? (
                Object.values(subjectsByDepartment).map(({ department, subjects: deptSubjects }) => (
                    <div key={department.department_id} className="mb-8">
                        <h2 className="text-xl font-semibold mb-4 text-blue-600">
                            {department.name}
                        </h2>
                        
                        {deptSubjects.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Subject Code
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Default Marks
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Credit Hours
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {deptSubjects.map(subject => (
                                            <tr key={subject.subject_id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {subject.subject_code}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {subject.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex space-x-2">
                                                        {subject.is_theory && (
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                Theory
                                                            </span>
                                                        )}
                                                        {subject.is_practical && (
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                                Practical
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {subject.default_marks}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {subject.credit_hours}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No subjects found for this department.</p>
                        )}
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No departments or subjects available.</p>
            )}
        </div>
    );
};

export default ManageSubjects;