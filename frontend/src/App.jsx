import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes, Navigate} from 'react-router-dom';
import RegisterPage from './pages/Register/RegisterPage';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Homepage/HomePage';
import { useAuthContext } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import ShopPage from './pages/ShopPage/ShopPage';
function App() {
  const {authUser} = useAuthContext()
  return (
    <div className=''>
      <Routes>
            <Route path="/"  element={<Navigate to="/home"/>}></Route>
            <Route path="/home" element={< HomePage/>}></Route>
            <Route  path="/signup" element={ authUser ? <Navigate to="/" /> : <RegisterPage />}></Route>
            <Route path="/login" element={authUser ? <Navigate to="/" /> : <LoginPage />}></Route>
            <Route path="/shop" element={<ShopPage />}></Route>
          </Routes>
      <Toaster/>    
    </div>
  )
}

export default App
