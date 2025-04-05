import React, {useState} from 'react'
import toast from 'react-hot-toast'
import axiosInstance from '../lib/axios'

const useDeleteProduct = () => {
    const [loading, setloading] = useState(false)
    const deleteProduct = async (id,cb)=>{
        
        setloading(true)
        try{ const user = JSON.parse(localStorage.getItem("user"));
            const clientId = user._id;
            const response = await axiosInstance.delete(`products/deleteProduct/${id}`,
                {
                headers: {"x-client-id": clientId}
                }
                    ).then(data=>{
                        toast.success(data.data.message)
                        cb()
                    }).catch((err)=>{
                        toast.error(err.response.data.message)
                        setloading(false)
                    })
            const data = await response.data
            console.log(data)
            const message = data.message
           
            toast.success(message)
            
            setloading(false)
    }catch(err){
    //    toast.error( "From catch" + err.message)
        
    }finally{
        setloading(false)
    }
    
}
return {loading, deleteProduct}
}
export default useDeleteProduct