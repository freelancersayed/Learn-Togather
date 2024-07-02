import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  isLoading,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import RegistrationButton from "./RegistrationButton";
import Skeleton from "react-loading-skeleton";
import { Typewriter } from "react-simple-typewriter";
import AOS from 'aos';
import 'aos/dist/aos.css';


const StudySection = ({ items }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  console.log('Items in StudySection:', items);

  const [showAll, setShowAll] = useState(false);

  const truncateText = (text, maxLength) => {
    if (text?.length <= maxLength) {
      return text;
    }
    return text?.slice(0, maxLength) + "...";
  };

  const handleShowAll = () => {
    setShowAll(true);
  };
  const handleShowLess = () => {
    setShowAll(false);
  };

  const renderSkeletons = () => {
    return Array.from({ length: 6 }).map((_, index) => (
      <Card key={index} className="h-[290px] bg-white">
        <CardBody>
          <Skeleton height={30} width="60%" />
          <Skeleton height={20} count={3} />
          <div className="flex items-center justify-between mb-4 mt-4">
            <div className="flex items-center">
              <Skeleton circle={true} height={32} width={32} />
              <Skeleton height={20} width="60%" className="ml-2" />
            </div>
            <Skeleton height={20} width="30%" />
          </div>
        </CardBody>
        <CardFooter className="pt-0 flex justify-between items-center">
          <Skeleton height={30} width="30%" />
          <Skeleton height={30} width="20%" />
        </CardFooter>
      </Card>
    ));
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4">
      <div className="divider py-5 mb-10 text-4xl">
  
      <h2 className="text-4xl lg:text-4xl font-bold"> <span style={{ color: 'red', fontWeight: 'bold', }}>
              <Typewriter
                words={[`Our Session!`, 'Explore Our Session']}
                loop={false}
                cursor
                cursorStyle='|'
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span></h2>
      </div>
    
      <div className="bg-gray-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-between">
        
      {items?.length <= 0 ? (
            renderSkeletons()
          ) : ( <>
        {(Array.isArray(items) ? items : []).slice(0, showAll ? items.length : 6).map((item) => (
       <Link key={item?._id}  to={`/study-details/${item?._id}`}>
           <div  data-aos="zoom-in">
            {item?.status === 'pending' ? null : (
              <Card className="h-60 bg-white hover:translate-x-1 animate__animated animate__zoomIn">
                <div className="w-full flex justify-end absolute">
                  <RegistrationButton registrationEndDate={item?.registrationEndDate} />
                </div>
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {item?.sessionTitle}
                  </Typography>
                  <Typography>
                    <p>{truncateText(item?.sessionDescription, 50)}</p>
                  </Typography>
                  <div className="flex mt-5 items-end -mb-4">
                    <div className="w-full">
                      <div className="flex gap-2 items-center">
                        <img className="w-5 h-5 rounded-full" src={item?.tutorPhoto} alt="" />
                        <p>{item?.tutorName}</p>
                      </div>
                    </div>
                    <Typography className="mt-4 flex items-center gap-2 justify-end">
                      <div className="rating">
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                        />
                      </div>
                      <p className="mt-1 text-orange-500">
                        {item?.averageRating}
                      </p>
                    </Typography>
                  </div>
                </CardBody>
                <CardFooter className="pt-0 flex justify-between">
                  <Link
                    to={`/study-details/${item?._id}`}
                    size="sm"
                    variant="text"
                    className="flex items-center gap-2 hover:text-white bg-blue-100 py-1 px-2 rounded hover:bg-blue-500 "
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
                  <h1>${item?.registrationFee < 1 ? <>Free</> : item?.registrationFee }</h1>
                </CardFooter>
              </Card>
            )}
          </div>
       </Link>
        ))}
        </>
      )}
      </div>

      <div className="flex flex-col border-opacity-50">
        <div className="divider">
          {!showAll && items.length > 6 ? (
            <button id="session_id" className="text-blue-600" onClick={handleShowAll}>
              Show more
            </button>
          ) : (
            <button onClick={handleShowLess} className="text-red-500">See less</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudySection;
