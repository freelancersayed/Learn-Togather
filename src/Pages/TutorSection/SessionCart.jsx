import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditSessionModal from "./UpdateSession";
import { CardFooter } from "@material-tailwind/react";
import Swal from "sweetalert2";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { MdError } from "react-icons/md";
import { IoReloadOutline } from "react-icons/io5";
import 'animate.css';

const SessionCart = ({ session, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [rejects, setRejects] = useState([])

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = () => {
    // Refresh the session list or handle any other updates
  };

  const truncateText = (text, maxLength) => {
    if (text?.length <= maxLength) {
      return text;
    }
    return text?.slice(0, maxLength) + "...";
  };

  const handleDelete = async (session) => {
    Swal.fire({
      title: `Are you sure you want to delete user: ${session?.sessionTitle}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://learn-together-server-lemon.vercel.app/study-session-delete/${session?._id}`
          );
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire({
            title: "Error!",
            text: "There was an error deleting the user.",
            icon: "error",
          });
        }
      }
    });
  };

useEffect(()=>{
  fetch(`https://learn-together-server-lemon.vercel.app/rejected/${session?._id}`)
  .then(res => res.json())
  .then(data=>{
    setRejects(data)
  })
},[session?._id])


console.log(rejects);


  const handleStatusChange = async (newStatus) => {
    try {
      await axiosSecure.put(`/update-status/${session?._id}`, {
        status: newStatus,
      });
      refetch();
    } 
    catch (error) {
      console.error("Error updating status:", error);
    }
    refetch();
  };

  return (
    <div className="">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden  my-4 relative ">
        <div className="p-4 h-[450px ">
          <h2 className="text-xl font-bold mb-2">{session?.sessionTitle}</h2>
          <p className="text-gray-700 mb-4">
            {truncateText(session?.sessionDescription, 50)}
          </p>
          <div className="flex flex-col space-y-2">
            <div>
              <span className="font-semibold">Registration Start Date:</span>{" "}
              {session?.registrationStartDate}
            </div>
            <div>
              <span className="font-semibold">Registration End Date:</span>{" "}
              {session?.registrationEndDate}
            </div>
            <div>
              <span className="font-semibold">Class Start Date:</span>{" "}
              {session?.classStartDate}
            </div>
            <div>
              <span className="font-semibold">Class End Date:</span>{" "}
              {session?.classEndDate}
            </div>
            <div>
              <span className="font-semibold">Registration Fee:</span> $
              {session?.registrationFee}
            </div>
            <div>
              <span className="font-semibold">Session Duration:</span>{" "}
              {`${session?.sessionDuration?.hours}h ${session?.sessionDuration?.minutes}m ${session?.sessionDuration?.seconds}s`}
            </div>
            <div>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  session.status === "Pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : session.status === "Approved"
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                Status: {session?.status}
              </span>
              {session?.status === "Rejected" && (
                <>
                  <button
                    onClick={() => handleStatusChange("Pending")}
                    className="mt-2 ml-2 text-blue-500 hover:underline"
                  >
                    Apply Again
                  </button>
                </>
              )}
            </div>
            {
                !session?.status === "Approved" &&
            <div>
              {rejects?.map((reject) => (
              <div
                key={reject._id}
                className="text-red-500 flex items-center gap-2"
              >
                <MdError /> {reject?.reason}
              </div>
              ))}
            </div>
}
            <CardFooter>
              <div className="w-full sessions-end flex justify-between -mb-5">
                <button
                  onClick={() => handleDelete(session)}
                  className="bg-red-500 text-white w-20 px-3 py-1 rounded hover:bg-red-600 transition-colors duration-500"
                >
                  Delete
                </button>
                <button
                  onClick={handleOpenModal}
                  className=" text-white bg-blue-500 w-20 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-500"
                >
                  Edit
                </button>
              </div>
            </CardFooter>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <EditSessionModal
          session={session}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default SessionCart;
