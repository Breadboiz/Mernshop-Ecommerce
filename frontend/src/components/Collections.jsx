import React from 'react'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'
import { Key } from 'lucide-react'
const Collections = () => { 
  const collections = [
   { url:"/shop?product_category=nữ",
    type:"Nữ",
     image: "../src/assets/women_watches.jpg"
   },
   { url:"/shop?product_category=nam",
    type:"Nam",
    image: "../src/assets/men_watches.jpg"
  },
  { url:"/shop?product_category=đôi",
    type:"Đôi",
    image: "../src/assets/women_watches.jpg"
  }
  ]  
  return (
    
   <div className='flex flex-col md:flex-row w-full h-[25%] px-[2rem] lg:px-[10rem] gap-5 py-30 bg-slate-100'>
        {
                 collections.map((collection, index) => (
                    
                    <Link to={collection.url} key={index} className='flex flex-col w-full md:w-[24em] md:h-[29rem] relative'>
                          <motion.img 
                          initial={{ opacity: 0  }}
                          animate={{ opacity: 1 }}
                          whileHover={{ scale: 1.02 }} // Phóng to khi hover
                          whileTap={{ scale: 0.95 }} // Giảm nhẹ khi click
                          transition={{ type: "spring", stiffness: 300 }}
                          src={collection.image} className='w-full h-full object-cover' alt="" />
                          <motion.div
                          initial={{ opacity: 0, y: 100 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className='absolute bottom-10 left-10  flex flex-col'>
                            <p className='font-light text-xl text-white'>Đồng hồ</p>
                          <h1 className='font-semi text-4xl text-white'>{collection.type}</h1>
                          </motion.div>
                       </Link>
                 ))
        }
       </div>
  )
}

export default Collections