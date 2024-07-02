import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useSession from '../../hooks/useSession';
import DurationPicker from 'react-duration-picker';

const EditSessionModal = ({ session, onClose, onUpdate, refetch}) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (session) {
      setValue('sessionTitle', session.sessionTitle);
      setValue('sessionDescription', session.sessionDescription);
      setValue('registrationStartDate', session.registrationStartDate);
      setValue('registrationEndDate', session.registrationEndDate);
      setValue('classStartDate', session.classStartDate);
      setValue('classEndDate', session.classEndDate);
      setValue('registrationFee', session.registrationFee);
      setValue('sessionDuration', session.duration);

      // if(session.sessionDuration){
      //   setDuration(session.sessionDuration);
      // }
    }
  }, [session, setValue]);


  const axiosSecure = useAxiosSecure();

  console.log(duration);


  const onSubmit = async (data) => {
    data.sessionDuration = duration
console.log(data);


const res= await axiosSecure.put(`/session/${session._id}`, data)
    .then(res => {
      console.log(res);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${session.sessionTitle} Updated successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
        onClose()
        onUpdate(data)
        refetch()
      }
    });
  }

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
  };

  if (!session) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-1/3 ">
        <h2 className="text-xl font-bold mb-4">Edit Session</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Session Title</label>
            <input type="text" {...register('sessionTitle', { required: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Session Description</label>
            <textarea {...register('sessionDescription', { required: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Registration Start Date</label>
            <input type="date" {...register('registrationStartDate', { required: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Registration End Date</label>
            <input type="date" {...register('registrationEndDate', { required: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Class Start Date</label>
            <input type="date" {...register('classStartDate', { required: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Class End Date</label>
            <input type="date" {...register('classEndDate', { required: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          {/* <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Session Duration (hours, minutes, seconds)</label>
            <input type="text" {...register('sessionDuration')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="e.g., 1h 30m 0s" />
          </div> */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Session Duration</label>
            <DurationPicker
              onChange={handleDurationChange}
              initialDuration={duration}
              maxHours={24}
              maxMinutes={59}
              maxSeconds={59}
              format="hh:mm:ss"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Registration Fee</label>
            <input type="number" {...register('registrationFee', { required: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm">Cancel</button>
            <button type="submit" className="py-2 px-4 border border-transparent rounded-md  shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSessionModal;
