import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import { Button, Card, CardBody, CardFooter, Typography } from '@material-tailwind/react';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const PendingSession = () => {

    const axiosSecure = useAxiosSecure();

    const { data: sessions = [], isLoading, error, refetch } = useQuery({
        queryKey: ['sessions'],
        queryFn: async () => {
            const res = await axiosSecure.get('/study-session');
            return res.data;
        }
    });

    console.log(sessions);

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + "...";
    };

    const handleStatusChange = async (session, newStatus) => {
      try {
          await axios.put(`https://learn-together-server-lemon.vercel.app/update-status/${session._id}`, { status: newStatus });
          refetch(); // Refresh the sessions data
      } catch (error) {
          console.error("Error updating status:", error);
      }
  };

    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 max-w-[1280px] mx-auto'>
        {
       sessions?.map(session =>(
            //    session?.status ==="Pending" ?
               <div key={session._id} className="lg:w-[500px] mx-auto my-8">
           <Card className="shadow-lg h-[550px w-96">
             <img className="w-full h-48 object-cover" src={session.tutorPhoto} alt="Tutor" />
             <CardBody>
               <Typography variant="h5" className="text-center font-bold text-gray-800 mb-2">
                 {session.sessionTitle}
               </Typography>
               <Typography className="text-gray-600 mb-4">
               {/* {truncateText(session.sessionDescription , 50)} */}
               </Typography>
               <div className="text-gray-700 mb-2">
                 <span className="font-semibold">Tutor:</span> {session.tutorName}
               </div>
               <div className="text-gray-700 mb-2">
                 <span className="font-semibold">Email:</span> {session.tutorEmail}
               </div>
               <div className="text-gray-700 mb-2">
                 <span className="font-semibold">Class Start Date:</span> {dayjs(session.classStartDate).format('DD MMM YYYY')}
               </div>
               <div className="text-gray-700 mb-2">
                 <span className="font-semibold">Class End Date:</span> {dayjs(session.classEndDate).format('DD MMM YYYY')}
               </div>
               <div className="text-gray-700 mb-2">
                 <span className="font-semibold">Registration Start Date:</span> {dayjs(session.registrationStartDate).format('DD MMM YYYY')}
               </div>
               <div className="text-gray-700 mb-2">
                 <span className="font-semibold">Registration End Date:</span> {dayjs(session.registrationEndDate).format('DD MMM YYYY')}
               </div>
               <div className="text-gray-700 mb-4">
                 <span className="font-semibold">Session Duration:</span> {`${session?.sessionDuration?.hours}h ${session?.sessionDuration?.minutes}m ${session?.sessionDuration?.seconds}s`}
               </div>
               <div className="text-gray-700 mb-4  items-center ">
                 <span className="font-semibold cursor-pointer ">Update Status:</span> <span className={`${session.status === "Approved" ? 'badge badge-success badge-lg ': null} ${session.status === "Pending" ? 'badge badge-warning badge-lg hover:badge-error outline-none': 'badge badge-warning'} `}>
                 {session.status}
               <select
               onChange={(e) => handleStatusChange(session, e.target.value)}
               className='bg-transparent mb-1 cursor-pointer outline-none w-5 hover:text-red-500' name="" id="">
                 <option value=""></option>
                 <option value="Approved">Approved</option>
                 <option value="Rejected">Rejected</option>
               </select>

                 </span>
               </div>
             </CardBody>
             <CardFooter className="text-center">
               <Typography className="text-lg font-semibold text-blue-500 mb-2">
                 Registration Fee: {session.registrationFee === 0 ? 'Free' : `$${session.registrationFee}`}
               </Typography>
               <Button className="bg-blue-500 hover:bg-blue-700 transition-colors duration-500 text-white px-4 py-2 rounded">
                 View Details
               </Button>
             </CardFooter>
           </Card>
         </div>
           
       ))
   }
</div>
    );
};

export default PendingSession;
