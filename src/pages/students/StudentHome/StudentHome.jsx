import React from 'react';
import useStudentData from '../../../hooks/useStudentData';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaGraduationCap, FaIdCard } from 'react-icons/fa';

const StudentHome = () => {
    const [studentData, loading] = useStudentData();
    console.log("Student Data in Home:", studentData);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    if (!studentData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Student data not found!</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-3xl font-bold text-center mb-6 text-primary">
                        Student Profile
                    </h2>
                    
                    {/* Profile Image and Basic Info */}
                    <div className="flex flex-col md:flex-row gap-6 mb-8">
                        <div className="shrink-0">
                            <div className="avatar">
                                <div className="w-32 h-32 rounded-lg ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img
                                        src={studentData.photo || 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'}
                                        alt={`${studentData.first_name} ${studentData.last_name}`}
                                        className="object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg';
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="grow">
                            <h3 className="text-2xl font-bold mb-2">
                                {studentData.first_name} {studentData.last_name}
                            </h3>
                            <div className="badge badge-primary badge-lg mb-2">
                                {studentData.class_name} - {studentData.section_name}
                            </div>
                            <div className="text-gray-600">
                                Student ID: {studentData.student_number}
                            </div>
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="divider">Personal Information</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <FaIdCard className="text-primary" />
                            <div>
                                <span className="font-semibold">Student Number:</span>
                                <span className="ml-2">{studentData.student_number}</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <FaCalendarAlt className="text-primary" />
                            <div>
                                <span className="font-semibold">Date of Birth:</span>
                                <span className="ml-2">{studentData.dob}</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <FaUser className="text-primary" />
                            <div>
                                <span className="font-semibold">Gender:</span>
                                <span className="ml-2">{studentData.gender === 'M' ? 'Male' : 'Female'}</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <FaGraduationCap className="text-primary" />
                            <div>
                                <span className="font-semibold">Admission Year:</span>
                                <span className="ml-2">{studentData.admission_year}</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="divider">Contact Information</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <FaEnvelope className="text-primary" />
                            <div>
                                <span className="font-semibold">Email:</span>
                                <span className="ml-2">{studentData.email}</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <FaPhone className="text-primary" />
                            <div>
                                <span className="font-semibold">Phone:</span>
                                <span className="ml-2">{studentData.phoneNumber || 'Not provided'}</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3 md:col-span-2">
                            <FaMapMarkerAlt className="text-primary" />
                            <div>
                                <span className="font-semibold">Address:</span>
                                <span className="ml-2">{studentData.address}</span>
                            </div>
                        </div>
                    </div>

                    {/* Academic Information */}
                    <div className="divider">Academic Information</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="stat bg-primary text-primary-content rounded-lg">
                            <div className="stat-title">Class</div>
                            <div className="stat-value text-2xl">{studentData.class_name}</div>
                        </div>
                        
                        <div className="stat bg-secondary text-secondary-content rounded-lg">
                            <div className="stat-title">Section</div>
                            <div className="stat-value text-2xl">{studentData.section_name}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentHome;