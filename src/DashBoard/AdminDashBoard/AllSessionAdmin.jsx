import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Button, Card, CardBody, CardFooter, Typography, badge } from '@material-tailwind/react';
import dayjs from 'dayjs';
import SessionModal from './AllsessionModalAdmin';

const AllSessionAdmin = () => {

    const axiosSecure = useAxiosSecure()

  const {data: sessions = [], isLoading, error, refetch}= useQuery({
        queryFn: async () =>{
            const res = await axiosSecure.get('/study-session')
            return res.data
        }
      })

    console.log(sessions);

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
          return text;
        }
        return text.slice(0, maxLength) + "...";
      };

    return (
        <div className='grid grid-cols- gap-4 max-w-[1280px] mx-auto'>
       <table className=''>
       <tbody>
              <tr className='  '>
                <th className="py-2 pl-5 border-b text-left  w-20">Photo</th>
                <th className="py-2 px- border-b  text-left w-48 pl-2 ">Name</th>
                <th className="py-2 px- border-b  text-left w-[350px] ">Title</th>
                <th className="py-2 px- border-b   w-26  ">$/fee</th>
                <th className="py-2 px- border-b text- w-28  ">Role</th>
                <th className="py-2 pr-10 border-b text-right w-60 ">Action</th>
              </tr>
            </tbody>
       </table>
            {
                sessions?.map(session =>(

             <SessionModal session={session} refetch={refetch} />

                ))
            }
        </div>
    );
};

export default AllSessionAdmin;