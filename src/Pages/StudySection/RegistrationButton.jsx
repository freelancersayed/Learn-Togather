import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

const RegistrationButton = ({ registrationEndDate }) => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);

  useEffect(() => {
    const checkRegistrationStatus = () => {
      const today = dayjs();
      const endDate = dayjs(registrationEndDate);
      if (today.isAfter(endDate)) {
        setIsRegistrationOpen(false);
      }
    };

    checkRegistrationStatus();
  }, [registrationEndDate]);

  return (
    <div>
      {isRegistrationOpen ? (
        // <button className="py-2 px-4 bg-green-500 text-white rounded-md">
        //   Registration Open
        // </button>
        // <div className="badge badge-secondary text-[10px]">Reg. Ongoing</div>
        <span className="inline-flex items-center gap-1 rounded-md bg-green-50  py-1 px-1 text-sm font-semibold text-green-600">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" />
        </svg>
        Reg. Open
      </span>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-1 py-1 text-sm font-semibold text-red-600">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" />
        </svg>
        Reg. Close
      </span>
      )}
    </div>
  );
};

export default RegistrationButton;
