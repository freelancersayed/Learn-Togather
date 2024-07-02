import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import UploadMaterials from "./UploadedForm";
import Swal from "sweetalert2";
import UpdateMaterials from "./UpdateMateriels";

const ViewAllMaterials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMaterial, setEditMaterial] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const {
    data: sessions = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["all-session", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-materials/${user?.email}`);
      return res.data;
    },
  });

  console.log(sessions);


  const handleOpenModal = (material) => {
    setEditMaterial(material);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditMaterial(null);
  };

  const handleUploadSuccess = () => {
    refetch(); // Refetch materials on upload success
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosSecure.delete(`/materials-delete/${id}`);
      if (response.data.deletedCount > 0) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Material deleted successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        refetch(); // Refetch materials after successful deletion
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };





  return (
    <div>
      <div className="grid grid-cols-4 mt-10 gap-4 max-w-[1280px] mx-auto mx-5">
        {sessions.map((item) => (
          <div key={item._id} className=" h- bg-base-100  shadow-xl w-">
            <div className="fle">
              <div className="hover:cursor-zoom-in">
                <PhotoProvider>
                  <PhotoView src={item.imageUrl}>
                    <img
                      className="h-52 w-full hover:mask-parallelogram-3"
                      src={item.imageUrl}
                      alt=""
                    />
                  </PhotoView>
                </PhotoProvider>
              </div>

              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <a href={item.link}>Drive link</a>
                <input
                  className=" cursor-pointer"
                  type="link"
                  defaultValue={item.link}
                  name=""
                  id=""
                />
              </div>
            </div>
            <div className="flex gap-7 justify-end px-5 pb-2 text-2xl">
              <button onClick={() => handleDelete(item._id)}>
                <MdDeleteForever className="hover:text-red-500" />
              </button>
              <button onClick={() => handleOpenModal(item)}>
                <FiEdit className="hover:text-blue-500" />
              </button>
            </div>

            {isModalOpen && (
              <UpdateMaterials
              material={editMaterial}
                onClose={handleCloseModal}
                onUploadSuccess={handleUploadSuccess}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllMaterials;
