import { useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaEye, FaEyeSlash, FaGithub, FaGooglePlus } from "react-icons/fa";
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxiosPublic';
import Navbar from '../Navbar';

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const from = location.state?.from?.pathname || "/";

  const { singIn, signInWithGoogle, handleGithubeSign } = useContext(AuthContext);

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    setError("");

    singIn(email, password)
      .then((result) => {
        navigate(from, { replace: true });
        form.reset();
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to login. Please check your email and password.");
      });
  };

  const handleGoogleSign = () => {
    signInWithGoogle()
      .then((result) => {
        const loggedInUser = result.user;
        const userInfo = {
          name: loggedInUser?.displayName,
          email: loggedInUser?.email,
          role: "Student",
          photo: loggedInUser?.photoURL
        };
        axiosPublic.post('/users', userInfo)
          .then(res => {
            if (res.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Logged in successfully!",
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/');
            }
          });
        navigate(from, { replace: true });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleGiteSign = () => {
    handleGithubeSign()
      .then(result => {
        navigate(from, { replace: true });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
  <div>
    <Navbar></Navbar>
      <div className="hero min-h-screen bg-[url('/bg/webEdu.jpg')] bg-fixed flex items-center justify-center">
      <div className="bg-[#ffffff] w-80 mx-auto mt-28 rounded shadow-2xl rounded-b">
        <div className="flex text-center login mb-6">
          <NavLink to="/login" className="flex-1 p-2 px-4 bg-gray-700  text-white">Login</NavLink>
          <NavLink to="/signup" className="flex-1 p-2 px-4 bg-gray-500  text-white hover:bg-gray-600">SignUp</NavLink>
        </div>
        <form onSubmit={handleSignIn} className="p-6 text-left space-y-4">
          <label className="flex items-center relative border-b pb-2">
            <MdOutlineMailOutline className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input className="w-full pl-10 py-2 text-black outline-none bg-transparent" type="email" name="email" placeholder="Email" required />
          </label>
          <label className="flex items-center relative border-b pb-2">
            <RiLockPasswordLine className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input className="w-full pl-10 py-2 text-black outline-none bg-transparent" type={showPass ? "text" : "password"} name="password" placeholder="Password" required />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowPass(!showPass)}>
              {showPass ? <FaEye /> : <FaEyeSlash />}
            </span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="remember" className="form-checkbox" />
            <span className="text-gray-400">Remember me</span>
          </label>
          <label>
            <p className="text-gray-500 mt-6"><NavLink to="/forgot-password">Lost Your password?</NavLink></p>
          </label>
          <label>
            <input className="cursor-pointer border border-gray-600 hover:border-blue-600 hover:text-white rounded w-full p-2 my-4 font-bold hover:bg-blue-600" type="submit" value="Login" />
          </label>
          <div className="flex gap-4 justify-center">
            <button type="button" onClick={handleGoogleSign}><FaGooglePlus className="text-2xl" /></button>
            <button type="button" onClick={handleGiteSign}><FaGithub className="text-2xl" /></button>
          </div>
        </form>
        {error && <p className="text-center mb-2 text-red-500 font-bold">{error}</p>}
      </div>
    </div>
  </div>
  );
};

export default Login;
