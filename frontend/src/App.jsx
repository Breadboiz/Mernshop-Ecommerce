import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes} from 'react-router-dom';
import RegisterPage from './pages/Register/RegisterPage';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Homepage/HomePage';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=''>
      <Routes>
            <Route path="/" element={< HomePage/>}></Route>
            <Route  path="/signup" element={<RegisterPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
          </Routes>
    </div>
  )
}

export default App
