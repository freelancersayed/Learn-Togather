// import axios from "axios";
// import { useEffect, useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";

// const Alluser = () => {
//   const [users, setUsers] = useState([]);
// //   const [data, setData] = useState(users);
//   const [searchTerm, setSearchTerm] = useState("");
//   const axiosSecure = useAxiosSecure()

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     fetch("https://learn-together-server-lemon.vercel.app/users")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setUsers(data);
//       });



//       if (searchTerm) {
//         const fetchData = async () => {
//           try {
//             const response = await axios.get(`https://learn-together-server-lemon.vercel.app/search-users?searchTerm=${searchTerm}`);
//             setUsers(response.data);
//           } catch (error) {
//             console.error('Error fetching data:', error);
//           }
//         };
  
//         fetchData();
//     } else {
//         setUsers([])
//     }
//   }, [searchTerm]);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("https://learn-together-server-lemon.vercel.app/users");
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };


//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };


//   // const handleDelete = async (item) => {
//   //   const confirmDelete = window.confirm(`Are you sure you want to delete user: ${item.name}?`);
//   //   if (!confirmDelete) return;

//   //   try {
//   //     await axios.delete(`https://learn-together-server-lemon.vercel.app/delete-user/${item._id}`);
//   //     fetchUsers();
//   //     toast.success("User deleted successfully!");
//   //   } catch (error) {
//   //     console.error("Error deleting user:", error);
//   //     toast.error("Error deleting user.");
//   //   }
//   // };


//   const handleDelete = async (item) => {
//     Swal.fire({
//       title: `Are you sure you want to delete user: ${item.name}?`,
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`https://learn-together-server-lemon.vercel.app/delete-user/${item._id}`);
//           fetchUsers();
//           Swal.fire({
//             title: "Deleted!",
//             text: "Your file has been deleted.",
//             icon: "success"
//           });
//         } catch (error) {
//           console.error("Error deleting user:", error);
//           Swal.fire({
//             title: "Error!",
//             text: "There was an error deleting the user.",
//             icon: "error"
//           });
//         }
//       }
//     });
//   };

//   const handleRoleChange = async (item, newRole) => {
//     try {
//       await axios.put(`https://learn-together-server-lemon.vercel.app/update-user/${item._id}`, { role: newRole });
//       fetchUsers();
//     } catch (error) {
//       console.error("Error updating role:", error);
//     }
//   };

//   return (
//     <div className="max-w-[1280px] mx-auto pt-6 bg-gray-20 pb-4">
//       <div className="w-full  mb-5 px-4 flex items-center relative">
//       <FaSearch className="ml-2 absolute "></FaSearch>
//         <input
//           className="pl-8 lg:w-80 py-1 rounded-2xl justify-end flex  bg-[hsl(0,100%,100%)]  border outline-0  flex justify-end  "
//           type="text"
//           placeholder="Search user"
//           value={searchTerm}
//           onChange={handleSearch}
//         />
//       </div>

//       <div className="container mx-auto px-4">
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 border-b">Serial</th>
//                 <th className="py-2 px-4 border-b">Photo</th>
//                 <th className="py-2 px-4 border-b">Name</th>
//                 <th className="py-2 px-4 border-b">Email</th>
//                 <th className="py-2 px-4 border-b">Role</th>
//                 <th className="py-2 px-4 border-b">Action</th>
//               </tr>
//             </thead>
//             </table>
//             <table className="min-w-full bg-white">
//             <tbody>
//               { users.map((item, index) => (
//                 <tr key={item.id} className="hover:bg-gray-100">
//                   <td className="py-2 px-4 border-b text-center">
//                     {index + 1}
//                   </td>
//                   <td className="py-2 px-4 border-b text-center">
//                     <img
//                       className="w-10 h-10 rounded-full mx-auto"
//                       src={item.photo}
//                       alt={item.name}
//                     />
//                   </td>
//                   <td className="py-2 px-4 border-b">{item.name}</td>
//                   <td className="py-2 px-4 border-b">{item.email}</td>
//                   <td className="py-2 px-4 border-b text-center">
//                   {item.role}
//                   <select
//                       className="w-4 mt-1 ml-1"
//                       // value={item.role}
//                       onChange={(e) => handleRoleChange(item, e.target.value)}
//                     >
//                       <option value="Admin"></option>
//                       <option value="Admin">Admin</option>
//                       <option value="Student">Student</option>
//                       <option value="Tutor">Tutor</option>
//                     </select>
//                   </td>
//                   <td className="py-2 px-4 border-b text-center">
//                     <button onClick={()=>handleDelete(item)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-500">
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//               // : <div className="w-full flex mx-auto justify-center">
//               //    {/* <p className='text-center'>No materiels data fund</p> */}
//               //    <img className="w-1/2 mx-auto" src="/no-data.png" alt="" />
//               //   </div>
//                 }
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Alluser;


import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Alluser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all users
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Fetch users based on search term
  useEffect(() => {
    if (searchTerm) {
      const fetchData = async () => {
        try {
          const response = await axiosSecure.get(`/search-users?searchTerm=${searchTerm}`);
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    } else {
      refetch();
    }
  }, [searchTerm, axiosSecure, refetch]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (userId) => {
      await axiosSecure.delete(`/delete-user/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast.success("User deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user.");
    },
  });

  const handleDelete = (item) => {
    Swal.fire({
      title: `Are you sure you want to delete user: ${item.name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(item._id);
      }
    });
  };

  // Update role mutation
  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, newRole }) => {
      await axiosSecure.put(`/update-user/${userId}`, { role: newRole });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
    onError: (error) => {
      console.error("Error updating role:", error);
    },
  });

  const handleRoleChange = (item, newRole) => {
    updateRoleMutation.mutate({ userId: item._id, newRole });
  };

  return (
    <div className="max-w-[1280px] mx-auto pt-6 bg-gray-20 pb-4">
      <div className="w-full mb-5 px-4 flex items-center relative">
        <FaSearch className="ml-2 absolute" />
        <input
          className="pl-8 lg:w-80 py-1 rounded-2xl justify-end flex bg-[hsl(0,100%,100%)] border outline-0 flex justify-end"
          type="text"
          placeholder="Search user"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Serial</th>
                <th className="py-2 px-4 border-b">Photo</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
          </table>
          <table className="min-w-full bg-white">
            <tbody>
              {users.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <img className="w-10 h-10 rounded-full mx-auto" src={item.photo} alt={item.name} />
                  </td>
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">{item.email}</td>
                  <td className="py-2 px-4 border-b text-center">
                    {item.role}
                    <select
                      className="w-4 mt-1 ml-1"
                      // value={item.role}
                      onChange={(e) => handleRoleChange(item, e.target.value)}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Student">Student</option>
                      <option value="Tutor">Tutor</option>
                    </select>
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleDelete(item)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {/* : <div className="w-full flex mx-auto justify-center">
               <img className="w-1/2 mx-auto" src="/no-data.png" alt="" />
              </div> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Alluser;
