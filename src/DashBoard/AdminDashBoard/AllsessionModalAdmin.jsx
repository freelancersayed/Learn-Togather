import { useState } from "react";
import Modal from "react-modal";
import { FaEye } from "react-icons/fa";
import EditSessionModal from "../../Pages/TutorSection/UpdateSession";
import { FaDeleteLeft } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";

const SessionModal = ({ session, refetch }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusModalIsOpen, setStatusModalIsOpen] = useState(false);
  const [rejectedModalIsOpen, setRejectedModalIsOpen] = useState(false);
  const [isFree, setIsFree] = useState(true);
  const [amount, setAmount] = useState(0);
  const [rejectionReason, setRejectionReason] = useState("");

  const axiosSecure = useAxiosSecure();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const openStatusModal = () => {
    setStatusModalIsOpen(true);
  };

  const closeStatusModal = () => {
    setStatusModalIsOpen(false);
  };

  const openRejectedModal = () => {
    setRejectedModalIsOpen(true);
  };

  const closeRejectedModal = () => {
    setRejectedModalIsOpen(false);
  };

  const truncateText = (text, maxLength) => {
    if (text?.length <= maxLength) {
      return text;
    }
    return text?.slice(0, maxLength) + "...";
  };

  const handleDelete = async (session) => {
    Swal.fire({
      title: `Are you sure you want to delete user: ${session.sessionTitle}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/study-session-delete/${session._id}`);
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire({
            title: "Error!",
            text: "There was an error deleting the user.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleStatusChange = async (session, newStatus) => {
    if (newStatus === "Approved") {
      openStatusModal();
    } else if (newStatus === "Rejected") {
      openRejectedModal();
    } else {
      try {
        await axiosSecure.put(`/update-fee/${session._id}`, { status: newStatus });
        refetch();
      } catch (error) {
        console.error("Error updating status:", error);
      }
    }
  };

  const handleAmountChange = (event) => {
    setAmount(parseFloat(event.target.value));
  };

  const handleApproveSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosSecure.put(`/update-price/${session._id}`, {
        status: "Approved",
        isFree: isFree,
        amount: isFree ? 0 : parseFloat(amount),
      });
      refetch();
      closeStatusModal();
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `Failed to update the session${error.message}`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const handleRejectionSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosSecure.post(`/rejected-sessions`, {
        sessionId: session._id,
        tutorEmail: session.tutorEmail,
        reason: rejectionReason,
      });
      closeRejectedModal();
      refetch();
    } catch (error) {
      console.error("Error submitting rejection reason:", error);
      alert("Failed to submit the rejection reason.");
    }

    try {
      await axiosSecure.put(`/update-price/${session._id}`, {
        status: "Rejected",
        isFree: isFree,
        amount: isFree ? 0 : parseFloat(amount),
      });
      refetch();
      closeStatusModal();
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `Failed to update the session${error.message}`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };


  return (
  <div>
      <div>
      {
        session?.status === "Rejected" ? null : 
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white justify-between border-gray-300">
            <tbody>
              <tr className="hover:bg-gray-100">
                <td className="py-2 px-4 justify-start w-20 border-b">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={session.tutorPhoto}
                    alt=""
                  />
                </td>
                <td className="w-44 border-b">
                  {" "}
                  <span className="ml-2 hidden md:inline truncate ">
                    {session.tutorName}
                  </span>
                </td>
                <td className="py-2 px-4 border-b truncate justify-center w-96  ">
                  {" "}
                  {truncateText(session.sessionTitle, 40)}
                </td>
                <td className="py-2 px-4 border-b truncate justify-center w-32  ">
                  {" "}
                  {session.registrationFee}
                </td>
                <td className="py-2 px-4 border-b truncate text-right w-20  mb-2 ">
                  <span className={session.status === "Approved" ? "badge badge-success border" : session.status === "Pending" ? "badge badge-secondary" : session.status === "Rejected" ? "badge badge-error" : null}>
                    {session.status}
                  </span>
                  <select
                    onChange={(e) => handleStatusChange(session, e.target.value)}
                    className="bg-transparent mb-1 cursor-pointer outline-none w-5 -ml-1 badge badge-info hover:text-red-500"
                  >
                    <option value="">Approved</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="py-2 px-4 border-b flex justify-end  py-[12.5px]">
                  <button
                    onClick={openModal}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-500 flex"
                  >
                    <FaEye className="mr-2" />
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      }

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Session Details"
        className="max-w-lg mx-auto my-20 bg-white p-6 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="bg-red- text-red-600 hover:text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-500"
          >
            <IoMdClose />
          </button>
        </div>
        <h2 className="text-xl font-bold mb-4">{session.sessionTitle}</h2>
        <p className="mb-2">{session.sessionDescription}</p>
        <p className="mb-2">
          <strong>Registration Start Date:</strong> {session.registrationStartDate}
        </p>
        <p className="mb-2">
          <strong>Registration End Date:</strong> {session.registrationEndDate}
        </p>
        <p className="mb-2">
          <strong>Class Start Date:</strong> {session.classStartDate}
        </p>
        <p className="mb-2">
          <strong>Class End Date:</strong> {session.classEndDate}
        </p>
        <p className="mb-2">
          <strong>Session Duration:</strong> {session?.sessionDuration?.hours} hours, {session?.sessionDuration?.minutes} minutes, {session?.sessionDuration?.seconds} seconds
        </p>
        <p className="mb-2">
          <strong>Registration Fee:</strong> ${session.registrationFee}
        </p>
        <p className="mb-2">
          <strong>Status:</strong> {session.status}
        </p>
        <div className="flex items-center mb-2">
          <img
            className="w-10 h-10 rounded-full mr-2"
            src={session.tutorPhoto}
            alt={session.tutorName}
          />
          <div>
            <p className="font-bold">{session.tutorName}</p>
            <p>{session.tutorEmail}</p>
          </div>
        </div>
        <div className="flex justify-between gap-10">
          <button
            onClick={() => handleDelete(session)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-500"
          >
            Delete
          </button>
          <button
            onClick={handleOpenModal}
            className=" bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors duration-500 "
          >
            Edit
          </button>
        </div>
        {isModalOpen && (
          <EditSessionModal session={session} onClose={handleCloseModal} />
        )}
      </Modal>

      <Modal
        isOpen={statusModalIsOpen}
        onRequestClose={closeStatusModal}
        contentLabel="Approve Session"
        className="max-w-md mx-auto my-20 bg-white p-6 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="flex justify-end">
          <button
            onClick={closeStatusModal}
            className="bg-red- text-red-600 hover:text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-500"
          >
            <IoMdClose />
          </button>
        </div>
        <h2 className="text-xl font-bold mb-4">Approve Session</h2>
        <div className="mb-4">
          <label className="block mb-2">Is the session free or paid?</label>
          <select
            value={isFree ? "Free" : "Paid"}
            onChange={(e) => setIsFree(e.target.value === "Free")}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
        </div>
        {!isFree && (
          <div className="mb-4">
            <label className="block mb-2">Amount</label>
            <form onSubmit={handleApproveSubmit}>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
              <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-500">
                Submit
              </button>
            </form>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={rejectedModalIsOpen}
        onRequestClose={closeRejectedModal}
        contentLabel="Reject Session"
        className="max-w-md mx-auto my-20 bg-white p-6 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="flex justify-end">
          <button
            onClick={closeRejectedModal}
            className="bg-red- text-red-600 hover:text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-500"
          >
            <IoMdClose />
          </button>
        </div>
        <h2 className="text-xl font-bold mb-4">Reject Session</h2>
        <form onSubmit={handleRejectionSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Rejection Reason</label>
            <input
              type="text"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button type="submit" className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-500">
            Submit
          </button>
        </form>
      </Modal>
    </div>
    
  </div>
  );
};

export default SessionModal;
