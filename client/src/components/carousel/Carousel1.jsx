import axios from "axios";
import React, { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { server } from "../../server";

const Carousel1 = () => {
    const [banners, setBanners] = useState([]);
    const [slide, setSlide] = useState(0);

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const response = await axios.get(`${server}banner/get-all-banner`);
            setBanners(response.data);
        } catch (error) {
            console.error("Error fetching banners:", error);
        }
    };

    const prevSlide = () => {
        setSlide(prevSlide => (prevSlide === 0 ? banners.length - 1 : prevSlide - 1));
    };

    const nextSlide = () => {
        setSlide(prevSlide => (prevSlide === banners.length - 1 ? 0 : prevSlide + 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 2500);
        return () => clearInterval(interval);
    }, [slide, banners]);

    const newData = banners.length > 0 ? banners[slide].bannerImage : '';

    return (
        <div className='relative overflow-hidden w-full h-[700px] mt-3 md:mt-0'>
            <div className='flex transition-transform duration-500'>
                <img src={newData} alt="Banner" className="w-full h-full object-cover transform" style={{ transition: 'transform 0.5s ease' }} />
            </div>
            {banners.length > 0 && (
                <>
                    <div className='absolute top-1/2 left-5 transform -translate-y-1/2 bg-black bg-opacity-20 rounded-full p-2 cursor-pointer transition duration-300 hover:bg-opacity-50' onClick={prevSlide}>
                        <BsChevronCompactLeft size={30} className='text-white' />
                    </div>
                    <div className='absolute top-1/2 right-5 transform -translate-y-1/2 bg-black bg-opacity-20 rounded-full p-2 cursor-pointer transition duration-300 hover:bg-opacity-50' onClick={nextSlide}>
                        <BsChevronCompactRight size={30} className='text-white' />
                    </div>
                </>
            )}
        </div>
    );
};

export default Carousel1;
