import React, { useEffect, useRef, useState } from 'react'
import { TiTickOutline } from "react-icons/ti";
import {Check} from "lucide-react"
import SpecificationTab from '../DetailsTab/SpecificationTab';
const DetailsPanel = ({product}) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const timeRef = useRef(null);
    const images = Array.isArray(product?.product_images) ? product.product_images : [];
    console.log("product", images.length);
   
    useEffect(() => {
        // Tự động chuyển ảnh
        timeRef.current = setInterval(() => {
          setSelectedImage((prev) => (prev + 1) % images.length);
        }, 5000);
    
        return () => clearInterval(timeRef.current);
      }, [images.length, 5000]);
    
    const handleDecrease = () => {
      const newVal = Math.max(0, quantity - 1);
      setQuantity(newVal);
      onChange?.(newVal);
    };
  
    const handleIncrease = () => {
      const newVal = quantity + 1;
      setQuantity(newVal);
      onChange?.(newVal);
    };
  
    const handleChange = (e) => {
      const val = Math.max(0, parseInt(e.target.value) || 0);
      setQuantity(val);
      onChange?.(val);
    };
  return (
    <div className='flex flex-col lg:flex-row gap-10 px-6 lg:px-[15rem] my-10   '>
                    <div className='w-full lg:w-[60%] py-5  '>
                    <div className="w-full h-[300px] sm:h-[640px] lg:w-[80%] flex flex-col-reverse sm:flex-row overflow-hidden rounded-xl   ">
                       {/* Danh sách thumbnail */}
                       <div className="flex flex-row sm:flex-col sm:h-[640px]  sm:overflow-y-auto overflow-x-auto w-full sm:w-[20%] gap-2   p-2">
                            {images.map((img, index) => (
                            <img
                                key={index}
                                src={img.url}
                                onClick={() => setSelectedImage(index)}
                                className={`w-20 h-20 object-cover rounded-md  cursor-pointer border-2 ${
                                selectedImage === index
                                    ? "border-blue-500 scale-105"
                                    : "border-transparent"
                                } transition-all duration-200 `}
                                alt={`Thumbnail ${index}`}
                            />
                            ))}
                        </div>
                     {/* Ảnh lớn */}
                     
                        <div className="  w-[80%] h-[300px] sm:h-[560px] relative overflow-hidden mx-auto flex items-center justify-between">
                            <img
                            src={images[selectedImage]?.url}
                            alt={`Selected ${selectedImage}`}
                            className="max-w-full h-full object-cover"
                            />
                        </div>
                       
                    </div>
            </div>


            <div className='flex flex-col gap-4 w-full lg:w-[40%] py-5  '>
                <div className='text-2xl font-bold '>{product?.product_name}</div>
                <div className='flex items-center justify-between'>
            
                    <div className="rating rating-lg rating-half">
                        <input type="radio" name="rating-11" className="rating-hidden" />
                        <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-amber-500" aria-label="0.5 star" />
                        <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-amber-500" aria-label="1 star" />
                        <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-amber-500" aria-label="1.5 star" defaultChecked />
                        <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-amber-500" aria-label="2 star" />
                        <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-amber-500" aria-label="2.5 star" />
                        <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-amber-500" aria-label="3 star" />
                        <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-amber-500" aria-label="3.5 star" />
                        <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-amber-500" aria-label="4 star" />
                        <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-amber-500" aria-label="4.5 star" />
                        <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-amber-500" aria-label="5 star" />
                        </div>
                
                <div className='text-sm font-semibold text-gray-500'>5 reviews</div>
                </div>
                <div className='flex items-center justify-between'>
                <div className='line-through'>{ product?.product_price.toLocaleString('vi')} VND</div> 
                <div className=''>{ product?.product_price.toLocaleString('vi')} VND</div> 
                </div>
               
               {product?.product_inStock > 0 &&   <span className='flex text-sm font-thin text-green-500  px-2 py-2 rounded-xl w-fit'><Check className='mr-2 pb-1'/>Còn hàng</span>}
                
                {/* number */}
               <div className='flex items-center gap-5'>
               <div className="flex items-center border border-gray-300 rounded-3xl w-fit"> 
                <button
                    type="button"
                    onClick={handleDecrease}
                    className=" py-1 px-2 text-lg font-semibold rounded pl-2">
                    −
                </button>
                <input
                    
                    type="number"
                    value={quantity}
                    min="0"
                    onChange={handleChange}
                    className="w-12 text-center border border-gray-300 rounded py-1 border-none focus:outline-none focus:border-none"/>
                    
                <button
                    type="button"
                    onClick={handleIncrease}
                    className=" py-1 px-2 text-lg font-semibold rounded ">
                    +
                </button>
                </div>
                {/* CArt */}
               <button className='px-5 py-2 bg-black text-white  rounded-3xl'>Add to cart</button>
               </div>
               <SpecificationTab product={product}/>
                    </div>
                    
                </div>
            )
}

export default DetailsPanel





