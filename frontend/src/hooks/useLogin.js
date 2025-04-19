import React, {useState} from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext.jsx'
import axiosInstance from '../lib/axios'

const useSignup = () => {
    const [loading, setloading] = useState(false)
    const {setAuthUser} = useAuthContext()
    const login = async ({email, password})=>{
        const isSuccess = handleErrorInput({email, password})
        if(!isSuccess) return
        setloading(true)
        try{
            const response = await axiosInstance.post("/auth/login", 
                    {email, password},
                    {withCredentials: true}).catch((err)=>{
                        toast.error(err.response.data.message)
                        setloading(false)
                    })
            const data = await response.data
            const message = data.message
           
                setAuthUser(data.metadata)
                localStorage.setItem("user", JSON.stringify(data.metadata))
                toast.success(message)
            
            setloading(false)
    }catch(err){
       // toast.error( "From catch" + err.message)
        
    }finally{
        setloading(false)
    }
    
}
return {loading, login}
}
const handleErrorInput = ({email, password})=>{
    if(!email || !password){
        toast.error("Missing email or password");
        return false
    }
    return true
}

export default useSignup