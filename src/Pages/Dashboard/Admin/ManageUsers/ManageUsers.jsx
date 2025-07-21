import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const axiosSecure = useAxiosSecure();
    console.log(users);

    const fetchUsers = async () => {
        try {
            const response = await axiosSecure.get(`/users?username=${searchQuery}`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSearch = () => fetchUsers();

    const makeAdmin = async (email) => {
        try {
            await axiosSecure.patch(`users/make-admin/${email}`);
            fetchUsers(); // Refresh list
        } catch (error) {
            console.error('Error making admin:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [searchQuery]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by username"
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
                                    <td>{user.name}</td>
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
