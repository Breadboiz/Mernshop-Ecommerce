
import './App.css'
import {Route, Routes, Navigate} from 'react-router-dom';
import RegisterPage from './pages/Register/RegisterPage';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Homepage/HomePage';
import { useAuthContext } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import ShopPage from './pages/ShopPage/ShopPage';
import NoPage from './pages/404Page/404Page';
import AdminPage from './pages/AdminPage/AdminPage';
import UpdateProductForm from './components/UpdateProductForm/UpdateProductForm';
import ProductDetailsPage from './pages/Product-details/ProductDetailsPage';
import CreateProductForm from './components/CreateProductForm/CreateProductForm';
import ManagementTab from './components/ManageProductTab/ManagementTab';
import AnalyticsTab from './components/AnalyticsTab/AnalyticsTab';
import CartPage from './pages/CartPage/CartPage';
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
            <Route path="/shop/:slug" element={<ProductDetailsPage />}></Route>
            <Route path="/admin-panel" element={<AdminPage />}>
                <Route path="create" element={<CreateProductForm />} />
                <Route path="products" element={<ManagementTab />} />
                <Route path="analytics" element={<AnalyticsTab />} />
                <Route path="update/:id" element={<UpdateProductForm />} />
              </Route>
              <Route path="/cart/:id"  element={ authUser ?  <CartPage />: <Navigate to="/" /> }></Route>
            <Route path="*" element={<NoPage/>}></Route>
          </Routes>
      <Toaster/>    
    </div>
  )
}

export default App
