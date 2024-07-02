import axios from "axios";
import React, { useState } from "react";
import DurationPicker from "react-duration-picker";

const TutorForm = () => {

  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('/api/duration', duration);
      console.log('Duration saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving duration:', error);
    }
  };
  
  return (
    <div>
      <section className="p-6 min-h-screen bg-gray-300">
        <form
          noValidate=""
          action=""
          className="container flex flex-col mx-auto space-y-12"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Create Your Session</p>
              <p className="text-xs">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Adipisci fuga autem eum!
              </p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                {/* title */}
              <div className="col-span-full sm:col-span-6">
                <label htmlFor="firstname" className="text-sm">
                  Session Title
                </label>
                <input
                  id="firstname"
                  type="text"
                  placeholder="Session Title"
                  className="w-full rounded-md px-2 py-1"
                />
              </div>
            {/* description */}
              <div className="col-span-full">
                <label htmlFor="address" className="text-sm">
                  Session Description
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="session Description"
                  className="w-full rounded-md px-2 py-1"
                />
              </div>

                {/* Reg Date */}
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="reg_start" className="text-sm">
                  Registration start date
                </label>
                <input
                  id="reg_start"
                  type="date"
                  placeholder="sart date"
                  className="w-full rounded-md px-2 py-1 "
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="reg_end" className="text-sm">
                  Registration end date
                </label>
                <input
                  id="reg_end"
                  type="date"
                  placeholder="end date"
                  className="w-full rounded-md  px-2 py-1"
                />
              </div>

              <div className="col-span-full sm:col-span-2">
                <label htmlFor="reg_end" className="text-sm">
                  Registration Fee
                </label>
                <input
                  id="reg_end"
                  type="number"
                  placeholder="Registration fee"
                  className="w-full rounded-md  px-2 py-1"
                />
              </div>

              {/* Class date */}
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="class_start" className="text-sm">
                  Class start date
                </label>
                <input
                  id="class_start"
                  type="date"
                  placeholder="start date"
                  className="w-full rounded-md px-2 py-1"
                />
              </div>
    
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="class_end" className="text-sm">
                  Class end date
                </label>
                <input
                  id="class_end"
                  type="date"
                  placeholder=""
                  className="w-full rounded-md px-2 py-1"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="duration" className="text-sm">
                Session duration
                </label>
                <input
                  id="duration"
                  type=""
                  placeholder="duration"
                  className="w-full rounded-md px-2 py-1"
                />
              </div>

             
            </div>
          </fieldset>


           <div className="w-full flex justify-center">
           <button className="btn btn-sm bg-blue-500 border-none text-white shadow-lg w-44">Add session</button>
           </div>
        </form>
      </section>
      
      <form onSubmit={handleSubmit}>
      <h2>Select Duration</h2>
      <DurationPicker
        onChange={handleDurationChange}
        initialDuration={duration}
        maxHours={24}
        maxMinutes={59}
        maxSeconds={59}
        format="hh:mm:ss"
      />
      <button type="submit">Submit</button>
      <div className="flex">
        <h3>Selected Duration:</h3>
        <p>Hours: {duration.hours}</p>
        <p>Minutes: {duration.minutes}</p>
        <p>Seconds: {duration.seconds}</p>
      </div>
    </form>
    </div>
  );
};

export default TutorForm;
