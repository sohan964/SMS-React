import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useStudentData from '../../../hooks/useStudentData';

const StudentPayList = () => {
    const axiosSecure = useAxiosSecure();
    const [studentData] = useStudentData();
    const [paymentData, setPaymentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaymentData = async () => {
            if (!studentData?.current_enrollment_id) {
                setLoading(false);
                return;
            }

            try {
                const response = await axiosSecure.get(`/StudentFees/get-student-due/${studentData.current_enrollment_id}`);
                if (response.data.success && response.data.data) {
                    setPaymentData(response.data.data);
                } else {
                    setPaymentData([]);
                }
            } catch {
                setError('Failed to fetch payment data');
                setPaymentData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentData();
    }, [studentData, axiosSecure]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        );
    }

    if (!studentData?.current_enrollment_id) {
        return (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Notice: </strong>
                <span className="block sm:inline">No enrollment information available.</span>
            </div>
        );
    }

    if (!paymentData || paymentData.length === 0) {
        return (
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Info: </strong>
                <span className="block sm:inline">No payment records found for this student.</span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Payment List</h2>
            
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Year
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Month
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fee Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Paid Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Due Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Due Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paymentData.map((payment) => (
                                <tr key={payment.student_fee_id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {payment.year_label}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {payment.month_name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ৳{payment.fee_amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ৳{payment.paid_amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                        ৳{payment.due_amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {new Date(payment.due_date).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            payment.payment_status === 'Paid' 
                                                ? 'bg-green-100 text-green-800' 
                                                : payment.payment_status === 'Partial'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {payment.payment_status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Summary Section */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-600 uppercase">Total Fee Amount</h3>
                    <p className="text-2xl font-bold text-blue-800 mt-1">
                        ৳{paymentData.reduce((sum, p) => sum + p.fee_amount, 0).toLocaleString()}
                    </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-green-600 uppercase">Total Paid Amount</h3>
                    <p className="text-2xl font-bold text-green-800 mt-1">
                        ৳{paymentData.reduce((sum, p) => sum + p.paid_amount, 0).toLocaleString()}
                    </p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-red-600 uppercase">Total Due Amount</h3>
                    <p className="text-2xl font-bold text-red-800 mt-1">
                        ৳{paymentData.reduce((sum, p) => sum + p.due_amount, 0).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StudentPayList;
