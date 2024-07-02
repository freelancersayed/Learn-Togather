import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { Card, CardBody, Typography, CardFooter } from '@material-tailwind/react';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import Navbar from '../../Pages/Shared/Navbar';
import 'animate.css';

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axiosSecure.get('/announcements');
      setAnnouncements(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-5 p-4">
      <div className='flex items-center justify-center divider mb-20'>
      <img className='w-36 animate__animated animate__zoomInDown' src="/annownce.png" alt="" />
      </div>
      {/* <div className='divider'>  <h1 className="text-3xl font-bold text-center mb-8"></h1></div> */}
        {loading ? (
          // Skeleton loading for announcements
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="mb-6 p-4 bg-white shadow-lg rounded-md">
              <Skeleton height={20} width="60%" className="mb-2" />
              <Skeleton height={60} />
              <Skeleton width="50%" />
            </div>
          ))
        ) : (
          // Rendering actual announcements
          announcements.map((announcement) => (
            <Card key={announcement._id} className="mb-6 bg-gray-100 rounded-lg animate__animated animate__lightSpeedInRight">
              <CardBody className='bg-gray-100'>
                <Typography variant="h5" className="mb-2 font-bold text-red-500">
                  {announcement.title}
                </Typography>
                <Typography>{announcement.message}</Typography>
              </CardBody>
              <CardFooter className="text-right">
                <Typography variant="small" color="gray">
                  Posted on: {new Date(announcement.createdAt).toLocaleDateString()}
                </Typography>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AnnouncementList;
