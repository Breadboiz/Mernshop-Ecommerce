import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Outlet } from 'react-router-dom'
import AccountDetails from '../../components/AccountDetails/AccountDetails'
import UserOrder from '../../components/UserOrder/UserOrder'

const UserDashBoard = () => {
 
  return (
    <div className='flex flex-col flex-grow w-full  min-h-screen absolute scroll-smooth'>
        <Navbar />
        <div className='flex flex-col  w-full h-full  px-[2rem] sm:px-[16rem] py-6 gap-y-5'>
        <div className=' w-full  h-full'>
                <AccountDetails/>
            </div>
            <div className=' w-full h-full'>
                <UserOrder/>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default UserDashBoard