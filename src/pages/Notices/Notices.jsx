import React from 'react';
import useNotice from '../../hooks/useNotice';
import { FaCalendarAlt, FaClock, FaBell } from 'react-icons/fa';

const Notices = () => {
    const [notices, loading] = useNotice();
    
    // Format date to a more readable format
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Check if a notice is expired
    const isExpired = (expiryDate) => {
        return new Date(expiryDate) < new Date();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-center mb-2">Notices</h1>
                <p className="text-center text-gray-600">Stay updated with the latest announcements</p>
            </div>

            {notices.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <FaBell className="text-6xl text-gray-300 mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-500 mb-2">No Notices Available</h2>
                    <p className="text-gray-400">There are no notices at the moment. Check back later!</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {notices.map((notice) => {
                        const expired = isExpired(notice.expiry_date);
                        return (
                            <div
                                key={notice.notice_id}
                                className={`card bg-base-100 shadow-xl border ${expired ? 'border-gray-300 opacity-75' : 'border-primary'}`}
                            >
                                <div className="card-body">
                                    <div className="flex justify-between items-start mb-2">
                                        <h2 className="card-title text-xl">{notice.notice_title}</h2>
                                        {expired && (
                                            <div className="badge badge-error">Expired</div>
                                        )}
                                    </div>
                                    
                                    <p className="text-gray-700 mb-4">{notice.notice_description}</p>
                                    
                                    <div className="flex flex-col gap-2 text-sm text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-primary" />
                                            <span>Posted: {formatDate(notice.notice_date)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaClock className="text-primary" />
                                            <span>Expires: {formatDate(notice.expiry_date)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Notices;