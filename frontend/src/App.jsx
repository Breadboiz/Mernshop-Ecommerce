
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
import UsersmanagementTab from './components/UsersmanagementTab/UsersmanagementTab';
import OrderManagementTab from './components/OrderManagementTab/OrderManagementTab';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import UserDashBoard from './pages/UserDashBoard/UserDashBoard';
import OrderDetails from './pages/OrderDetails/OrderDetails';
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
            <Route path="/admin-dashboard" element={<AdminPage />}>
                <Route index element={<Navigate to="products" replace />} />


                <Route path="create" element={ authUser ?  <CreateProductForm />: <Navigate to="/" /> } /> 
                <Route path="products" element={ authUser ? <ManagementTab /> : <Navigate to="/" />} />
                <Route path="analytics" element={ authUser ? <AnalyticsTab /> : <Navigate to="/" /> } />
                <Route path="update/:id" element={authUser ? <UpdateProductForm /> : <Navigate to="/" />} />
                <Route path="users" element={authUser ?<UsersmanagementTab /> : <Navigate to="/" />} />
                <Route path="orders" element={authUser ? <OrderManagementTab /> : <Navigate to="/" />} />
              </Route>
            <Route path="/cart/:id"  element={ authUser ?  <CartPage />: <Navigate to="/" /> }></Route>
            <Route path='/checkout/:cartID' element={ authUser ?  <CheckoutPage/>: <Navigate to="/" />}></Route>
            <Route path="/dashboard"   element={authUser? <UserDashBoard/>: <Navigate to="/" />}></Route>
            <Route path='/order-details/:orderID' element={authUser?<OrderDetails/>: <Navigate to={"/"}/>}></Route>
            <Route path="*" element={<NoPage/>}></Route>
          </Routes>
      <Toaster/>    
    </div>
  )
}

export default App
