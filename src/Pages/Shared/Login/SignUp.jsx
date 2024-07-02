import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import {
  MdOutlineDriveFileRenameOutline,
  MdOutlineMailOutline,
} from "react-icons/md";
import { FaEyeSlash, FaEye, FaUpload } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxiosPublic";
import axios from "axios";
import Navbar from "../Navbar";

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const [errorUser, setErrorUser] = useState("");
  const [errorRole, setErrorRole] = useState("");
  const [chacked, setChacked] = useState(false);

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const image = form.image.files[0];
    const password = form.password.value;
    const role = form.role.value;
    const formData = new FormData();
    formData.append("image", image);

    const Accept = form.terms.checked;

    // Form validation
    if (password.length < 6) {
      setErrorUser("Password must be at least 6 characters.");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setErrorUser("Password must contain at least one uppercase letter.");
      return;
    } else if (!/[a-z]/.test(password)) {
      setErrorUser("Password must contain at least one lowercase letter.");
      return;
    } else if (!/[0-9]/.test(password)) {
      setErrorUser("Password must contain at least one number.");
      return;
    } else if (!role || role === "Select Role") {
      setErrorUser("");
      setErrorRole("Please select a role.");
      return;
    } else if (!Accept) {
      setErrorUser("");
      setErrorRole("");
      setChacked("Please accept the terms and conditions.");
      return;
    }
    setErrorUser("");
    setErrorRole("");
    setChacked("");

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAG_API_KEY}`,
        formData
      );
      const photo = data.data.display_url;

      createUser(email, password)
        .then((result) => {
          updateUserProfile(name, photo).then(() => {
            const userInfo = { name, email, role, photo };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your registration was successful!",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              }
            });
          });
        })
        .catch((error) => {
          setErrorUser(error.message);
        });
    } catch (err) {
      console.log(err);
      setErrorUser("Failed to upload image. Please try again.");
    }
  };

  return (
  <div>
          <Navbar></Navbar>
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[url('/bg/webEdu.jpg')]">
      <div className="bg-white w-96 rounded shadow-2xl p-6">
        <div className="flex justify-center mb-4">
          <NavLink
            to="/login"
            className="flex-1 p-2 text-center text-white bg-gray-500 rounded-tl hover:bg-gray-600"
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="flex-1 p-2 text-center text-white bg-gray-700 rounded-tr"
          >
            SignUp
          </NavLink>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <MdOutlineDriveFileRenameOutline className="absolute top-3 left-3" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full pl-10 pr-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="relative">
            <MdOutlineMailOutline className="absolute top-3 left-3" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="relative">
            <FaUpload className="absolute top-3 left-3" />
            <input
              type="file"
              name="image"
              className="w-full pl-10 pr-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="relative">
            <RiLockPasswordLine className="absolute top-3 left-3" />
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute top-3 right-3 cursor-pointer"
            >
              {showPass ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <div>
            <select
              name="role"
              className="w-full pl-3 pr-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option disabled selected>
                Select Role
              </option>
              <option>Tutor</option>
              <option>Student</option>
            </select>
            {errorRole && <p className="text-red-500">{errorRole}</p>}
          </div>
          {errorUser && <p className="text-red-500">{errorUser}</p>}
          <p className="text-gray-500 text-sm text-justify">
            Your personal data will be used to support your experience
            throughout this website and for other purposes described in our{" "}
            <a href="#" className="underline">
              privacy policy
            </a>
            .
          </p>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="terms"
              className="mr-2"
              required
            />
            <span>I accept the terms and conditions</span>
          </div>
          {chacked && <p className="text-red-500">{chacked}</p>}
          <button
            type="submit"
            className="w-full border border-gray-600 hover:border-blue-600 hover:bg-blue-600 hover:text-white text-black py-2 rounded font-bold"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default SignUp;
