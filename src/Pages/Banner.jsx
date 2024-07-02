import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from '../../src/assets/learn/banner/1.jpeg';
import img2 from '../../src/assets/learn/banner/2.jpeg';
import img3 from '../../src/assets/learn/banner/3.webp';
import img4 from '../../src/assets/learn/banner/4.jpg';
import img5 from '../../src/assets/learn/banner/5.jpg';
import img6 from '../../src/assets/learn/banner/6.webp';

const Banner = () => {
    return (
        <div className="rounded mb-10">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={3000}
                transitionTime={1000}
            >
                <div className="relative lg:h-[700px]">
                    <img className="lg:h-[700px] w-full" src={img5} alt="Banner 1" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4 bg-black bg-opacity-50">
                        <h2 className="text-4xl lg:text-6xl font-bold">Welcome to Learn Together</h2>
                        <p className="mt-4 text-xl lg:text-2xl">Your journey to knowledge starts here</p>
                    </div>
                </div>
                <div className="relative lg:h-[700px]">
                    <img className="lg:h-[700px] w-full" src={img6} alt="Banner 2" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4 bg-black bg-opacity-50">
                        <h2 className="text-4xl lg:text-6xl font-bold">Expert Guidance</h2>
                        <p className="mt-4 text-xl lg:text-2xl">Learn from experienced teachers and mentors</p>
                    </div>
                </div>
                <div className="relative lg:h-[700px]">
                    <img className="lg:h-[700px] w-full" src={img3} alt="Banner 3" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4 bg-black bg-opacity-50">
                        <h2 className="text-4xl lg:text-6xl font-bold">Discover New Horizons</h2>
                        <p className="mt-4 text-xl lg:text-2xl">Explore a variety of courses and sessions</p>
                    </div>
                </div>
                <div className="relative lg:h-[700px]">
                    <img className="lg:h-[700px] w-full" src={img4} alt="Banner 4" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4 bg-black bg-opacity-50">
                        <h2 className="text-4xl lg:text-6xl font-bold">Learn at Your Pace</h2>
                        <p className="mt-4 text-xl lg:text-2xl">Flexible learning options for everyone</p>
                    </div>
                </div>
                <div className="relative lg:h-[700px]">
                    <img className="lg:h-[700px] w-full" src={img1} alt="Banner 5" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4 bg-black bg-opacity-50">
                    <h2 className="text-4xl lg:text-6xl font-bold">Achieve Your Goals</h2>
                    <p className="mt-4 text-xl lg:text-2xl">Start your educational journey with us</p>
                    </div>
                </div>
                <div className="relative lg:h-[700px]">
                    <img className="lg:h-[700px] w-full" src={img2} alt="Banner 6" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4 bg-black bg-opacity-50">
                        <h2 className="text-4xl lg:text-6xl font-bold">Empower Your Learning</h2>
                        <p className="mt-4 text-xl lg:text-2xl">Join our community of learners and educators</p>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
