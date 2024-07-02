
// import './Modal.css'; // Assuming you have some basic styling for the modal

import { Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const Modal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;


  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="modal-overlay absolute w-full -mt-5 lg:ml-4 ml-2 flex flex-col items-end ">
         <button onClick={onClose} className="modal-close-button text-left  text-red-500 text-2xl  fixed z-30 flex  lg:w-[418px] mt-10 mr-5 bg-[#00000000] modal-box shadow-none rounded-t p-0"><IoMdClose className=""/></button>
      <div className="modal-content modal-box fixed z-10 border w-[440px] bg-gray-200 border-y-8 border-y-blue-500">
      
        <div className="grid grid-cols-1 w-2/3 gap-2  bg-gray-200 h-[600px] pl-5 lg:pl-0  pt-7">
    
          {data.map(item => (
            <div key={item._id}>
             <Card className="h- justify-center w-96 ">
                <CardBody className="">
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {item?.sessionTitle}
                  </Typography>

                  <Typography>
                    {/* {item.sessionDescription} */}
                    <p>{truncateText(item?.sessionDescription, 50)}</p>
                  </Typography>
                  <Typography className="mt-4 flex items-center gap-2 justify-end">
                    <div className="rating">
                      <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                      />
                    </div>
                    <p className="mt-1 text-orange-500">
                      {" "}
                      {item?.averageRating}{" "}
                    </p>
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0 flex justify-between">
                  <a className="inline-block">
                    <Link
                      to={`/study-details/${item?._id}`}
                      size="sm"
                      variant="text"
                      className="flex items-center gap-2 hover:text-blue-500"
                    >
                      Learn More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </Link>
                  </a>
                  <h1>{item?.registrationFee}</h1>
                </CardFooter>
              </Card>
            
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;