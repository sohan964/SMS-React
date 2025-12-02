import React, { useState, useEffect, useRef } from 'react';
import useAcademicYear from '../../../hooks/useAcademicYear';
import useTeacher from '../../../hooks/useTeacher';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const TeacherRoutines = () => {
    const [years, YEARS_LOADING] = useAcademicYear();
    const [teachers, TEACHERS_LOADING] = useTeacher();
    const axiosPublic = useAxiosPublic();
    
    // State management
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [routineData, setRoutineData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    // Filter states for searchable dropdowns
    const [yearFilter, setYearFilter] = useState('');
    const [teacherFilter, setTeacherFilter] = useState('');
    
    // Dropdown visibility states
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
    const [isTeacherDropdownOpen, setIsTeacherDropdownOpen] = useState(false);
    
    // Refs for click outside detection
    const yearDropdownRef = useRef(null);
    const teacherDropdownRef = useRef(null);
    
    // Handle click outside to close dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) {
                setIsYearDropdownOpen(false);
            }
            if (teacherDropdownRef.current && !teacherDropdownRef.current.contains(event.target)) {
                setIsTeacherDropdownOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedYear || !selectedTeacher) {
            setError('Please select both academic year and teacher');
            return;
        }
        
        setIsLoading(true);
        setError('');
        
        try {
            const response = await axiosPublic.get(`/ClassRoutines/teacher-routine/${selectedTeacher}/${selectedYear}`);
            console.log(response.data);
            setRoutineData(response.data.data || []);
        } catch (err) {
            setError('Failed to fetch routine data. Please try again.');
            console.error('Error fetching routine data:', err);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Filtered options for dropdowns
    const filteredYears = years.filter(year =>
        year.year_lable && year.year_lable.toLowerCase().includes(yearFilter.toLowerCase())
    );
    
    const filteredTeachers = teachers.filter(teacher =>
        teacher.first_name && teacher.last_name &&
        `${teacher.first_name} ${teacher.last_name}`.toLowerCase().includes(teacherFilter.toLowerCase())
    );
    
    // Handle year selection
    const handleYearSelect = (year) => {
        setSelectedYear(year.year_id);
        setYearFilter(year.year_lable);
        setIsYearDropdownOpen(false);
    };
    
    // Handle teacher selection
    const handleTeacherSelect = (teacher) => {
        setSelectedTeacher(teacher.teacher_id);
        setTeacherFilter(`${teacher.first_name} ${teacher.last_name}`);
        setIsTeacherDropdownOpen(false);
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Teacher Routines</h2>
            
            {/* Form Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Academic Year Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Academic Year
                            </label>
                            <div className="relative" ref={yearDropdownRef}>
                                <input
                                    type="text"
                                    placeholder="Search academic year..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={yearFilter}
                                    onChange={(e) => {
                                        setYearFilter(e.target.value);
                                        setIsYearDropdownOpen(true);
                                    }}
                                    onFocus={() => setIsYearDropdownOpen(true)}
                                />
                                {isYearDropdownOpen && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {filteredYears.length > 0 ? (
                                            filteredYears.map((year) => (
                                                <div
                                                    key={year.year_id}
                                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => handleYearSelect(year)}
                                                >
                                                    {year.year_lable}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-3 py-2 text-gray-500">No years found</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Teacher Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Teacher
                            </label>
                            <div className="relative" ref={teacherDropdownRef}>
                                <input
                                    type="text"
                                    placeholder="Search teacher..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={teacherFilter}
                                    onChange={(e) => {
                                        setTeacherFilter(e.target.value);
                                        setIsTeacherDropdownOpen(true);
                                    }}
                                    onFocus={() => setIsTeacherDropdownOpen(true)}
                                />
                                {isTeacherDropdownOpen && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {filteredTeachers.length > 0 ? (
                                            filteredTeachers.map((teacher) => (
                                                <div
                                                    key={teacher.teacher_id}
                                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => handleTeacherSelect(teacher)}
                                                >
                                                    {teacher.first_name} {teacher.last_name}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-3 py-2 text-gray-500">No teachers found</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Get Routine'}
                    </button>
                </form>
                
                {/* Error Message */}
                {error && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                        {error}
                    </div>
                )}
            </div>
            
            {/* Routine Table */}
            {routineData.length > 0 && (
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
            )}
            
            {/* No Data Message */}
            {!isLoading && routineData.length === 0 && selectedYear && selectedTeacher && !error && (
                <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
                    No routine data found for the selected teacher and academic year.
                </div>
            )}
        </div>
    );
};

export default TeacherRoutines;