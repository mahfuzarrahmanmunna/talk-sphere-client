import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useUserRole = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role, isPending: userLoading, isError, error } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`users/role?email=${user.email}`);
            console.log(res.data.role);
            return res.data.role;
        },
        staleTime: 1000 * 60 * 5, // optional: 5 minutes
    });

    return { role, userLoading, isError, error };
};

export default useUserRole;