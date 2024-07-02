import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AllStudent = () => {

    const axiosSecure = useAxiosSecure()

const {data: students=[]} = useQuery({
    queryKey: ["users-students"],
    queryFn: async()=>{
        const res = await axiosSecure.get('/users-students');
        return res.data
    }
})

    return (
        <div className='max-w-[1280px] mx-auto px-2'>
             <h1 className='text-center text-4xl pt-5 '>Your Classmate</h1>
             <hr className='mt-2' />
                 <div className="grid lg:grid-cols-4 md:grid-cols-2  justify-center gap-5 py-10 pl-0  shadow- overflow-x-auto ">
     {
                students.map(student=> (
                    <div className=" p-5 rounded w-60 shadow-md flex flex-col items-center bg-gray-100 text-gray-" key={student._id}>
           
                    <div className="w-44 h-44  overflow-hidden">
                          <img className="w-44 h-44 rounded-full border-gray-200" src={student.photo} alt="" />
                      </div>
                         <div className="text-center py-2 overflow-hidden">
                          <h1 className=" uppercase overflow-hidden">{student.name}</h1>
                          <p className='text-sm'>{student.email}</p>
                          </div>  
                          </div>
                )
                        )
            }
     </div>
        </div>
    );
};

export default AllStudent;