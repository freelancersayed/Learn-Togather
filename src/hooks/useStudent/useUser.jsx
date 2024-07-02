import React, { useContext } from 'react';
import useAxiosSecure from '../useAxiosSecure/useAxiosSecure';
import { AuthContext } from '../../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useUser = () => {
  const axiosSecure = useAxiosSecure()
  const {user} = useContext(AuthContext);

  const {data: users = []}= useQuery({
    queryKey: [ 'users', user?.email],
    queryFn: async () =>{
        const res = await axiosSecure.get(`/users/${user?.email}`)
        return res.data[0]
    }
  })
  return [users]
};

export default useUser;