import React from 'react';
import { Navigate } from 'react-router';
import useUserRole from '../../Hooks/useUserRole';
import FallBack from '../../Components/FallBack/FallBack';
import useAuth from '../../Hooks/useAuth';

const AdminRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, userLoading } = useUserRole();


    if (loading || userLoading) {
        return <FallBack />;
    }

    if (!user || role !== 'admin') {
        return <Navigate to="/forbidden" state={{ from: location.pathname }} replace />;
    }

    return children
};

export default AdminRoutes;