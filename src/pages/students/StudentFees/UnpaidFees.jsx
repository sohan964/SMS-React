import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useStudentData from '../../../hooks/useStudentData';
import { useQuery } from '@tanstack/react-query';
import { FiCalendar, FiDollarSign, FiAlertCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const UnpaidFees = () => {
    const [studentData] = useStudentData();
    const axiosSecure = useAxiosSecure();
    const [selectedFee, setSelectedFee] = useState(null);
    const [paymentData, setPaymentData] = useState({
        student_fee_id: 0,
        paid_amount: '',
        payment_method: 'Bkash',
        reference_no: ''
    });

    const { data: apiResponse, isLoading, error } = useQuery({
        queryKey: ['dueFees', studentData?.current_enrollment_id],
        queryFn: async () => {
            if (!studentData?.current_enrollment_id) return { success: false, message: "No enrollment ID", data: null };
            const res = await axiosSecure.get(`/StudentFees/get-student-due/${studentData.current_enrollment_id}`);
            return res.data;
        },
        enabled: !!studentData?.current_enrollment_id
    });
    
    // Extract dueFees from the API response
    const allFees = apiResponse?.success && apiResponse?.data ? apiResponse.data : [];
    // Filter only unpaid fees (due_amount > 0)
    const dueFees = allFees.filter(fee => fee.due_amount > 0);
    console.log(apiResponse);
    // Calculate total due amount
    const totalDue = dueFees?.reduce((sum, fee) => sum + fee.due_amount, 0) || 0;

    // Handle payment submission
    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        
        // Validate payment amount
        const amount = parseFloat(paymentData.paid_amount);
        if (isNaN(amount) || amount <= 0) {
            toast.error("Payment amount must be greater than 0");
            return;
        }
        
        if (selectedFee && amount > selectedFee.due_amount) {
            toast.error(`Payment amount cannot exceed the due amount of ৳${selectedFee.due_amount.toLocaleString()}`);
            return;
        }
        
        try {
            const response = await axiosSecure.post("/StudentPayments/submit-payment", {
                student_fee_id: paymentData.student_fee_id,
                paid_amount: amount,
                payment_method: paymentData.payment_method,
                reference_no: paymentData.reference_no
            });

            if (response.data.success) {
                toast.success(response.data.message || "Payment Success");
                // Close the modal
                document.getElementById('payment_modal').close();
                // Reset form
                setPaymentData({
                    student_fee_id: 0,
                    paid_amount: '',
                    payment_method: 'Bkash',
                    reference_no: ''
                });
                setSelectedFee(null);
                // Optionally refetch data to update the UI
                window.location.reload();
            } else {
                toast.error(response.data.message || "Payment Failed");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Payment Failed");
        }
    };

    // Open modal with fee data
    const openPaymentModal = (fee) => {
        setSelectedFee(fee);
        setPaymentData({
            ...paymentData,
            student_fee_id: fee.student_fee_id,
            paid_amount: fee.due_amount.toString()
        });
        document.getElementById('payment_modal').showModal();
    };

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

            {(!apiResponse?.success || dueFees.length === 0) ? (
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body text-center">
                        <div className="text-6xl text-success mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold">No Due Fees</h3>
                        <p className="text-base-content/70">
                            {apiResponse?.message || "Great! You don't have any pending fees."}
                        </p>
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
                                <th className="">Status</th>
                                <th className="rounded-tr-lg">Monthly Pay</th>
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
                                    <td><button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => openPaymentModal(fee)}
                                    >Pay Now</button></td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-primary text-white">
                                <th colSpan="4" className="text-right">Total Due:</th>
                                <th colSpan="4" className="text-xl font-bold">৳{totalDue.toLocaleString()}</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )}
            
            {/* Payment Modal */}
            <dialog id="payment_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Payment Details</h3>
                    
                    {selectedFee && (
                        <div className="py-4">
                            <div className="mb-4">
                                <p className="font-semibold">Month: {selectedFee.month_name}</p>
                                <p className="font-semibold text-error">Due Amount: ৳{selectedFee.due_amount.toLocaleString()}</p>
                            </div>
                            
                            <form onSubmit={handlePaymentSubmit}>
                                <input
                                    type="hidden"
                                    name="student_fee_id"
                                    value={paymentData.student_fee_id}
                                />
                                
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Payment Amount</span>
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        max={selectedFee?.due_amount}
                                        placeholder="Enter amount"
                                        className="input input-bordered w-full"
                                        value={paymentData.paid_amount}
                                        onChange={(e) => setPaymentData({...paymentData, paid_amount: e.target.value})}
                                        required
                                    />
                                    <label className="label">
                                        <span className="label-text-alt text-info">Amount must be between ৳1.00 and ৳{selectedFee?.due_amount?.toLocaleString()}</span>
                                    </label>
                                </div>
                                
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Payment Method</span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full"
                                        value={paymentData.payment_method}
                                        onChange={(e) => setPaymentData({...paymentData, payment_method: e.target.value})}
                                    >
                                        <option value="Bkash">Bkash</option>
                                        <option value="Nagod">Nagod</option>
                                        <option value="Cash">Cash</option>
                                    </select>
                                </div>
                                
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Reference No</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter reference number"
                                        className="input input-bordered w-full"
                                        value={paymentData.reference_no}
                                        onChange={(e) => setPaymentData({...paymentData, reference_no: e.target.value})}
                                    />
                                </div>
                                
                                <div className="modal-action">
                                    <button type="submit" className="btn btn-primary">Submit Payment</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default UnpaidFees;