import { FilePenLine, Trash2 } from 'lucide-react'
import React, { useEffect } from 'react'
import useDeleteProduct from '../../hooks/useDeleteProduct'
import { useNavigate } from 'react-router-dom';



const ProductItem = ({index, product, cb}) => {
  const navigate = useNavigate();
    const {loading, deleteProduct} = useDeleteProduct()
  return (
    <li className='flex w-full h-[7rem] items-center px-2 sm:px-10 justify-between border-b border-gray-200'>
        <div className='flex items-center h-full '>
        <div className="text-4xl font-thin opacity-30 tabular-nums ">{index}</div>
        <div className='w-[10rem]' onClick={() => navigate(`/shop/${product.slug}`)}
        ><img className="size-20 rounded-box cursor-pointer" src={product.product_thumbnail.url} alt=""  /></div>
        <div className="list-col-grow gap-5">
            <div>{product.product_name}</div>
            <div className="text-xs uppercase font-semibold opacity-60 ">{product.product_category}</div>
            <div>Mã sản phẩm: {product._id}</div>
        </div>
        </div>
           <div className='flex items-center'>
           {/* <button className="btn btn-square btn-ghost"  onClick={() => navigate(`update/${product._id}`)}> */}
           <button className="btn btn-square btn-ghost" >
           <FilePenLine className='hover:text-amber-500' onClick={() => navigate(`/admin-panel/update/${product._id}`)}/>
            </button>

             <button className="btn btn-square btn-ghost" onClick={() => deleteProduct(product._id, cb)}>
                {loading ? <span className="loading loading-dots loading-md"></span>:<Trash2 className='hover:text-amber-500'/>}
            </button>
            </div>

    </li>
  )
}

export default ProductItem