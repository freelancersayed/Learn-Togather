import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { MdDashboard, MdFeedback, MdHelpOutline } from "react-icons/md";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { RxUpdate } from "react-icons/rx";
import "../../index.css";
import useUser from "../../hooks/useStudent/useUser";
import { motion } from 'framer-motion';

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

const Navbar = ({ search, handleSearch }) => {
  const [users] = useUser();
  const { logOut, user } = useContext(AuthContext);

  const handleSignOut = () => {
    logOut()
      .then(result => {
        console.log('Logged out', result.user);
      })
      .catch(error => {
        console.log('Not logged out', error);
      });
  };

  const navOptions = (
    <span className="lg:flex a">
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/about">About Us</NavLink></li>
      <li><NavLink to="/course">Course</NavLink></li>
      <li><NavLink to="/contact">Announcements</NavLink></li>
    </span>
  );

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-[68px] bg-blue-400 lg:w-full">
      <div className="navbar fixed bg-[#3452ff7a] z-30 lg:w-full mx-auto shadow">
        <div className="navbar-start">
          <div className="dropdown">
            <button 
              tabIndex={0} 
              role="button" 
              className="btn btn-ghost lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </button>
            <motion.ul
              tabIndex={0}
              className="menu menu-sm flex flex-col dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded pr-4"
              animate={isOpen ? "open" : "closed"}
              variants={variants}
            >
              {navOptions}
            </motion.ul>
          </div>
          <Link className="flex items-center" to="/">
            <img className="w-12" src="/logo1.png" alt="" />
            <span className="btn btn-ghost text-xl -mb-3 text-white hidden lg:block">Learn Together</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white outline-none">
            {navOptions}
          </ul>
        </div>
        <div className="navbar-end ">
          {!user ? (
            <Link className="flex text-white" to="/login">Login</Link>
          ) : (
            <>
              <div className="dropdown dropdown-hover dropdown-end text-black">
                <div tabIndex={0} role="button" className="rounded-full w-10 h-10">
                  <img className="rounded-full border-2 w-10 h-10 border-gray-400" src={user.photoURL} alt="" />
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#e6e6e6f3] text-black mt-3 rounded w-[285px] py-4 flex border-b">
                  <h1 className="shadow-white mb-4">
                    <Link to={`/dashboard/${users.role}-home`} className="text-xl flex items-center">
                      <img className="rounded-full mr-2 w-10 h-10 border-gray-400" src={user.photoURL} alt="" />
                      {user.displayName}
                    </Link>
                  </h1>
                  <hr className="border-gray-700" />
                  <li className="text-left mt-2 text-center text-[17px]">
                    {users.role === "Admin" && (
                      <Link to="/dashboard/admin-home">
                        <p className="flex gap-2">
                          <MdDashboard className="text-[17px]" />
                          Admin Dashboard
                        </p>
                      </Link>
                    )}
                    {users.role === "Tutor" && (
                      <Link to="/dashboard/tutor-home">
                        <p className="flex gap-2">
                          <MdDashboard className="text-[17px]" />
                          Tutor Dashboard
                        </p>
                      </Link>
                    )}
                    {users.role === "Student" && (
                      <Link to="/dashboard/all-student">
                        <p className="flex gap-2">
                          <MdDashboard className="text-[17px]" />
                          Student Dashboard
                        </p>
                      </Link>
                    )}
                  </li>
                  <li className="text-left mt-2 text-center text-[17px]">
                    <Link to="/update">
                      <p className="flex gap-2">
                        <RxUpdate className="text-[17px]" />
                        Update Profile
                      </p>
                    </Link>
                  </li>
                  <li className="text-left mt-2 text-center text-[17px]">
                    <Link to="/setting">
                      <p className="flex gap-2">
                        <IoSettingsOutline className="text-[17px]" />
                        Settings & privacy
                      </p>
                    </Link>
                  </li>
                  <li className="text-left mt-2 text-center text-[17px]">
                    <Link to="#">
                      <MdHelpOutline className="text-[17px]" />
                      <p>Help & support</p>
                    </Link>
                  </li>
                  <li className="text-left mt-2 text-center text-[17px]">
                    <Link to="#">
                      <MdFeedback className="text-[17px]" />
                      <p>Give Feedback</p>
                    </Link>
                  </li>
                  <li className="text-left mt-2 text-center text-[17px]">
                    <Link className="flex">
                      <IoLogOutOutline className="text-[17px]" />
                      <button onClick={handleSignOut}>Logout</button>
                    </Link>
                  </li>
                  <p className="my-4">
                    <a className="hover:underline" href="#">Privacy</a> · <a className="hover:underline" href="#">Terms</a> · <a className="hover:underline" href="#">Advertising</a> · <a className="hover:underline" href="#">Ad Choices</a> · <a className="hover:underline" href="#">Cookies</a> · <a className="hover:underline" href="#">Sayed © 2024</a>
                  </p>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
