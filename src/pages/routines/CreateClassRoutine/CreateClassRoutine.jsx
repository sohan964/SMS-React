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
        <div className="w-full">
  <label className="text-sm text-gray-600">{label}</label>

  <div className="relative mt-1" onClick={handleDropdownClick}>
    <input
      type="text"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
      value={
        search ||
        (value
          ? options.find(opt => opt[optionValue] == value)?.[optionLabel]
          : "")
      }
      onChange={(e) => {
        setSearch(e.target.value);
        setShowDropdown(true);
      }}
      onClick={handleInputClick}
      onFocus={() => setShowDropdown(true)}
      placeholder={`Search ${label.toLowerCase()}...`}
    />

    {showDropdown && (
      <div className="absolute z-10 w-full bg-white/95 backdrop-blur-md border border-gray-200 rounded-lg mt-1 max-h-60 overflow-auto shadow-lg">
        {filteredOptions.length > 0 ? (
          filteredOptions.map(option => (
            <div
              key={option[optionValue]}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700"
              onClick={() => handleOptionClick(option)}
            >
              {option[optionLabel]}
            </div>
          ))
        ) : (
          <div className="px-4 py-2 text-gray-400 text-sm">
            No options found
          </div>
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

    // Filter subjects based on selected section's department and common department (department_id = 5)
    const filteredSubjects = React.useMemo(() => {
        if (!selectedSection || !subjects || !sections) return [];
        
        const selectedSectionData = sections.find(s => s.section_id === parseInt(selectedSection));
        if (!selectedSectionData) return [];
        
        return subjects.filter(subject =>
            subject.department_id === 5 || subject.department_id === selectedSectionData.department_id
        );
    }, [selectedSection, subjects, sections]);

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

    // Reset subject when section changes
    useEffect(() => {
        if (selectedSection) {
            setTimeout(() => {
                setSelectedSubject('');
                setSubjectSearch('');
            }, 0);
        }
    }, [selectedSection]);

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
  <div className="space-y-6">

    {/* HEADER */}
    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl p-6 shadow-md">
      <h2 className="text-2xl font-bold">
        Create Class Routine
      </h2>
      <p className="text-sm opacity-90">
        Assign teachers, subjects, and schedules efficiently
      </p>
    </div>

    {/* FORM CARD */}
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-6 max-w-2xl mx-auto">

      <form onSubmit={handleSubmit} className="space-y-4">

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

        <SearchableDropdown
          label="Teacher"
          value={selectedTeacher}
          setValue={setSelectedTeacher}
          search={teacherSearch}
          setSearch={setTeacherSearch}
          showDropdown={showTeacherDropdown}
          setShowDropdown={setShowTeacherDropdown}
          options={teachers.map(t => ({
            ...t,
            full_name: `${t.first_name} ${t.last_name}`
          }))}
          optionLabel="full_name"
          optionValue="teacher_id"
        />

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

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:scale-[1.02] transition"
        >
          Add Routine
        </button>

      </form>
    </div>

  </div>
);
};

export default CreateClassRoutine;