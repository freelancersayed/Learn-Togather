import React from 'react';
import { FaGoogleDrive } from 'react-icons/fa';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import StudyDetails from '../../Pages/StudySection/StudyDetails';

Modal.setAppElement('#root'); // Ensure the app element is set for accessibility

const MaterialsModal = ({ isOpen, closeModal, materials, selectedBook }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Materials Modal"
            className="fixed inset-0 flex items-center justify-center z-50 "
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
        >
            <div className="bg-white rounded-lg p-6 max-w-[1000px]  mx-auto  overflow-y-auto ">
                <div className='flex justify-between'>

                <h2 className="text-2xl mb-4 w-full font-bold">Materials for : {selectedBook?.sessionInfo?.sessionTitle}</h2>
                <button onClick={closeModal} className="btn btn-sm btn-danger mb-4 w-16">Close</button>
 
                </div>
                <hr />
                
                <div className="mt-4 ">
                    
                       <div>
                         <div className="flex gap-4 max-h-full overflow-y-auto">
                         <div className='flex-1 space-y-5 h-[500px] border-r-2'>
                            {/* <p><span className='font-bold'>Class Start:</span> {selectedBook?.sessionInfo?.classStartDate}</p> */}
                            {/* <p><span className='font-bold'>Class End:</span> {selectedBook?.sessionInfo?.classEndDate}</p> */}
                            <p><span className='font-bold'>Description :</span> {selectedBook?.sessionInfo?.sessionDescription}</p>
                            <p><span className='font-bold'>Duration</span> {`${selectedBook?.sessionInfo?.sessionDuration?.hours}h ${selectedBook?.sessionInfo?.sessionDuration?.minutes}m ${selectedBook?.sessionInfo?.sessionDuration?.seconds}s`}</p>
                       {/* <p><span className='font-bold'>Fee:</span> {selectedBook?.sessionInfo?.registrationFee}</p> */}

                       <p className="text-gray-800 text-sm">Email : {selectedBook?.sessionInfo?.tutorEmail}</p>
                        <div className="flex items-center space-x-2">
                            <img src={selectedBook?.sessionInfo?.tutorPhoto} alt="" className="w-10 h-10 rounded-full" />
                          <p className="text-gray-600 text-sm mb-2">{selectedBook?.sessionInfo?.tutorName}</p>
                        </div>
                         </div>
                         <div className=' w-1/3  max-h-96 '>
                         {
                            materials.length > 0 ? materials.map((material) => (
                                <div key={material._id} className="mb-2 ">
                                    <h3 className="text-lg">{material?.title}</h3>
                                    <img src={material.imageUrl} alt={material?.title} className="w-full h-44 rounded shadow-md" />
                                <div>
                                    
                                <a className='flex items-center gap-2 text-blue-600 underline mt-2' target="_blank" href={material?.link}> <img className='w-6' src="/drive.svg" alt="" /> Open materiels link</a>
                                </div>
                                </div>
                            )) : <div>

                                <p className='text-center'>No materiels data fund</p>
                                <img src="/no-data.png" alt="" />
                            </div>
                         }
                         </div>
                        </div>
             <Link  to={`/study-details/${selectedBook?.sessionId}`}><button className='btn btn-sm bg-blue-500 w-1/2'>View Details</button></Link>
             
                       </div>
                   
                </div>
            </div>
        </Modal>
    );
};

export default MaterialsModal;
