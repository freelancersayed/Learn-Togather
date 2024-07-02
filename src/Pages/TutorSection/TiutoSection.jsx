import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import 'animate.css';
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const TiutoSection = () => {

    useEffect(() => {
        AOS.init();
      }, []);

const axiosSecure = useAxiosSecure()

const {data: users=[]} = useQuery({
    queryKey: ["users-tutor"],
    queryFn: async()=>{
        const res = await axiosSecure.get('/users-tutors');
        return res.data
    }
})


    

      console.log(users);

    return (
        <div className='text-center max-w-[1280px] mx-auto py-8' >
            {/* <h1 className="text-4xl mb-10">Our Teacher</h1> */}
            <div className=" divider text-4xl mb-10  font-bold">Our Teacher</div>
         
     <div className="flex gap-5 px-20 py-10 pl-0  shadow- overflow-x-auto " data-aos="flip-left">
     {
                users.map(tutor=> tutor.role === "Tutor" && (
                    <div className=" p-5 rounded  w-80 shadow-md hover:w-[318px] animate__animated animate__lightSpeedInRight" key={tutor._id} >
           
                    <div className="w-52 h-52 overflow-hidden">
                          <img className=" w-full h-full rounded-full border-2 border-gray-200" src={tutor.photo} alt="" />
                      </div>
                         <div className="text-center py-2 overflow-hidden">
                          <h1 className="text-xl uppercase overflow-hidden">{tutor.name}</h1>
                          <p>{tutor.email}</p>
                          </div>  
                          </div>
                )
                        )
            }
     </div>

           
        </div>
    );
};

export default TiutoSection;