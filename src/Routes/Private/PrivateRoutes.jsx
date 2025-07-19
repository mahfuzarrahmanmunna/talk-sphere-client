import { Navigate, useLocation } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import FallBack from '../../Components/FallBack/FallBack';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <FallBack />
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoutes;
