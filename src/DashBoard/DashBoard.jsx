import { NavLink, Outlet, } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useUser from "../hooks/useStudent/useUser";
import Navbar from "../Pages/Shared/Navbar";
import { FaArrowLeft, FaArrowRight, FaEdit, FaRandom } from "react-icons/fa";
import { SiSessionize } from "react-icons/si";
import { GiMaterialsScience } from "react-icons/gi";
import { MdCloseFullscreen, MdEditNote } from "react-icons/md";
import { IoCreate } from "react-icons/io5";
// import useStudent from "../hooks/useStudent/useStudent";
// import useAdmin from "../hooks/useAdmin/useAdmin";

import "../index.css";
import useAdmin from "../hooks/useAdmin";
import useStudent from "../hooks/useStudent/useStudent";
import useTutor from "../hooks/useTutor";
import { RiMenuUnfoldLine } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";

const DashBoard = () => {

const {user, loading} = useContext(AuthContext)
const [isAdmin] = useAdmin();
const [isStudent] = useStudent();
const [isTutor] = useTutor();
// const axiosPublic = useAxiosPublic();
const [role, setRoles] = useState([])
const [isSpinnerVisible, setIsSpinnerVisible] = useState(true)
const [users] = useUser()

console.log(users);


useEffect(() => {
  const timer = setTimeout(() => {
    setIsSpinnerVisible(false);
  }, 500);

  return () => clearTimeout(timer); // Cleanup timer on component unmount
}, []);



if (loading || isSpinnerVisible) {
  return <div className='w-full mx-auto items-center justify-center flex'><span className="loading loading-bars loading-lg min-h-screen"></span></div>
}


  return (
    <div >
      <Navbar></Navbar>
      
<div className="lg:flex links">
{ !loading ?
<div className=" hidden lg:block w-60">
{
 isAdmin && <div className="flex uppercase flex-col gap-4 pl-8 pr-4 pt-5  text-white w-60 border border-red-500 h-full lg:bg-gray-900">
<div className="flex w-full items-center mt-5 rounded-full"><img className="w-38 h-38 rounded-full items-center mx-auto" src={user.photoURL} alt="" /></div>
  <h1 className="lg:text-xl text-center font-bold ">{user?.displayName}</h1>
  <hr />
  <NavLink to="/dashboard/admin-home" className="">Home</NavLink>
  <NavLink to="/dashboard/all-user" className=" ">All user</NavLink>
  {/* <NavLink to="/dashboard/pending-session">Pending Session</NavLink> */}
  <NavLink to="/dashboard/all-session-admin">All session</NavLink>
  <NavLink to="/dashboard/all-materiel-admin">All materials</NavLink>
 </div>}

{isStudent && <>
<div className="flex flex-col gap-4 pl-8 pr-4 p text-white w-full h-full lg:bg-gray-900">
<div className="flex w-full items-center rounded-full"><img className="w-28 h-28 rounded-full items-center mx-auto" src={user.photoURL} alt="" /></div>
 <h1 className="lg:text-xl text-center font-bold">STUDENT DASHBOARD</h1>
 <hr />
 <NavLink to="/dashboard/all-student">All Classmate</NavLink>
 <NavLink to="/dashboard/student">See Booking Session</NavLink>
 <NavLink to="/dashboard/note-form">Create Note</NavLink>
 <NavLink to="/dashboard/personal-note">Personal Note</NavLink>
 {/* <NavLink>All Unit Teacher</NavLink> */}
</div>
</>}

 {isTutor &&
 <div className="flex flex-col gap-4 lg:pl-8 pr-4  text-white w-full h-full lg:bg-gray-900">
<div className="flex w-full items-center rounded-full"><img className="w-28 h-28 rounded-full items-center mx-auto" src={user.photoURL} alt="" /></div>
 <h1 className="lg:text-xl text-center font-bold">TECHERS DASHBOARD</h1>
 <hr />
 <NavLink to="/dashboard/tutor-home" className="flex items-center gap-2 hover:text-orange-400"><IoCreate /> Tutor Home</NavLink>
 <NavLink to="/dashboard/form" className="flex items-center gap-2 hover:text-orange-400"><IoCreate /> Create session</NavLink>
 <NavLink to="/dashboard/all-session" className="flex items-center gap-2 hover:text-orange-400"><SiSessionize /> View All Session</NavLink>
 <NavLink to="/dashboard/approved-session" className="flex items-center gap-2 hover:text-orange-400"><GiMaterialsScience />  Upload Materials</NavLink>
 <NavLink to="/dashboard/all-materials" className="flex items-center gap-2 hover:text-orange-400"><GiMaterialsScience /> View All Materials</NavLink>
 {/* <NavLink to="/dashboard/form" className="flex items-center gap-2 hover:text-orange-400"><MdEditNote /> View All Note</NavLink> */}
</div>
}
</div>:
(
  <>
<div className="w-60 ">
<div className="flex flex-col items-center mt-5 rounded-full">
      <Skeleton circle={true} height={152} width={152} />
    </div>
    <h1 className="lg:text-xl text-center mb-5 font-bold">
      <Skeleton width={120} />
    </h1>
    <hr />
<div className="ml-5 flex flex-col mt-5 gap-2">
<Skeleton width={90} height={20} />
    <Skeleton width={100} height={20} />
    <Skeleton width={120} height={20} />
    <Skeleton width={150} height={20} />
</div>
</div>
  </>
)
}   

<div className=" "></div>
     <div className="flex  flex-col gap-5 bg-gray-100 w-full bg-cove lg:w-0  border">
  
     <div className="drawer ">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content w-full lg:hidden bg-gray-800 text-white -mt-1">
    {/* Page content here */}
    <label htmlFor="my-drawer" className=" text px-2 rounded pt- hover:bg-gray-800 flex w-[] py-1 items-center gap-2 "> <FaArrowRight className=" shadow-lg text-re" /><span className="font-bold">Open DashBoard</span></label>
  </div> 
  <div className="drawer-side z-20">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu pt-6 lg:w-60 w-52 min-h-full  text-base-content bg-gray-900">
      {/* Sidebar content here */}

<div className="mt-12">
<div className="drawer-content w-[210px] -ml-3 lg:hidden bg-gray-900 text-white -mt-2 pt-1 mb-3">
    {/* Page content here */}
    <label htmlFor="my-drawer" className=" text px-2 rounded pt-2 hover:bg-gray-800 flex  py-2 items-center gap-2 "> <FaArrowLeft className=" shadow-lg" /><span className="font-bold">Close DashBoard</span></label>
  </div> 
{
 isAdmin && <div className="flex uppercase flex-col gap-4 pl-8 pr-4  text-white w-full h-full lg:bg-gray-900">
<div className="flex w-full items-center rounded-full"><img className="w-28 h-28 rounded-full items-center mx-auto" src={user.photoURL} alt="" /></div>
  <h1 className="lg:text-xl text-center font-bold ">{user?.displayName}</h1>
  <hr />
  <NavLink to="/dashboard/admin-home" className="">Home</NavLink>
  <NavLink to="/dashboard/all-user" className=" ">All user</NavLink>
  {/* <NavLink to="/dashboard/pending-session">Pending Session</NavLink> */}
  <NavLink to="/dashboard/all-session-admin">All session</NavLink>
  <NavLink to="/dashboard/all-materiel-admin">All materials</NavLink>
 </div>}

{isStudent && <>
<div className="flex flex-col gap-4 pl-8 pr-4 p text-white w-full h-full lg:bg-gray-900">
<div className="flex w-full items-center rounded-full"><img className="w-28 h-28 rounded-full items-center mx-auto" src={user.photoURL} alt="" /></div>
 <h1 className="lg:text-xl text-center font-bold">STUDENT DASHBOARD</h1>
 <hr />
 <NavLink to="/dashboard/all-student">All Classmate</NavLink>
 <NavLink to="/dashboard/student">See Booking Session</NavLink>
 <NavLink to="/dashboard/note-form">Create Note</NavLink>
 <NavLink to="/dashboard/personal-note">Personal Note</NavLink>
 {/* <NavLink>All Unit Teacher</NavLink> */}
</div>
</>} 

 {isTutor &&
 <div className="flex flex-col gap-4 lg:pl-8 pr-4  text-white w-full h-full lg:bg-gray-900">
<div className="flex w-full items-center rounded-full"><img className="w-28 h-28 rounded-full items-center mx-auto" src={user.photoURL} alt="" /></div>
 <h1 className="lg:text-xl text-center font-bold">TECHERS DASHBOARD</h1>
 <hr />
 <NavLink to="/dashboard/tutor-home" className="flex items-center gap-2 hover:text-orange-400"><IoCreate /> Tutor Home</NavLink>
 <NavLink to="/dashboard/form" className="flex items-center gap-2 hover:text-orange-400"><IoCreate /> Create session</NavLink>
 <NavLink to="/dashboard/all-session" className="flex items-center gap-2 hover:text-orange-400"><SiSessionize /> View All Session</NavLink>
 <NavLink to="/dashboard/approved-session" className="flex items-center gap-2 hover:text-orange-400"><GiMaterialsScience />  Upload Materials</NavLink>
 <NavLink to="/dashboard/all-materials" className="flex items-center gap-2 hover:text-orange-400"><GiMaterialsScience /> View All Materials</NavLink>
 {/* <NavLink to="/dashboard/form" className="flex items-center gap-2 hover:text-orange-400"><MdEditNote /> View All Note</NavLink> */}
</div>
}
</div>
      
    </ul>
  </div>
</div>


          
            </div>

        <div className="px-  w-full min-h-screen items-center  justify-center" data-aos="fade-right">
          
       
         <Outlet></Outlet>
      
        </div>
</div>
    </div>
  );
};

export default DashBoard;