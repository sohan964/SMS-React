import React, { useState, useEffect } from 'react';
import useAcademicYear from '../../../hooks/useAcademicYear';
import useClass from '../../../hooks/useClass';
import useSlot from '../../../hooks/useSlot';
import useDay from '../../../hooks/useDay';
import useTeacher from '../../../hooks/useTeacher';
import useSection from '../../../hooks/useSection';
import useSubject from '../../../hooks/useSubject';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

// Searchable dropdown component
const SearchableDropdown = ({
    label,
    value,
    setValue,
    search,
    setSearch,
    showDropdown,
    setShowDropdown,
    options,
    optionLabel,
    optionValue
}) => {
    const filteredOptions = options.filter(option =>
        option[optionLabel].toLowerCase().includes(search.toLowerCase())
    );

    const handleInputClick = (e) => {
        e.stopPropagation();
        setShowDropdown(true);
    };

    const handleOptionClick = (option) => {
        setValue(option[optionValue]);
        setSearch(option[optionLabel]);
        setShowDropdown(false);
    };

    const handleDropdownClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <div className="relative" onClick={handleDropdownClick}>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={search || (value ? options.find(opt => opt[optionValue] == value)?.[optionLabel] : '')}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setShowDropdown(true);
                    }}
                    onClick={handleInputClick}
                    onFocus={() => setShowDropdown(true)}
                    placeholder={`Search ${label.toLowerCase()}...`}
                />
                {showDropdown && (
                    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map(option => (
                                <div
                                    key={option[optionValue]}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option[optionLabel]}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-gray-500">No options found</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const CreateClassRoutine = () => {
    const axiosSecure = useAxiosSecure();
    const [years] = useAcademicYear();
    const [classes] = useClass();
    const [slots] = useSlot();
    const [days] = useDay();
    const [teachers] = useTeacher();
    const [sections] = useSection();
    const [subjects] = useSubject();

    // Form state
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');

    // Search states
    const [yearSearch, setYearSearch] = useState('');
    const [classSearch, setClassSearch] = useState('');
    const [sectionSearch, setSectionSearch] = useState('');
    const [subjectSearch, setSubjectSearch] = useState('');
    const [teacherSearch, setTeacherSearch] = useState('');
    const [daySearch, setDaySearch] = useState('');
    const [slotSearch, setSlotSearch] = useState('');

    // Dropdown visibility states
    const [showYearDropdown, setShowYearDropdown] = useState(false);
    const [showClassDropdown, setShowClassDropdown] = useState(false);
    const [showSectionDropdown, setShowSectionDropdown] = useState(false);
    const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
    const [showTeacherDropdown, setShowTeacherDropdown] = useState(false);
    const [showDayDropdown, setShowDayDropdown] = useState(false);
    const [showSlotDropdown, setShowSlotDropdown] = useState(false);

    // Close all dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setShowYearDropdown(false);
            setShowClassDropdown(false);
            setShowSectionDropdown(false);
            setShowSubjectDropdown(false);
            setShowTeacherDropdown(false);
            setShowDayDropdown(false);
            setShowSlotDropdown(false);
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Filter sections based on selected class
    const filteredSections = sections.filter(section => 
        selectedClass ? section.class_id === parseInt(selectedClass) : true
    );

    // Filter subjects based on selected class
    // Note: Based on the sample data, subjects don't have class_id, so we'll show all subjects
    // This can be adjusted based on your actual data structure
    const filteredSubjects = subjects;

    // Reset dependent fields when class changes
    useEffect(() => {
        if (selectedClass) {
            // Use setTimeout to avoid cascading renders
            setTimeout(() => {
                setSelectedSection('');
                setSelectedSubject('');
                setSectionSearch('');
                setSubjectSearch('');
            }, 0);
        }
    }, [selectedClass]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedYear || !selectedClass || !selectedSection || !selectedSubject || 
            !selectedTeacher || !selectedDay || !selectedSlot) {
            toast.error('Please select all fields');
            return;
        }

        const routineData = {
            year_id: parseInt(selectedYear),
            class_id: parseInt(selectedClass),
            section_id: parseInt(selectedSection),
            subject_id: parseInt(selectedSubject),
            teacher_id: parseInt(selectedTeacher),
            day_id: parseInt(selectedDay),
            slot_id: parseInt(selectedSlot)
        };

        try {
            const response = await axiosSecure.post("/ClassRoutines/add-routine", routineData);
            
            if (response.data.success) {
                toast.success('Routine added successfully');
                // Reset form
                setSelectedYear('');
                setSelectedClass('');
                setSelectedSection('');
                setSelectedSubject('');
                setSelectedTeacher('');
                setSelectedDay('');
                setSelectedSlot('');
                setYearSearch('');
                setClassSearch('');
                setSectionSearch('');
                setSubjectSearch('');
                setTeacherSearch('');
                setDaySearch('');
                setSlotSearch('');
            } else {
                toast.error(response.data.message || 'Failed to add routine');
            }
        } catch (error) {
            console.error('Error adding routine:', error);
            toast.error(error.response?.data?.message || 'Error adding routine');
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Create Class Routine</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
                {/* Year Dropdown */}
                <SearchableDropdown
                    label="Academic Year"
                    value={selectedYear}
                    setValue={setSelectedYear}
                    search={yearSearch}
                    setSearch={setYearSearch}
                    showDropdown={showYearDropdown}
                    setShowDropdown={setShowYearDropdown}
                    options={years}
                    optionLabel="year_lable"
                    optionValue="year_id"
                />

                {/* Class Dropdown */}
                <SearchableDropdown
                    label="Class"
                    value={selectedClass}
                    setValue={setSelectedClass}
                    search={classSearch}
                    setSearch={setClassSearch}
                    showDropdown={showClassDropdown}
                    setShowDropdown={setShowClassDropdown}
                    options={classes}
                    optionLabel="class_name"
                    optionValue="class_id"
                />

                {/* Section Dropdown (filtered by class) */}
                <SearchableDropdown
                    label="Section"
                    value={selectedSection}
                    setValue={setSelectedSection}
                    search={sectionSearch}
                    setSearch={setSectionSearch}
                    showDropdown={showSectionDropdown}
                    setShowDropdown={setShowSectionDropdown}
                    options={filteredSections}
                    optionLabel="section_name"
                    optionValue="section_id"
                />

                {/* Subject Dropdown (filtered by class) */}
                <SearchableDropdown
                    label="Subject"
                    value={selectedSubject}
                    setValue={setSelectedSubject}
                    search={subjectSearch}
                    setSearch={setSubjectSearch}
                    showDropdown={showSubjectDropdown}
                    setShowDropdown={setShowSubjectDropdown}
                    options={filteredSubjects}
                    optionLabel="name"
                    optionValue="subject_id"
                />

                {/* Teacher Dropdown */}
                <SearchableDropdown
                    label="Teacher"
                    value={selectedTeacher}
                    setValue={setSelectedTeacher}
                    search={teacherSearch}
                    setSearch={setTeacherSearch}
                    showDropdown={showTeacherDropdown}
                    setShowDropdown={setShowTeacherDropdown}
                    options={teachers.map(teacher => ({
                        ...teacher,
                        full_name: `${teacher.first_name} ${teacher.last_name}`
                    }))}
                    optionLabel="full_name"
                    optionValue="teacher_id"
                />

                {/* Day Dropdown */}
                <SearchableDropdown
                    label="Day"
                    value={selectedDay}
                    setValue={setSelectedDay}
                    search={daySearch}
                    setSearch={setDaySearch}
                    showDropdown={showDayDropdown}
                    setShowDropdown={setShowDayDropdown}
                    options={days}
                    optionLabel="day_name"
                    optionValue="day_id"
                />

                {/* Slot Dropdown */}
                <SearchableDropdown
                    label="Time Slot"
                    value={selectedSlot}
                    setValue={setSelectedSlot}
                    search={slotSearch}
                    setSearch={setSlotSearch}
                    showDropdown={showSlotDropdown}
                    setShowDropdown={setShowSlotDropdown}
                    options={slots.map(slot => ({
                        ...slot,
                        time_range: `${slot.start_time} - ${slot.end_time}`
                    }))}
                    optionLabel="time_range"
                    optionValue="slot_id"
                />

                {/* Submit Button */}
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary w-full">
                        Add Routine
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateClassRoutine;