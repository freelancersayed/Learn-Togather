import { useContext } from "react";
import { AuthContext } from '../../Providers/AuthProvider';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";

const useStudent = () => {

    const {user, loading} = useContext(AuthContext)
   const axiosSecure = useAxiosSecure()
    const {data: isStudent, isStudentLoading} = useQuery({
        queryKey: [user?.email, 'isStudent'],
        enabled: !loading,
        queryFn: async() => {
           const res = await axiosSecure.get(`/users/student/${user.email}`)
           console.log(res.data);
           return res.data?.student
        }

    })
    return [isStudent, isStudentLoading]
};

export default useStudent;