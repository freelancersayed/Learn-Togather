import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';


const userAuth =  axios.create({
        baseURL:'https://learn-together-server-lemon.vercel.app'
    })
    
    const useAuth = () => {
        return userAuth;
};

export default useAuth;