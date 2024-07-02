import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure/useAxiosSecure';
import { Card, CardBody, CardFooter, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import RegistrationButton from './StudySection/RegistrationButton';
import Navbar from './Shared/Navbar';
import { Typewriter } from 'react-simple-typewriter';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AllCourse = () => {
  const axiosSecure = useAxiosSecure();
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["studySessions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/study-session");
      return res.data;
    },
  });

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
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
    <div className=''>
      <Navbar />
      <div className="relative">
        <img src="/course.jpg" alt="Banner" className="w-full h-60 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className='text-center text-2xl lg:text-5xl'>
            {' '}
            <span style={{ color: 'white', fontWeight: 'bold', }}>
              <Typewriter
                words={[`Explore Our Courses!`]}
                loop={false}
                cursor
                cursorStyle='|'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h1>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-4 my-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            renderSkeletons()
          ) : (
            (Array.isArray(items) ? items : []).map((item) => (
              <div key={item?._id}>
                {item?.status === 'pending' ? null : (
                  <Card className="h-[290px] bg-white hover:shadow-lg transition-shadow duration-300" data-aos="flip-left">
                    <div className="w-full flex justify-end absolute">
                      <RegistrationButton registrationEndDate={item?.registrationEndDate} />
                    </div>
                    <CardBody>
                      <Typography variant="h5" color="blue-gray" className="mb-2">
                        {item?.sessionTitle}
                      </Typography>
                      <Typography className="text-gray-700 mb-4">
                        {truncateText(item?.sessionDescription, 100)}
                      </Typography>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <img className="w-8 h-8 rounded-full" src={item?.tutorPhoto} alt={item?.tutorName} />
                          <p className="ml-2 text-gray-800">{item?.tutorName}</p>
                        </div>
                        <div className="flex items-center text-orange-500">
                          <div className="rating">
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                          </div>
                          <p className="ml-2">{item?.averageRating}</p>
                        </div>
                      </div>
                    </CardBody>
                    <CardFooter className="pt-0 flex justify-between items-center">
                      <Link to={`/study-details/${item?._id}`} className="text-blue-500 flex items-center hover:underline">
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 ml-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                      </Link>
                      <h1 className="text-lg font-bold">
                        {item?.registrationFee < 1 ? 'Free' : `$${item?.registrationFee}`}
                      </h1>
                    </CardFooter>
                  </Card>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCourse;
