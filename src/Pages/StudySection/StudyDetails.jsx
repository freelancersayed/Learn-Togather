import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { CiTimer } from "react-icons/ci";
import { MdOutlineStart } from "react-icons/md";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useStudent/useUser";
import Navbar from "../Shared/Navbar";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import PaymentModal from "../../Payment/PaymentModal";
import Swal from "sweetalert2";
import Ratting from "../../DashBoard/StudentDashBoard/Ratting";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const StudyDetails = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // Modal state
  const { user } = useContext(AuthContext);
  const details = useLoaderData([]);
  const [users] = useUser();
  const { _id, sessionId } = useParams();
  const item = details.find(
    (detail) => detail._id === _id || detail._id === sessionId
  );

  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const checkRegistrationStatus = () => {
      const today = dayjs();
      const endDate = dayjs(item?.registrationEndDate);
      if (today.isAfter(endDate)) {
        setIsRegistrationOpen(false);
      }
    };

    checkRegistrationStatus();
  }, [item?.registrationEndDate]);

  const handleBookNow = async () => {
    if (item.registrationFee < 1) {
      // Free session, directly book it
      try {
        await axios.post("https://learn-together-server-lemon.vercel.app/book-session", {
          studentEmail: user.email,
          sessionId: item._id,
          tutorEmail: item.tutorEmail,
          sessionInfo: item,
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your registration free successful",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error booking session:", error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `session ${error.message}`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    } else {
      setIsPaymentModalOpen(true);
    }
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  const {
    data: comments = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["comments", item?._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comment/${item?._id}`);
      return res.data;
    },
  });


  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const comments = form.comment.value;
    const date = new Date();
    const email = user?.email;
    const photo = user?.photoURL

    const commentId = item._id;
    const newComment = { comments, date, email, photo, commentId };

    try {
      const res = await axiosSecure.post("/comment", newComment);
      console.log(res.status);
      refetch();
    } catch (error) {
      console.error("Error saving Comment:", error);
    }
  };

  return (
    <div className="mx-auto">
      <Navbar></Navbar>
      <div className="h-96 bg-[url('/bg/webEdu.jpg')] bg-fixed bg-cover w-full text-white">
        <div className="bg-[#3f51f3af] h-96 w-full flex flex-col items-center justify-center">
          <div className="w-full mx-auto flex justify-center">
            <img
              className="w-44 h-44 absolute -mt-36"
              src="/logo1.png"
              alt=""
            />
            <p>Education is the backbone of the nation</p>
          </div>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 lg:text-6xl font-bold text-white mb-10 text-center"
          >
            {item?.sessionTitle}
          </Typography>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto  gap-">
        <Card className="shadow-md w-full text-xl">
          <CardBody>
            <div className="flex justify-between text-2xl">
              <p className="flex items-center gap-2">
                <CiTimer className="text-4xl text-blue-400" />
                <span className="text-gray-500">Class Start : <span className="text-blue-400"> {item?.classStartDate}</span></span>
              </p>
              <p>
                <span className="text-gray-500">Class End :</span>
                <span className="text-blue-400">
                  {item?.classEndDate}
                </span>
              </p>
            </div>


            <div className="mt-8">
              <h1 className="text-4xl font-normal text-gray-600 mb-2">
                About the Course
              </h1>
              <p>{item?.sessionDescription}</p>
            </div>

            <div className="flex gap-2 justify-between mt-5 py-2 rounded items-center">
              <div className="lg:flex gap-2">
               <div className="flex gap-2 mb-1">
               <p className="lg:flex gap-2 badge badge-neutral">Rag. Start</p>
               <MdOutlineStart />
               </div>
                <p className="flex gap-2 items-center px-5 rounded-md bg-green-50 badge badge-primary">
                  <span className="text-green-500">
                    {item?.registrationStartDate}
                  </span>
                </p>
              </div>
              <div className="lg:flex gap-2">
                <div className="flex gap-2 mb-1">
                <p className="flex gap- badge badge-neutral">Rag. End</p>
                <MdOutlineStart />
                </div>
                <p className="flex gap-2 items-center px-5 rounded-md bg-red-50 badge badge-secondary">
                  <span className="text-red-500">{item?.classEndDate}</span>
                </p>
              </div>
            </div>
            <div>
              <span className="font-semibold">Session Duration:</span>
              {`${item?.sessionDuration?.hours}h ${item?.sessionDuration?.minutes}m ${item?.sessionDuration?.seconds}s`}
            </div>
            <Typography className="mt-4">
              <p className="text-right text-orange-500">
                Rating {item?.averageRating}
              </p>

              {/* Rating======================================================================== */}
              <Ratting retting={item}></Ratting>
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Typography variant="h" color="blue-gray" className="mb-2">
              <h1 className="text-sm mb-5">Tutor: {item?.tutorName}</h1>
              <div className="flex justify-between">
                {users.role === "Tutor" || !isRegistrationOpen ? (
                  <button
                    disabled={users?.role === "Tutor" || !isRegistrationOpen}
                    className="btn btn-sm shadow-lg bg-blue-400 hover:text-blue-50 hover:bg-blue-500 text-white"
                  >
                    Book Now
                  </button>
                ) : (
                  <button
                    onClick={handleBookNow}
                    className="btn btn-sm shadow-lg bg-blue-400 hover:text-blue-50 hover:bg-blue-500 text-white"
                  >
                    Book Now
                  </button>
                )}
                <h1>
                  <span className="">{item?.registrationFee}</span>
                </h1>
              </div>
            </Typography>
          </CardFooter>
        </Card>

  
          <div className=" bottom-0 left-0 right-0 bg-gray-100 px-4 pt-4 shadow-md rounded">
            
            {users.role === "Tutor" ? null: (
            <div >
                 <h3 className="text-xl font-bold mb-4">Leave a Comment</h3>
              <form
              onSubmit={handleCommentSubmit}
              className="pl-4 bg-white shadow w-full border my-5 rounded-lg flex items-center"
            >
              <input
                className="bg-transparent px-1 text-black outline-none w-full border-transparent py-2"
                name="comment"
                type="text"
                placeholder="Comment here"
              />
              <input
                type="submit"
                className="bg-blue-400 py-2 px-4 py-2 rounded-r-md text-white"
              />
            </form>
            </div>
          )}

            <div className=" py-5 px-2 ">
          <div className="flex-col-reverse flex">
            {comments.map((comment) => (
              <div key={comment._id} className=" ">
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={comment.photo}
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    <time className="text-xs opacity-50">{new Date(comment.date).toLocaleDateString()}</time>
                  </div>
                  <div className="chat-bubble ">{comment.comments}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
          </div>
        

      
        <PaymentModal
          isOpen={isPaymentModalOpen}
          payItem={item}
          onClose={closePaymentModal}
        />
      </div>
    </div>
  );
};

export default StudyDetails;
