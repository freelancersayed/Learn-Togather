import React, { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import MaterialsModal from "./StudentModal";


const StudentDashBoard = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [materials, setMaterials] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    const {
        data: books = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["all-session", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/book-all/${user?.email}`);
            return res.data;
        },
    });
 console.log(books);

    const handleViewMaterials = async (book) => {
        try {
            const res = await axiosSecure.get(`/all-material/${book?.sessionId}`);
            setMaterials(res.data);
            setSelectedBook(book);
            setModalIsOpen(true);
        } catch (error) {
            console.error("Error fetching materials:", error);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setMaterials([]);
        setSelectedBook(null);
    };

    // if (isLoading) {
    //     return <p>Loading...</p>;
    // }

    // if (error) {
    //     return <p>Error loading sessions: {error.message}</p>;
    // }

    console.log(materials);

    return (
        <div className="p-8" data-aos="fade-left">
            <h1 className="text-5xl mb-6 text-center">Booking Session</h1>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 max-w-[1280px] mx-auto">
                {books.map(book => (
                    <div key={book._id} className="max-w-sm p-4 border rounded-lg shadow-md bg-white">
                        <h2 className="text-xl font-semibold mb-2">{book.sessionInfo.sessionTitle}</h2>
                        <p className="text-gray-700 text-base mb-4">{book.sessionInfo.sessionDescription}</p>
                        <p className="text-gray-600 text-sm mb-2">Start Date: {book.sessionInfo.classStartDate}</p>
                        <p className="text-gray-600 text-sm mb-2">End Date: {book.sessionInfo.classEndDate}</p>
                        <p className="text-gray-600 text-sm mb-2">Tutor: {book.sessionInfo.tutorName}</p>
                        <div className="flex items-center space-x-2">
                            <img src={book.sessionInfo.tutorPhoto} alt="Tutor" className="w-10 h-10 rounded-full" />
                            <span className="text-gray-800 text-sm">{book.tutorEmail}</span>
                        </div>
                        <div>
                            <button onClick={() => handleViewMaterials(book)} className="btn btn-sm mt-3 w-full btn-primary">View Materials</button>
                        </div>
                    </div>
                ))}
            </div>

         <div className="grid grid-cols-4">
         <MaterialsModal
                isOpen={modalIsOpen}
                closeModal={closeModal}
                materials={materials}
                selectedBook={selectedBook}
            />
         </div>
        </div>
    );
};

export default StudentDashBoard;
