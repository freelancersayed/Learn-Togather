import  { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import DurationPicker from 'react-duration-picker';
import axios from 'axios';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic/useAxiosPublic';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';


const CreateStudySession = () => {
  const { user, loading } = useContext(AuthContext); // Get logged-in user info from context
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSpinnerVisible, setIsSpinnerVisible] = useState(true)
  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const axiosPublic = useAxiosPublic();

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
  };

  console.log(user.email);

  const onSubmit = async (data) => {
    const sessionData = {
      ...data,
      tutorName: user.displayName,
      tutorPhoto: user.photoURL,
      tutorEmail: user.email,
      sessionDuration: duration,
      registrationFee: 0, // default fee
      status: 'pending' // default status
    };

    try {
      const res = await axiosPublic.post("/study-session", sessionData);
      console.log(res);

      if (res.data.insertedId) {
        // Show success popup
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.sessionTitle} .`,
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "An error occurred. Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSpinnerVisible(false);
    }, 1000);
  
    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);



    
    if (loading || isSpinnerVisible) {
      return <div className='w-full mx-auto items-center justify-center flex'><span className="loading loading-bars loading-lg min-h-screen"></span></div>
    }


  return (
  <div className='bg-gray-100 lg:pb-10'>
      <form onSubmit={handleSubmit(onSubmit)} className="lg:w-3/5  mx-auto p-6 bg-whit shadow-m rounded-lg grid grid-cols-2 gap-2 bg-gray-100 ">
      <h2 className="text-2xl font-bold mb-6 text-center col-span-2">Create Study Session</h2>
      <div className="mb-2 col-span-2">
        <label className="block text-gray-700 font-bold mb-2">Session Title</label>
        <input
          type="text"
          {...register('sessionTitle', { required: true })}
          className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder='Write your title'
        />
        {errors.sessionTitle && <span className="text-red-500 text-sm">This field is required</span>}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-2">Tutor Name</label>
        <input
          type="text"
          value={user.displayName}
          readOnly
          className="w-full px-3 py-1 border border-gray-300 rounded-lg bg-gray-100"
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-2">Tutor Email</label>
        <input
          type="email"
          value={user.email}
          readOnly
          className="w-full px-3 py-1 border border-gray-300 rounded-lg bg-gray-100"
        />
      </div>
      <div className="mb-2 col-span-2">
        <label className="block text-gray-700 font-bold mb-2">Session Description</label>
        <textarea
          {...register('sessionDescription', { required: true })}
          className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
         placeholder='Write your description'
        />
        {errors.sessionDescription && <span className="text-red-500 text-sm">This field is required</span>}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-2">Registration Start Date</label>
        <input
          type="date"
          {...register('registrationStartDate', { required: true })}
          className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.registrationStartDate && <span className="text-red-500 text-sm">This field is required</span>}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-2">Registration End Date</label>
        <input
          type="date"
          {...register('registrationEndDate', { required: true })}
          className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.registrationEndDate && <span className="text-red-500 text-sm">This field is required</span>}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-2">Class Start Date</label>
        <input
          type="date"
          {...register('classStartDate', { required: true })}
          className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.classStartDate && <span className="text-red-500 text-sm">This field is required</span>}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-2">Class End Date</label>
        <input
          type="date"
          {...register('classEndDate', { required: true })}
          className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.classEndDate && <span className="text-red-500 text-sm">This field is required</span>}
      </div>
      <div className="mb-2 col-span-2">
        <label className="block text-gray-700 font-bold mb-2">Session Duration</label>
        <div className="w-full px-3 py-2 border border-gray-300 rounded-lg mx-auto flex justify-center bg-white">
          <DurationPicker
            onChange={handleDurationChange}
            initialDuration={duration}
            maxHours={24}
            maxMinutes={59}
            maxSeconds={59}
            format="hh:mm:ss"
          />
        </div>
      </div>
    
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-2">Registration Fee</label>
        <input
          type="number"
          value={0}
          readOnly
          className="w-full px-3 py-1 border border-gray-300 rounded-lg bg-gray-100"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">Status</label>
        <input
          type="text"
          value="Pending"
          readOnly
          className="w-full px-3 py-1 border border-gray-300 rounded-lg bg-gray-100"
        />
      </div>
  
      <button type="submit" className="w-full bg-blue-600 text-white py-1 px-4 rounded-lg hover:bg-blue-700 col-span-2">
        Create Session
      </button>
    </form>
  </div>
  );
};

export default CreateStudySession;
