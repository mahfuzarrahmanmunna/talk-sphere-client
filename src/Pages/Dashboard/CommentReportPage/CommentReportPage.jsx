import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const feedbackOptions = [
    'Inappropriate Language',
    'Spam or Irrelevant',
    'Harassment or Abuse'
];

const CommentReportPage = () => {
    const { postId } = useParams();
    const [comments, setComments] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState({});
    const [reported, setReported] = useState({});
    const [modalComment, setModalComment] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`comments/post/${postId}`)
            .then(res => setComments(res.data))
            .catch(err => console.error("Failed to load comments:", err));
    }, [postId]);

    const handleFeedbackChange = (commentId, feedback) => {
        setSelectedFeedback(prev => ({ ...prev, [commentId]: feedback }));
    };

    const handleReport = async (comment) => {
        try {
            await axiosSecure.post(`reports`, {
                commentId: comment._id,
                feedback: selectedFeedback[comment._id],
                email: comment.email,
                commentText: comment.comment,
                postId: comment.postId,
                reportedAt: new Date(),
            });
            setReported(prev => ({ ...prev, [comment._id]: true }));
            Swal.fire('Reported!', 'Comment has been reported.', 'success');
        } catch (err) {
            console.error("Report failed:", err);
            Swal.fire('Error', 'Failed to report comment.', 'error');
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-base-100 rounded shadow mt-10">
            <h2 className="text-3xl font-bold text-primary mb-6">🗨️ Comments</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Comment</th>
                            <th>Feedback</th>
                            <th>Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map(comment => {
                            const isLong = comment.comment.length > 20;
                            return (
                                <tr key={comment._id}>
                                    <td>{comment.email}</td>
                                    <td>
                                        {isLong ? (
                                            <>
                                                {comment.comment.slice(0, 20)}...{' '}
                                                <button
                                                    className="text-blue-500 underline text-xs"
                                                    onClick={() => setModalComment(comment.comment)}
                                                >
                                                    Read More
                                                </button>
                                            </>
                                        ) : comment.comment}
                                    </td>
                                    <td>
                                        <select
                                            className="select select-bordered select-sm"
                                            onChange={(e) => handleFeedbackChange(comment._id, e.target.value)}
                                            value={selectedFeedback[comment._id] || ''}
                                        >
                                            <option value="">Select</option>
                                            {feedbackOptions.map((option, idx) => (
                                                <option key={idx} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            disabled={
                                                !selectedFeedback[comment._id] || reported[comment._id]
                                            }
                                            onClick={() => handleReport(comment)}
                                            className="btn btn-sm btn-error disabled:opacity-50"
                                        >
                                            Report
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {modalComment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Full Comment</h3>
                        <p className="text-gray-800 mb-4">{modalComment}</p>
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={() => setModalComment(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentReportPage;
