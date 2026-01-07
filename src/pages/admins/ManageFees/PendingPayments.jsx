import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const PendingPayments = () => {
    const axiosSecure = useAxiosSecure();
    const [pendingPayments, setPendingPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch pending payments
    useEffect(() => {
        fetchPendingPayments();
    }, []);

    const fetchPendingPayments = async () => {
        try {
            setLoading(true);
            const response = await axiosSecure.get("StudentPayments/pending-payments");
            console.log("Pending Payments Response:", response);
            if (response.data.success && response.data.data) {
                setPendingPayments(response.data.data);
            } else {
                setPendingPayments([]);
            }
        } catch (error) {
            console.error("Error fetching pending payments:", error);
            toast.error("Failed to fetch pending payments");
        } finally {
            setLoading(false);
        }
    };

    // Update payment status
    const updatePaymentStatus = async (paymentId, status) => {
        try {
            const response = await axiosSecure.put(
                `/StudentPayments/payment-status-update?payment_id=${paymentId}&payment_status=${status}`
            );
            
            if (response.data.success) {
                toast.success(response.data.message || `Payment ${status} successfully`);
                // Refresh the pending payments list
                fetchPendingPayments();
            } else {
                toast.error(response.data.message || "Failed to update payment status");
            }
        } catch (error) {
            console.error("Error updating payment status:", error);
            toast.error("Failed to update payment status");
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            console.error("Error formatting date:", error);
            return dateString;
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Pending Payments</h1>
                <p className="text-gray-600 mt-2">Review and manage pending student payments</p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : pendingPayments.length === 0 ? (
                <div className="bg-base-100 rounded-lg shadow-md p-8 text-center">
                    <div className="text-6xl mb-4">💰</div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">No Pending Payments</h2>
                    <p className="text-gray-500">There are no pending payments to review at this time.</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr className="bg-base-200">
                                <th className="text-left">Student Info</th>
                                <th className="text-left">Class Details</th>
                                <th className="text-left">Payment Info</th>
                                <th className="text-left">Payment Method</th>
                                <th className="text-left">Date</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingPayments.map((payment) => (
                                <tr key={payment.payment_id} className="hover">
                                    <td>
                                        <div>
                                            <div className="font-semibold">{payment.student_name}</div>
                                            <div className="text-sm text-gray-500">ID: {payment.student_number}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div className="font-medium">{payment.class_name}</div>
                                            <div className="text-sm text-gray-500">{payment.section_name} • {payment.year_label}</div>
                                            <div className="text-sm text-gray-500">{payment.month_name}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div className="font-semibold">Fee: ৳{payment.fee_amount}</div>
                                            <div className="text-sm">Paid: ৳{payment.paid_amount}</div>
                                            <div className="text-sm text-gray-500">Ref: {payment.reference_no}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="badge badge-info badge-sm">
                                            {payment.payment_method}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-sm">
                                            {formatDate(payment.payment_date)}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => updatePaymentStatus(payment.payment_id, "Accepted")}
                                                className="btn btn-success btn-sm"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => updatePaymentStatus(payment.payment_id, "Rejected")}
                                                className="btn btn-error btn-sm"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PendingPayments;