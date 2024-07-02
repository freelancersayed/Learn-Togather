import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import SessionCart from './SessionCart';
import useSession from '../../hooks/useSession';

const AllSession = () => {
    const [isSpinnerVisible, setIsSpinnerVisible] = useState(true)
    const {user} = useContext(AuthContext)

    const axiosSecure = useAxiosSecure();

    // const fetch = async (email) =>{
    //     const res = await axiosSecure.get(`/all-session/${email}`)
    //     return res.data;
    // }

    // const {data: sessions, isLoading, error} = useQuery(
    //     ['all-sessions', user?.email],
    //     ()=> fetch(user.email),
    //     {
    //         enabled: !user?.email,
    //     }
    // );

    const [sessions, isLoading, refetch, error] = useSession();

    // const {data: sessions = [], isLoading, error, refetch}= useQuery({
    //     queryKey: [ 'all-session', user?.email],
    //     queryFn: async () =>{
    //         const res = await axiosSecure.get(`/all-session/${user?.email}`)
    //         return res.data
    //     }
    //   })

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsSpinnerVisible(false);
        }, 1000);
      
        return () => clearTimeout(timer); // Cleanup timer on component unmount
      }, []);

    if (isLoading || isSpinnerVisible) {
        return <div className='w-full mx-auto items-center justify-center flex'><span className="loading loading-bars loading-lg min-h-screen"></span></div>
      }

      if (error) {
        return <div>Error: {error.message}</div>;
      }

      // console.log(sessions.length);
    return (
        <div className='min-h-screen p-2'>
         <div className='max-w-[1280px] mx-auto gap-4 grid lg:grid-cols-3'>
         {
                sessions?.map(session =><SessionCart key={session._id} refetch={refetch} session={session}></SessionCart>)
            }
         </div>
        </div>
    );
};

export default AllSession;