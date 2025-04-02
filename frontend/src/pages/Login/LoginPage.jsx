import React, {useState} from 'react'
import { FaEyeSlash,FaEye  } from "react-icons/fa";
import {Link} from 'react-router-dom'
import useLogin from '../../hooks/useLogin'

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {loading,login} = useLogin();

    const handleLogin = async (e) =>{
      e.preventDefault();
      await login({email, password});
    }
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 to-white-400'>
        <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
            <div className='mx-1.5 mb-6'>
            <h2 className='text-3xl font-bold text-slate-700'>SIGN IN</h2>
            <p className='text-slate-400 font-semibold mb-3 text-sm '>Please enter your details</p>
            </div>
            <form action="" method="post" className='mx-1.5 w-full'  onSubmit={handleLogin}>
            {/* Email */}
            <div className='my-4'>
            <label className="floating-label">
                <input type="text" placeholder="Enter your email..." className="input input-md w-full" 
                onChange={(e) => setEmail(e.target.value)}
                />
                <span>Email</span>
            </label>
            </div>
          {/* Password with Eye Icon */}
          <div className='my-4 relative'>
            <label className="floating-label">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password..."
                className="input input-md w-full pr-10"
                onChange={e=>setPassword(e.target.value)}
              />
              <span>Password</span>
            </label>
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ?  <FaEye />  : <FaEyeSlash />}
            </span>
          </div>          
            <button className="btn btn-outline btn-primary w-full font-bold" disabled={loading}
            >{loading? <span className="loading loading-dots loading-md"></span>
              : <h1 className='text-lg'>Login</h1>}</button>
            </form>

            <div>
                <p className='text-slate-400 font-light text-sm mx-1.5 my-3'>Dont have an account yet? <Link to={'/signup'} className='text-blue-600 font-semibold'>Sign in</Link></p>
            </div>
        </div>
    </div>
  )
}

export default LoginPage







