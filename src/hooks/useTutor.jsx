import  { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useTutor = () => {
    const {user, loading} = useContext(AuthContext)
    console.log(user.email);
    const axiosSecure = useAxiosSecure()
     const {data: isTutor, isTutorLoading} = useQuery({
         queryKey: [user?.email, 'isTutor'],
         enabled: !loading,
         queryFn: async() => {
            const res = await axiosSecure.get(`/users/tutor/${user.email}`)
            console.log(res.data);
            return res.data?.tutor
         }
 
     })
     return [isTutor, isTutorLoading]
};

export default useTutor;