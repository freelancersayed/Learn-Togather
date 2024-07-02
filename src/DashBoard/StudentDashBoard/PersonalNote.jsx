import { useContext, useState } from "react";

import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PersonalNote = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();



  const {
    data: notes = [],
    isLoading,
    error,
    refetch,
} = useQuery({
    queryKey: ["notes", user?.email],
    queryFn: async () => {
        const res = await axiosSecure.get(`/notes/${user?.email}`);
        return res.data;
    },
});

console.log(notes)
  return (
    <div className="max-w-[800px] mx-auto py-5">
        <div>
            <h1 className="text-4xl text-center font-bold my-2">All Note</h1>
            <hr />
        </div>
      {notes.map((note) => (
        <div key={note._id} className="collapse collapse-arrow bg-base-200 mt-4"  data-aos="flip-down">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <p className="px-2 text-right text-sm text-gray-700 py-1"> {note.created_at}</p>
          <div className="collapse-title text-xl font-bold text-black">
            {note.title} 
          </div>
          <div className="collapse-content">
            <p>{note.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PersonalNote;
