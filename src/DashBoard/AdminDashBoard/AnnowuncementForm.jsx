import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import { data } from "autoprefixer";


const AnnouncementForm = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const axiosSecure = useAxiosSecure();

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createdAt = new Date()
    try {
      const response = await axiosSecure.post('/announcements', { title, message, createdAt });
      if (response.data.insertedId) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Announcement created successfully",
            showConfirmButton: false,
            timer: 1500
          });
        setTitle('');
        setMessage('');
      } else {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Failed to create announcement",
            showConfirmButton: false,
            timer: 1500
          });
      }
    } catch (error) {
      toast.error('An error occurred while creating the announcement');
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create Announcement</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message</label>
          <textarea
            className="w-full px-3 py-2 border rounded-md"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="text-right">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnnouncementForm;
