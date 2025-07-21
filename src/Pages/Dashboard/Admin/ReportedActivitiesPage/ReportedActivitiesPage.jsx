import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const ReportedActivitiesPage = () => {
    const [reports, setReports] = useState([]);
    const axiosSecure = useAxiosSecure();

    // Fetch reported activities/comments
    const fetchReports = async () => {
        try {
            const response = await axiosSecure.get('/reports');
            setReports(response.data);
        } catch (err) {
            console.error("Error fetching reports", err);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleResolveReport = async (reportId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to resolve this report.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, resolve it!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Mark the report as resolved by sending a request to the server
                    await axiosSecure.patch(`/reports/${reportId}`, { status: "resolved" });
                    Swal.fire("Resolved!", "The report has been marked as resolved.", "success");
                    fetchReports();  // Refresh the list
                } catch (error) {
                    console.error("Error resolving report", error);
                    Swal.fire("Error", "Something went wrong!", "error");
                }
            }
        });
    };

    const handleDeletePost = async (postId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to delete this post permanently.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Delete the post
                    await axiosSecure.delete(`/posts/${postId}`);
                    Swal.fire("Deleted!", "The post has been deleted.", "success");
                    fetchReports();  // Refresh the reports list
                } catch (error) {
                    console.error("Error deleting post", error);
                    Swal.fire("Error", "Something went wrong!", "error");
                }
            }
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Reported Activities/Comments</h1>

            {/* Reports Table */}
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Reported By</th>
                            <th>Report Type</th>
                            <th>Post Title</th>
                            <th>Comment</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center">No reports found</td>
                            </tr>
                        ) : (
                            reports.map((report) => (
                                <tr key={report._id}>
                                    <td>{report.reportedBy}</td>
                                    <td>{report.type}</td>
                                    <td>{report.postTitle}</td>
                                    <td>{report.comment}</td>
                                    <td>
                                        <span className={`badge ${report.status === "resolved" ? "bg-green-500" : "bg-yellow-500"}`}>
                                            {report.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleResolveReport(report._id)}
                                            className="btn btn-primary btn-sm mr-2"
                                        >
                                            Resolve
                                        </button>
                                        <button
                                            onClick={() => handleDeletePost(report.postId)}
                                            className="btn btn-danger btn-sm"
                                        >
                                            Delete Post
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedActivitiesPage;
