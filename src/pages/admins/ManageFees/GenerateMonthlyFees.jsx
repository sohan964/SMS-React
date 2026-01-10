import React, { useState, useEffect } from 'react';
import useAcademicYear from '../../../hooks/useAcademicYear';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const GenerateMonthlyFees = () => {
    const [years] = useAcademicYear();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    // console.log(years);
    const [selectedYear, setSelectedYear] = useState('');
    const [feeMonths, setFeeMonths] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Fetch fee months when year changes
    useEffect(() => {
        if (selectedYear) {
            fetchFeeMonths();
        } else {
            setFeeMonths([]);
            setSelectedMonth('');
        }
    }, [selectedYear]);
    
    const fetchFeeMonths = async () => {
        try {
            const res = await axiosPublic.get(`/StudentFees/get-fee-months/${selectedYear}`);
            setFeeMonths(res.data.data || []);
            console.log(res.data.data);
            setSelectedMonth('');
        } catch (error) {
            console.error('Error fetching fee months:', error);
            toast.error('Failed to fetch fee months');
            setFeeMonths([]);
        }
    };
    
    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };
    
    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };
    
    const handleDueDateChange = (e) => {
        setDueDate(e.target.value);
    };
    
    const handleGenerateFees = async (e) => {
        e.preventDefault();
        
        if (!selectedYear || !selectedMonth || !dueDate) {
            toast.error('Please fill all fields');
            return;
        }
        
        setIsLoading(true);
        
        try {
            const feeData = {
                year_id: parseInt(selectedYear),
                fee_month_id: parseInt(selectedMonth),
                due_date: dueDate
            };
            
            const res = await axiosSecure.post('/StudentFees/add-students-fees', feeData);
            
            if (res.data.success) {
                toast.success(res.data.message || 'Successfully added fees for all students');
                // Reset form
                setSelectedYear('');
                setSelectedMonth('');
                setDueDate('');
                setFeeMonths([]);
            } else {
                toast.error(res.data.message || 'Failed to add fees');
            }
        } catch (error) {
            console.error('Error generating fees:', error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message || 'Fees already added for this month');
            } else {
                toast.error('Failed to generate fees');
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Generate Monthly Fees</h2>
            
            <form onSubmit={handleGenerateFees} className="space-y-4">
                {/* Year Dropdown */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Academic Year</span>
                    </label>
                    <select 
                        className="select select-bordered w-full" 
                        value={selectedYear}
                        onChange={handleYearChange}
                        required
                    >
                        <option value="">Select Year</option>
                        {years.map(year => (
                            <option key={year.year_id} value={year.year_id}>
                                {year.year_lable}
                            </option>
                        ))}
                    </select>
                </div>
                
                {/* Month Dropdown */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Fee Month</span>
                    </label>
                    <select 
                        className="select select-bordered w-full" 
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        disabled={!selectedYear || feeMonths.length === 0}
                        required
                    >
                        <option value="">Select Month</option>
                        {feeMonths.map(month => (
                            <option key={month.fee_month_id} value={month.fee_month_id}>
                                {month.month_name}
                            </option>
                        ))}
                    </select>
                </div>
                
                {/* Due Date Input */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Due Date</span>
                    </label>
                    <input 
                        type="date" 
                        className="input input-bordered w-full" 
                        value={dueDate}
                        onChange={handleDueDateChange}
                        required
                    />
                </div>
                
                {/* Generate Button */}
                <div className="form-control mt-6">
                    <button 
                        type="submit" 
                        className="btn btn-primary w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="loading loading-spinner"></span>
                                Generating...
                            </>
                        ) : (
                            'Generate Monthly Fees'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GenerateMonthlyFees;