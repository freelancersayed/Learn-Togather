import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isPending: isAdminLoading, error } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading && !!user?.email, // Ensure user email exists
        queryFn: async () => {
            const res = await axiosSecure.get(`users/admin/${user.email}`);
            console.log("Admin check response:", res.data);
            return res.data?.admin;
        }
    });

    if (error) {
        console.error("Error fetching admin status:", error);
    }

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
