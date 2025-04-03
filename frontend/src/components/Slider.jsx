import React from 'react'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { FaTruck } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";

const images = [
    'https://images.unsplash.com/photo-1512034705137-dc51c5ed36f4?q=80&w=2061&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1663394771162-fa1d42dd3480?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1667284152842-f240b6634655?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1658381466817-3592f4be8c0a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
]
const Slider = () => {
    const indexRef = useRef(0);
    const [currentImage, setCurrentImage] = React.useState(images[indexRef.current]);
    useEffect(() => {
        const interval = setInterval(() => {
            indexRef.current = (indexRef.current + 1) % images.length;
            setCurrentImage(images[indexRef.current]); // Update state without re-rendering the effect
        }, 3000);
        return () => clearInterval(interval);
    }, [])
  return (
   <div className='flex flex-col  w-full h-auto pb-10 border-b border-gray-200'>
     <div className='w-full h-[60%] bg-sky-200 relative my-6 mb-10 -z-10'>
        <motion.img src={currentImage} alt=""  
        key={currentImage}
         className='w-full h-full md:h-[600px] object-cover'
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 1 , ease: 'easeOut' }}
        />
        {/* <div className='absolute bottom-0 right-0 hidden md:flex w-[32%] h-full 
        bg-white/25 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]  border-none
        flex flex-col items-start justify-evenly p-5 '>

    <h1 className='text-2xl text-slate-700 font-bold'>Timeless elegance, perfection precision</h1>

    <div className='text-slate-700'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quidem perferendis amet officia id! Eveniet rem, sed officia doloribus molestias reiciendis incidunt illo corrupti. Maxime quis fugiat veritatis delectus quod.
    </div>

    <button>
        <Link to='/shop' className='bg-indigo-500 text-white px-4 py-2 rounded-md'>
            SHOP NOW
        </Link>
    </button>
    </div> */}
    </div>
    <div className='flex flex-col md:flex-row w-full h-[25%] px-[2rem] lg:px-[10rem] gap-5 '>
        <div className='flex   '>
            <FaTruck className='w-30 h-30 text-blue-500 mr-5' />
            <div className='flex flex-col'>
                <h1 className='text-blue-500 text-2xl font-light'>Free Shipping</h1>
                <p className='text-slate-500 font-light '>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla. ?</p>
            </div>
        </div>
        <div className='flex  '>
            <IoReload className='w-30 h-30 text-blue-500 mr-5'/>
            <div className='flex flex-col'>
                <h1 className='text-blue-500 text-2xl font-light'>Free Return</h1>
                <p className='text-slate-500 font-light'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla. ?</p>
            </div>
        </div>
        <div className='flex '>
            <MdSupportAgent className='w-30 h-30 text-blue-500 mr-5'/>
            <div className='flex flex-col'>
                <h1 className='text-blue-500 text-2xl font-light'>
                Customer Support</h1>
                <p className='text-slate-500 font-light '>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla. ?</p>
            </div>
        </div>
    </div>
   </div>
  )}

export default Slider



{/* <div className='absolute bottom-18 right-60 hidden md:flex w-[32%] h-[48%]
        
bg-white/25 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[0.5px]  border border-white/18 

flex flex-col items-start justify-evenly p-5 rounded-2xl'>

    <h1 className='text-2xl text-white font-bold'>Slogan goes here</h1>
   <div className='text-white'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quidem perferendis amet officia id! Eveniet rem, sed officia doloribus molestias reiciendis incidunt illo corrupti. Maxime quis fugiat veritatis delectus quod.</div>
    <button><Link to='/shop' className ='bg-indigo-500 text- px-4 py-2 rounded-md'>SHOP NOW</Link></button>
</div> */}