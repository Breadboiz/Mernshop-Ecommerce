import React, {useState} from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext.jsx'
import axiosInstance from '../lib/axios'

const useSignup = () => {
    const [loading, setloading] = useState(false)
    const {setAuthUser} = useAuthContext()
    const signup = async ({username, email, password, confirmPassword})=>{
        const isSuccess = handleErrorInput({username, email, password, confirmPassword})
        if(!isSuccess) return
        setloading(true)
        try{
            const response = await axiosInstance.post("/auth/register", 
                    {username, email, password, confirmPassword},
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
return {loading, signup}
}
const handleErrorInput = ({username, email, password, confirmPassword})=>{
    if(password !== confirmPassword){
        toast.error("Passwords do not match");
        return false
    }
    if(!email || !password || !confirmPassword || !username){
        toast.error("Missing credentials");
        return false
    }
    return true
}

export default useSignup