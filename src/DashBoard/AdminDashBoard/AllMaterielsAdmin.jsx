import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaGoogleDrive } from "react-icons/fa";

const AllMaterielsAdmin = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: materiels = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get("/all-materials");
      return res.data;
    },
  });

  console.log(materiels);

  return (
    <div className="grid grid-cols-2 max-w-[1280px] px-4 mx-auto gap-4">
   {
    materiels.map(materiel =>(
        <div key={materiel._id} className="w-full mx-auto my-8 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-52 w-full object-cover  md:w-48"
              src={materiel.imageUrl}
              alt=""
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {materiel.title}
            </div>
            <p className="block mt-1 text-lg leading-tight font-medium text-black">
              {materiel.tutorEmail}
            </p>
            <p className="mt-2 text-gray-500">
              <a
                href={materiel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline flex items-center gap-2"
              >
               <img className="w-8 hover:bg-blue-100 rounded hover:underline" src="/drive.svg" alt="" /> Open google drive
              </a>
            </p>
          </div>
        </div>
      </div>
    ))
   }
    </div>
  );
};

export default AllMaterielsAdmin;
