import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import usePageTitle from '../../../../Hooks/usePageTitle';

const ManageUsers = () => {
    usePageTitle();
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const axiosSecure = useAxiosSecure();

    const fetchUsers = async () => {
        try {
            const url = searchQuery
                ? `/users/search?email=${searchQuery}`
                : '/users/search';

            const response = await axiosSecure.get(url);

            setUsers(Array.isArray(response.data) ? response.data : [response.data]);
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
        }
    };

    const handleSearch = () => fetchUsers();

    const makeAdmin = async (email) => {
        try {
            const result = await Swal.fire({
                title: 'Promote this user to Admin?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes!',
                cancelButtonText: 'Cancel',
                reverseButtons: true,
            });

            if (result.isConfirmed) {
                await axiosSecure.patch(`users/make-admin?email=${email}`);
                Swal.fire('Done!', 'User promoted to Admin.', 'success');
                fetchUsers();
            }
        } catch (error) {
            console.error('Promotion error:', error);
            Swal.fire('Error', 'Failed to promote user.', 'error');
        }
    };

    // Load all users on initial render
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by email"
                    className="input input-bordered w-full max-w-xs"
                />
                <button onClick={handleSearch} className="btn btn-primary">
                    Search
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Subscription</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">No users found</td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name || user.displayName || 'N/A'}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.isMember ? 'Gold' : 'Bronze'}</td>
                                    <td>
                                        {user.role !== 'admin' && (
                                            <button
                                                onClick={() => makeAdmin(user.email)}
                                                className="btn btn-success btn-sm"
                                            >
                                                Make Admin
                                            </button>
                                        )}
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

export default ManageUsers;
