
import { useContext, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';



const CreateNoteForm = ({ refetchNotes }) => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const newNote = {
          title,
          content,
          email: user?.email, // Associate the note with the logged-in user
          created_at: new Date(),
        };
      
        try {
          const res = await axiosSecure.post('/notes', newNote);
          console.log(res.status);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Save Your Note",
            showConfirmButton: false,
            timer: 1500
          });
          reset()
          refetchNotes();
        e.reset()
           
          // Clear form
          setTitle('');
          setContent('');
          if (res.status) {
            // Refetch notes or update the state to show the new note
            refetchNotes();
           
            // Clear form
            setTitle('');
            setContent('');
      
            // Show success message using sweetalert2
            Swal.fire({
              icon: 'success',
              title: 'Note Created!',
              text: 'Your note has been successfully saved.',
            });
          }
        } catch (error) {
          console.error('Error saving note:', error);
          // You can also show an error message using sweetalert2 here
        }
      };

    return (
    <div className='max-w-[1280px] mx-auto'>   

         <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md "  data-aos="fade-down">
    <h2 className="text-2xl mb-4 text-blue-500">Create a Note</h2>
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
        </label>
        <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded hover:bg-gray-50 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
        />
    </div>
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Content
        </label>
        <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='type your note......'
            className="shadow appearance-none border hover:bg-gray-50 rounded h-60 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
        ></textarea>
    </div>
    <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
        Save Note
    </button>
</form></div>
    );
};

export default CreateNoteForm;
