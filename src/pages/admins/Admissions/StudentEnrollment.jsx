import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useStudent from '../../../hooks/useStudent';
import useAcademicYear from '../../../hooks/useAcademicYear';
import useDepartment from '../../../hooks/useDepartment';
import useClass from '../../../hooks/useClass';
import useSection from '../../../hooks/useSection';

const StudentEnrollment = () => {
    const axiosSecure = useAxiosSecure();
    const [students] = useStudent();
    const [years] = useAcademicYear();
    const [departments] = useDepartment();
    const [classes] = useClass();
    const [sections] = useSection();
    
    // Form state
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [SELECTED_SECTION, setSelectedSection] = useState(null);
    const [studentSearchTerm, setStudentSearchTerm] = useState('');
    const [showStudentDropdown, setShowStudentDropdown] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Filtered options
    const [filteredClasses, setFilteredClasses] = useState([]);
    const [filteredSections, setFilteredSections] = useState([]);
    
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    
    // Filter students based on search term
    const filteredStudents = students?.filter(student => 
        student.student_number?.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
        `${student.first_name} ${student.last_name}`?.toLowerCase().includes(studentSearchTerm.toLowerCase())
    ) || [];
    
    // Update filtered classes when department changes
    useEffect(() => {
        if (selectedDepartment && classes) {
            const filtered = classes.filter(cls => {
                // This is a basic filter - you might need to adjust based on your data structure
                // If classes don't have department_id, you might need to filter through sections
                return cls.class_name; // Placeholder - adjust based on your actual data structure
            });
            setFilteredClasses(filtered);
        } else {
            setFilteredClasses(classes || []);
        }
    }, [selectedDepartment, classes]);
    
    // Update filtered sections when department or class changes
    useEffect(() => {
        if (selectedDepartment && selectedClass && sections) {
            const filtered = sections.filter(section => 
                section.department_id === selectedDepartment && section.class_id === selectedClass
            );
            setFilteredSections(filtered);
        } else {
            setFilteredSections([]);
        }
    }, [selectedDepartment, selectedClass, sections]);
    
    // Handle student selection
    const handleStudentSelect = (student) => {
        setValue('student_id', student.student_id);
        setStudentSearchTerm(`${student.student_number} - ${student.first_name} ${student.last_name}`);
        setShowStudentDropdown(false);
    };
    
    // Handle department selection
    const handleDepartmentChange = (deptId) => {
        setSelectedDepartment(deptId);
        setValue('department_id', deptId);
        setSelectedClass(null);
        setSelectedSection(null);
        setValue('class_id', '');
        setValue('section_id', '');
    };
    
    // Handle class selection
    const handleClassChange = (classId) => {
        setSelectedClass(classId);
        setValue('class_id', classId);
        setSelectedSection(null);
        setValue('section_id', '');
    };
    
    // Handle section selection
    const handleSectionChange = (sectionId) => {
        setSelectedSection(sectionId);
        setValue('section_id', sectionId);
    };
    
    // Format date from mm/dd/yyyy to yyyy-mm-dd for API
    const formatDateForAPI = (dateString) => {
        if (!dateString) return '';
        const [month, day, year] = dateString.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };
    
    // Handle form submission
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        
        try {
            const enrollmentData = {
                student_id: parseInt(data.student_id),
                year_id: parseInt(data.year_id),
                class_id: parseInt(data.class_id),
                section_id: parseInt(data.section_id),
                admission_date: formatDateForAPI(data.admission_date),
                status: data.status
            };
            
            const response = await axiosSecure.post("/Enrollments/new-enrollment", enrollmentData);
            
            if (response.data.success) {
                toast.success('Student enrolled successfully!');
                reset();
                setSelectedDepartment(null);
                setSelectedClass(null);
                setSelectedSection(null);
                setStudentSearchTerm('');
            } else {
                toast.error(response.data.message || 'Failed to enroll student');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred while enrolling student';
            toast.error(errorMessage);
            console.error('Enrollment error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Student Enrollment</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Student Search Dropdown */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Student
                        </label>
                        <input
                            type="text"
                            value={studentSearchTerm}
                            onChange={(e) => {
                                setStudentSearchTerm(e.target.value);
                                setShowStudentDropdown(true);
                            }}
                            onFocus={() => setShowStudentDropdown(true)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Search by student number or name"
                        />
                        <input
                            type="hidden"
                            {...register('student_id', { required: 'Student is required' })}
                        />
                        {errors.student_id && (
                            <p className="text-red-500 text-xs mt-1">{errors.student_id.message}</p>
                        )}
                        
                        {/* Student Dropdown */}
                        {showStudentDropdown && studentSearchTerm && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map((student) => (
                                        <div
                                            key={student.student_id}
                                            onClick={() => handleStudentSelect(student)}
                                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                                        >
                                            <div className="font-medium">{student.student_number}</div>
                                            <div className="text-sm text-gray-600">
                                                {student.first_name} {student.last_name}
                                            </div>
                                            {student.class_name && (
                                                <div className="text-xs text-gray-500">
                                                    Class: {student.class_name} {student.section_name && `- ${student.section_name}`}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-3 py-2 text-gray-500">No students found</div>
                                )}
                            </div>
                        )}
                    </div>
                    
                    {/* Year Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Academic Year
                        </label>
                        <select
                            {...register('year_id', { required: 'Academic year is required' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select academic year</option>
                            {years && years.map((year) => (
                                <option key={year.year_id} value={year.year_id}>
                                    {year.year_lable}
                                </option>
                            ))}
                        </select>
                        {errors.year_id && (
                            <p className="text-red-500 text-xs mt-1">{errors.year_id.message}</p>
                        )}
                    </div>
                    
                    {/* Department Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Department
                        </label>
                        <select
                            {...register('department_id', { required: 'Department is required' })}
                            onChange={(e) => handleDepartmentChange(parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select department</option>
                            {departments && departments.map((dept) => (
                                <option key={dept.department_id} value={dept.department_id}>
                                    {dept.name} ({dept.code})
                                </option>
                            ))}
                        </select>
                        {errors.department_id && (
                            <p className="text-red-500 text-xs mt-1">{errors.department_id.message}</p>
                        )}
                    </div>
                    
                    {/* Class Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Class
                        </label>
                        <select
                            {...register('class_id', { required: 'Class is required' })}
                            onChange={(e) => handleClassChange(parseInt(e.target.value))}
                            disabled={!selectedDepartment}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        >
                            <option value="">Select class</option>
                            {filteredClasses && filteredClasses.map((cls) => (
                                <option key={cls.class_id} value={cls.class_id}>
                                    {cls.class_name}
                                </option>
                            ))}
                        </select>
                        {errors.class_id && (
                            <p className="text-red-500 text-xs mt-1">{errors.class_id.message}</p>
                        )}
                    </div>
                    
                    {/* Section Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Section
                        </label>
                        <select
                            {...register('section_id', { required: 'Section is required' })}
                            onChange={(e) => handleSectionChange(parseInt(e.target.value))}
                            disabled={!selectedDepartment || !selectedClass}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        >
                            <option value="">Select section</option>
                            {filteredSections && filteredSections.map((section) => (
                                <option key={section.section_id} value={section.section_id}>
                                    {section.section_name} (Capacity: {section.capacity})
                                </option>
                            ))}
                        </select>
                        {errors.section_id && (
                            <p className="text-red-500 text-xs mt-1">{errors.section_id.message}</p>
                        )}
                    </div>
                    
                    {/* Admission Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Admission Date (MM/DD/YYYY)
                        </label>
                        <input
                            type="text"
                            {...register('admission_date', {
                                required: 'Admission date is required',
                                pattern: {
                                    value: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
                                    message: 'Please enter a valid date in MM/DD/YYYY format'
                                }
                            })}
                            placeholder="MM/DD/YYYY"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.admission_date && (
                            <p className="text-red-500 text-xs mt-1">{errors.admission_date.message}</p>
                        )}
                    </div>
                    
                    {/* Status Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            {...register('status', { required: 'Status is required' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select status</option>
                            <option value="Active">Active</option>
                            <option value="Drop">Drop</option>
                            <option value="Pass">Pass</option>
                        </select>
                        {errors.status && (
                            <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>
                        )}
                    </div>
                    
                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium disabled:bg-blue-300"
                    >
                        {isSubmitting ? 'Processing...' : 'Enroll Student'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentEnrollment;