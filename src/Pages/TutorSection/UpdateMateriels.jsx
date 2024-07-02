import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { useForm } from "react-hook-form";

const UpdateMaterials = ({ sessionId, tutorEmail, onClose, onUploadSuccess, material }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (material) {
      setValue('title', material.title);
      setValue('link', material.link);
      setValue('image', []);
    }
  }, [material, setValue]);

  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await axios.post('https://api.imgbb.com/1/upload?key=7cdd8eb9b4c170a7b6bed5744ac30c8c', formData);
    return response.data.data.display_url;
  };
  console.log(material._id);

  const onSubmit = async (data) => {
   
      let imageUrl = material?.imageUrl || '';
      if (data.image[0]) {
        imageUrl = await uploadImage(data.image[0]);
      }

      const materialData = {
        title: data.title,
        imageUrl,
        link: data.link,
      };

      const res= await axiosSecure.put(`/materials-update/${material._id}`, materialData)
    .then(res => {
      console.log(res);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${material.sessionTitle} Updated successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
        // onUpdate(data);
        reset();
        onClose();
      }
    });
  }



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">{material ? 'Update Material' : 'Upload Material'}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" {...register('title', { required: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Study Session ID</label>
            <input type="text" value={sessionId} readOnly className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tutor Email</label>
            <input type="text" value={tutorEmail} readOnly className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input type="file" {...register('image')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Google Drive Link</label>
            <input type="text" {...register('link', { required: true })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm">Cancel</button>
            <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">{material ? 'Update' : 'Upload'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMaterials;
