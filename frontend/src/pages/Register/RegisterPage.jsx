import React, {useState} from 'react'
import { FaEyeSlash,FaEye  } from "react-icons/fa";

import {Link} from 'react-router-dom'
const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 to-white-400'>
        <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
            <div className='mx-1.5 mb-6'>
            <h2 className='text-3xl font-bold text-slate-700'>SIGN UP</h2>
            <p className='text-slate-400 font-semibold mb-3 text-sm'>Please enter your details</p>
            </div>
            <form action="" method="post" className='mx-1.5 w-full' >
            {/* Email */}
            <div className='my-4'>
            <label className="floating-label">
                <input type="text" placeholder="Enter your email..." className="input input-md w-full" />
                <span>Email</span>
            </label>
            </div>
            {/* Username */}
            <div className='my-4'>
            <label className="floating-label">
                <input type="text" placeholder="Enter your username..." className="input input-md w-full" />
                <span>username</span>
            </label>
            </div>

              {/* Password with Eye Icon */}
          <div className='my-4 relative'>
            <label className="floating-label">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password..."
                className="input input-md w-full pr-10"
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

          {/* Confirm Password with Eye Icon */}
          <div className='mt-4 mb-7 relative'>
            <label className="floating-label">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password..."
                className="input input-md w-full pr-10"
              />
              <span>Confirm Password</span>
            </label>
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ?  <FaEye />  : <FaEyeSlash />}
            </span>
          </div>
            <button className="btn btn-outline btn-primary w-full font-bold">SIGN UP</button>
            </form>

            <div>
                <p className='text-slate-400 font-light text-sm mx-1.5 my-3'>Already have an account? <Link to={'/login'} className='text-blue-600 font-semibold'>Sign in</Link></p>
            </div>
        </div>
    </div>
  )
}

export default RegisterPage







/*
        <form className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Đăng Ký</h2>

        <label className="block text-gray-700 mb-1">Email</label>
        <input type="email" className="w-full p-2 border border-gray-300 rounded mb-3" />

        <label className="block text-gray-700 mb-1">Username</label>
        <input type="text" className="w-full p-2 border border-gray-300 rounded mb-3" />

        <label className="block text-gray-700 mb-1">Mật khẩu</label>
        <input type="password" className="w-full p-2 border border-gray-300 rounded mb-3" />

        <label className="block text-gray-700 mb-1">Xác nhận mật khẩu</label>
        <input type="password" className="w-full p-2 border border-gray-300 rounded mb-4" />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Đăng Ký
        </button>
      </form>
*/