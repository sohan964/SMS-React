import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useStudentData from '../../../hooks/useStudentData';
import { useQuery } from '@tanstack/react-query';
import { FiCalendar, FiDollarSign, FiAlertCircle } from 'react-icons/fi';

const UnpaidFees = () => {
    const [studentData] = useStudentData();
    const axiosSecure = useAxiosSecure();

    const { data: dueFees = [], isLoading, error } = useQuery({
        queryKey: ['dueFees', studentData?.current_enrollment_id],
        queryFn: async () => {
            if (!studentData?.current_enrollment_id) return [];
            const res = await axiosSecure.get(`/StudentFees/get-student-due/${studentData.current_enrollment_id}`);
            return res.data.data;
        },
        enabled: !!studentData?.current_enrollment_id
    });

    // Calculate total due amount
    const totalDue = dueFees.reduce((sum, fee) => sum + fee.due_amount, 0);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-error shadow-lg">
                <div>
                    <FiAlertCircle className="stroke-current shrink-0 h-6 w-6" />
                    <span>Error loading fee data. Please try again later.</span>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="card bg-gradient-to-r from-primary to-secondary text-white shadow-xl mb-6">
                <div className="card-body">
                    <h2 className="card-title text-2xl">Unpaid Fees</h2>
                    <div className="flex items-center justify-between">
                        <div className="stat">
                            <div className="stat-title text-white/80">Total Due Amount</div>
                            <div className="stat-value text-3xl">৳{totalDue.toLocaleString()}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title text-white/80">Pending Payments</div>
                            <div className="stat-value text-2xl">{dueFees.length}</div>
                        </div>
                    </div>
                </div>
            </div>

            {dueFees.length === 0 ? (
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body text-center">
                        <div className="text-6xl text-success mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold">No Due Fees</h3>
                        <p className="text-base-content/70">Great! You don't have any pending fees.</p>
                    </div>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className="rounded-tl-lg">Year</th>
                                <th>Month</th>
                                <th>Fee Amount</th>
                                <th>Paid Amount</th>
                                <th>Due Amount</th>
                                <th>Due Date</th>
                                <th className="rounded-tr-lg">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dueFees.map((fee, index) => (
                                <tr key={fee.student_fee_id} className={index % 2 === 0 ? "bg-base-200" : "bg-base-100"}>
                                    <td className="font-medium">{fee.year_label}</td>
                                    <td>{fee.month_name}</td>
                                    <td className="font-semibold">৳{fee.fee_amount.toLocaleString()}</td>
                                    <td>৳{fee.paid_amount.toLocaleString()}</td>
                                    <td className="font-semibold text-error">৳{fee.due_amount.toLocaleString()}</td>
                                    <td className="flex items-center gap-2">
                                        <FiCalendar className="text-primary" />
                                        {new Date(fee.due_date).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <div className="badge badge-error gap-2">
                                            <FiAlertCircle />
                                            {fee.payment_status}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-primary text-white">
                                <th colSpan="4" className="text-right">Total Due:</th>
                                <th colSpan="3" className="text-xl font-bold">৳{totalDue.toLocaleString()}</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UnpaidFees;