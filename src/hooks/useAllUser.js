
import useAxiosSecure from './useAxiosSecure/useAxiosSecure';

const useAllUser = async () => {
    const axiosSecure = useAxiosSecure()
    const {data} = await axiosSecure.get('/users')
    return [data]
};

export default useAllUser;