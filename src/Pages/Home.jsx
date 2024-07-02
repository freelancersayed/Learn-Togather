import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Shared/Navbar';
import Fotter from './Shared/Fotter';
import Banner from './Banner';
import StudySection from './StudySection/StudySection';
import useAxiosSecure from '../hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Modal from './StudySection/Modal';
import { AuthContext } from '../Providers/AuthProvider';
import TiutoSection from './TutorSection/TiutoSection';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Card, CardBody, CardFooter } from '@material-tailwind/react';

const Home = () => {
    const [isSpinnerVisible, setIsSpinnerVisible] = useState(true);
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
  
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const { data: items = [], isLoading } = useQuery({
      queryKey: ["studySessions"],
      queryFn: async () => {
        const res = await axiosSecure.get("/study-session");
        return res.data;
      },
    });
  
    useEffect(() => {
      if (searchQuery) {
        const results = items.filter(item => 
          item.sessionTitle && item.sessionTitle.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredItems(results);
        setIsModalOpen(true);
      } else {
        setFilteredItems([]);
        setIsModalOpen(false);
      }
    }, [searchQuery, items]);
  
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
        setSearchQuery('');
      };

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsSpinnerVisible(false);
        }, 100);
      
        return () => clearTimeout(timer);
      }, []);
      
      // if (isSpinnerVisible || isLoading) {
      //   return <div className='w-full mx-auto items-center justify-center flex'><span className="loading loading-bars loading-lg min-h-screen"></span></div>;
      // }
    
      
    return (
        <div className='relative'>
            <Navbar search={searchQuery} handleSearch={handleSearch}></Navbar>
         <div className='w-full border z-30 flex justify-end fixed -mt-[75px] -ml-12'>
         <input
          className="px-2 py-1 rounded-2xl mr-4 justify-end flex  bg-[hsl(0,100%,100%)] absolute mt-6 border-transparent outline-0 z-50 flex justify-end"
          type="text"
          placeholder="Search Your Subject"
          value={searchQuery}
          onChange={handleSearch}
        />
         </div>
           
             <Modal className="" isOpen={isModalOpen} onClose={handleCloseModal} data={filteredItems} />

     <Banner></Banner>

 
            <StudySection items={items} isLoading={isLoading}  ></StudySection>
            <TiutoSection></TiutoSection>
        </div>
    );
};

export default Home;
