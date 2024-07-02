import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://learn-together-server-lemon.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;