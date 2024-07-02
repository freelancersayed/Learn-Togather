import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

export const axiosSecure = axios.create({
  baseURL: 'https://learn-together-server-lemon.vercel.app',
  headers: {
    authorization: `Bearer ${localStorage.getItem('access-token')}`,
},
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);

  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      } else {
        console.warn("No token found in localStorage");
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response ? error.response.status : null;
      if (status === 401 || status === 403) {
        // await logOut();
        // navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
