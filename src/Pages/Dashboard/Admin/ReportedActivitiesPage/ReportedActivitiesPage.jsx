import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import FallBack from "../../../../Components/FallBack/FallBack";

// Function to fetch reports
const fetchReports = async (axiosSecure) => {
    const response = await axiosSecure.get('reports');
    return response.data;
};

// Function to resolve a report
const resolveReport = async (axiosSecure, reportId) => {
    await axiosSecure.patch(`reports/${reportId}`, { status: "resolved" });
};

// Function to delete a report
const deleteReport = async (axiosSecure, reportId) => {
    await axiosSecure.delete(`reports/${reportId}`);
};

// Function to delete a comment
const deleteComment = async (axiosSecure, commentId) => {
    await axiosSecure.delete(`delete-reports/${commentId}`);
};

const ReportedActivitiesPage = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch reports using TanStack Query's useQuery
    const { data: reports = [], error, isLoading } = useQuery({
        queryKey: ["reports"], // Query key as an array
        queryFn: () => fetchReports(axiosSecure),
        refetchOnWindowFocus: true, // Automatically refetch when the window is focused
    });

    // Mutation to resolve a report
    const resolveMutation = useMutation({
        mutationFn: (reportId) => resolveReport(axiosSecure, reportId),
        onMutate: async (reportId) => {
            // Optimistic update
            await queryClient.cancelQueries(["reports"]);
            const previousReports = queryClient.getQueryData(["reports"]);

            queryClient.setQueryData(["reports"], (oldReports) =>
                oldReports.map((report) =>
                    report._id === reportId ? { ...report, status: "resolved" } : report
                )
            );
            return { previousReports };
        },
        onError: (error, variables, context) => {
            // Rollback to the previous state if error occurs
            queryClient.setQueryData(["reports"], context.previousReports);
            Swal.fire("Error", "Something went wrong while resolving the report!", "error");
        },
        onSuccess: () => {
            Swal.fire("Resolved!", "The report has been marked as resolved.", "success");
            queryClient.invalidateQueries(["reports"]);  // Refetch the reports data
        },
    });

    // Mutation to delete a report and its associated comment
    const deleteMutation = useMutation({
        mutationFn: ({ reportId, commentId }) => {
            return Promise.all([
                deleteReport(axiosSecure, reportId),
                deleteComment(axiosSecure, commentId)
            ]);
        },
        onMutate: async ({ reportId, }) => {
            // Optimistic update - Remove the report and comment from the UI immediately
            await queryClient.cancelQueries(["reports"]);
            const previousReports = queryClient.getQueryData(["reports"]);

            // Optimistically remove the deleted report and its associated comment
            queryClient.setQueryData(["reports"], (oldReports) =>
                oldReports.filter((report) => report._id !== reportId)
            );

            return { previousReports };
        },
        onError: (error, variables, context) => {
            // Rollback if the deletion fails
            queryClient.setQueryData(["reports"], context.previousReports);
            Swal.fire("Error", "Something went wrong while deleting the report or comment!", "error");
        },
        onSuccess: () => {
            Swal.fire("Deleted!", "The post and its comment have been deleted.", "success");
            // Refetch the reports after deletion to ensure data consistency
            queryClient.invalidateQueries(["reports"]);
        }
    });

    // Handle loading state
    if (isLoading) return <FallBack />;

    // Handle error state
    if (error) return <div>Error fetching reports: {error.message}</div>;

    // Handle delete confirmation and proceed with deletion
    const handleDelete = (reportId, commentId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This will delete the post and the associated comment.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate({ reportId, commentId });
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
                                    <td>{report.reportedBy || "Unknown"}</td>
                                    <td>{report.feedback.slice(0, 15) || "Not provided"}..</td>
                                    <td>{report.postTitle.slice(0, 15) || "No title"}..</td>
                                    <td>{report.commentText || "No comment"}</td>
                                    <td>
                                        <span className={`badge ${report.status === "resolved" ? "bg-green-500" : "bg-yellow-500"}`}>
                                            {report.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => resolveMutation.mutate(report._id)}
                                            className="btn btn-primary btn-sm mr-2"
                                        >
                                            Resolve
                                        </button>
                                        <button
                                            onClick={() => handleDelete(report._id, report.commentId)}
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
