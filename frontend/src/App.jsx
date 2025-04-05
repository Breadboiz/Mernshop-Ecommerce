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
import NoPage from './pages/404Page/404Page';
import AdminPage from './pages/AdminPage/AdminPage';
import UpdateProductForm from './components/UpdateProductForm/UpdateProductForm';
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
            <Route path="/admin-panel" element={authUser && authUser.role === 'AD' ? <AdminPage/>: <Navigate to="*" />}></Route>
            {/* route con ? */}
            {/* <Route path="update/:id" element={<AdminPage />} /> */}
            <Route path="*" element={<NoPage/>}></Route>
          </Routes>
      <Toaster/>    
    </div>
  )
}

export default App
