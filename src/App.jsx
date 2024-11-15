import { useEffect, useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import Home from './pages/home/Home'
import Order from './pages/order/Order'
import Cart from './pages/cart/Cart'
import Dashboard from './pages/admin/Dashboard'
import NoPage from './pages/nopage/NoPage'
import MyState from './context/MyState'
import Login from './pages/registration/Login'
import Signup from './pages/registration/Signup'
import ProductInfo from './pages/productInfo/ProductInfo'
import AddProduct from './pages/admin/page/AddProduct'
import UpdateProduct from './pages/admin/page/UpdateProduct'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllProducts from './pages/allproducts/AllProducts'






function App() {
  const [count, setCount] = useState(0)

  return (
    <MyState>
      <Router>
        <Routes>
          <Route path='/' element={ <Home/>} />
          <Route path='/order' element={ 
            <ProtectedRouteUser>
              <Order/>
            </ProtectedRouteUser>
          } />
          <Route path='/cart' element={ <Cart/>} />
          <Route path='/dashboard' element={ 
            <ProtectedRouteAdmin>
              <Dashboard/>
            </ProtectedRouteAdmin>
          } />
          <Route path='/login' element={ <Login/>} />
          <Route path='/signup' element={ <Signup/>} />
          <Route path='/productInfo/:id' element={ <ProductInfo/>} />
          <Route path='/addProduct' element={ 
            <ProtectedRouteAdmin>
              <AddProduct/>
            </ProtectedRouteAdmin>
          } />
          <Route path='/updateProduct' element={ 
            <ProtectedRouteAdmin>
              <UpdateProduct/>
            </ProtectedRouteAdmin>
          } />
          <Route path='/allproducts' element={ 
            <ProtectedRouteAdmin>
              <AllProducts/>
            </ProtectedRouteAdmin>
          } />
          <Route path='/*' element={ <NoPage/>} />
        </Routes>
        <ToastContainer/>
      </Router>
    </MyState>
  )
}

export default App


// user
export const ProtectedRouteUser = ({ children }) => {
  const user = localStorage.getItem("user");

  if(user){
    return children;
  }
  else{
    return <Navigate to={'/login'} />
  }
}

// admin
export const ProtectedRouteAdmin = ({ children })=>{
  const admin = JSON.parse(localStorage.getItem("user"));

  if( admin?.user?.email === 'abhishek@gmail.com' || admin?.email === 'abhishek@gmail.com'){
    return children;
  }
  else{
    return <Navigate to={'/login'} />
  }
}