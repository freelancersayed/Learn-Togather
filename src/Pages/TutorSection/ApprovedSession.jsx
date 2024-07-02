import React, { useState } from 'react';
import useSession from '../../hooks/useSession';
import UploadedForm from './UploadedForm';
import UploadMaterials from './UploadedForm';
const ApprovedSession = ({ session }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sessions, isLoading, refetch, error] = useSession();

  console.log(sessions);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUploadSuccess = () => {
    // Refetch materials or any other actions on upload success
  };

  return (
    <div className='grid lg:grid-cols-3 max-w-[1280px] px-2 mx-auto gap-4'>
     {
        sessions.map(session =>
            <div key={session._id} className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4">
            {
                session.status === "Approved" ? 
                <div className="p-4 h-[390px]">
              <h2 className="text-xl font-bold mb-2">{session.sessionTitle}</h2>
              <p className="text-gray-700 mb-4">{truncateText(session?.sessionDescription, 50)}</p>
              <div className="flex flex-col space-y-2">
                <div>
                  <span className="font-semibold">Registration Start Date:</span> {session.registrationStartDate}
                </div>
                <div>
                  <span className="font-semibold">Registration End Date:</span> {session.registrationEndDate}
                </div>
                <div>
                  <span className="font-semibold">Class Start Date:</span> {session.classStartDate}
                </div>
                <div>
                  <span className="font-semibold">Class End Date:</span> {session.classEndDate}
                </div>
                <div>
                  <span className="font-semibold">Registration Fee:</span> ${session.registrationFee}
                </div>
                <div>
                  <span className="font-semibold">Session Duration:</span> {`${session?.sessionDuration?.hours}h ${session?.sessionDuration?.minutes}m ${session?.sessionDuration?.seconds}s`}
                </div>
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${session.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : session.status === 'Approved' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    Status: {session.status}
                  </span>
                </div>
                {session.status === 'Approved' && 
                  <button onClick={handleOpenModal} className="mt-2 py-2 px-4 btn-sm items-center flex justify-center border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">Upload Material</button>
               
                }
              </div>
            </div>
            : null
            }
            {
              isModalOpen&&<UploadMaterials handleCloseModal={handleCloseModal} ></UploadMaterials>
            }

          </div>

        )
     }
  
    </div>
  );
};

export default ApprovedSession;
