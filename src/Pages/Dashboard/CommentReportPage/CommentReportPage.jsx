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
    const [selectedFeedback, setSelectedFeedback] = useState({}); // Tracks feedback for each comment
    const [reported, setReported] = useState({}); // Tracks reported status for each comment
    const [modalComment, setModalComment] = useState(null);
    const [postTitle, setPostTitle] = useState(''); // To store post title
    const axiosSecure = useAxiosSecure();

    // Fetch the post title and comments for the post
    useEffect(() => {
        // Fetch post title
        axiosSecure.get(`/posts/${postId}`)
            .then(res => setPostTitle(res.data.title))
            .catch(err => console.error("Failed to load post title:", err));

        // Fetch comments for the post
        axiosSecure.get(`comments/post/${postId}`)
            .then(res => setComments(res.data))
            .catch(err => console.error("Failed to load comments:", err));
    }, [postId]);

    // Handle feedback change for each comment
    const handleFeedbackChange = (commentId, feedback) => {
        setSelectedFeedback(prev => ({ ...prev, [commentId]: feedback }));
    };

    // Handle report action
    const handleReport = async (comment) => {
        try {
            const reportData = {
                commentId: comment._id,
                postId: comment.postId,
                commentText: comment.comment,
                feedback: selectedFeedback[comment._id],
                reportedBy: comment.email,
                postTitle: postTitle,  // Pass the fetched post title here
                reportedAt: new Date(),
            };
            console.log(reportData);

            await axiosSecure.post('/reports', reportData);
            setReported(prev => ({ ...prev, [comment._id]: true }));
            Swal.fire('Reported!', 'Comment has been reported.', 'success');
        } catch (err) {
            console.error("Report failed:", err);
            Swal.fire('Error', 'Failed to report comment.', 'error');
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded shadow-lg mt-10">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">🗨️ Comments</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-blue-100">
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
                                        <div className="relative inline-block w-full">
                                            <select
                                                className="select select-bordered w-full p-2 rounded-md"
                                                onChange={(e) => handleFeedbackChange(comment._id, e.target.value)}
                                                value={selectedFeedback[comment._id] || ''}
                                            >
                                                <option value="">Select</option>
                                                {feedbackOptions.map((option, idx) => (
                                                    <option key={idx} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            disabled={!selectedFeedback[comment._id] || reported[comment._id]}
                                            onClick={() => handleReport(comment)}
                                            className="btn btn-sm bg-red-600 text-white disabled:opacity-50 hover:bg-red-700"
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

            {/* Modal to display the full comment */}
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
