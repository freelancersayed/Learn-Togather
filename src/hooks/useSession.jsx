import { useContext, useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure/useAxiosSecure";
import { AuthContext } from "../Providers/AuthProvider";


const useSession = ()=> {

    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);


    const {data: sessions = [], isLoading, error, refetch}= useQuery({
        queryKey: [ 'all-session', user?.email],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/all-session/${user?.email}`)
            return res.data
        }
    })
    return [sessions, isLoading, refetch, error]
}

export default useSession;