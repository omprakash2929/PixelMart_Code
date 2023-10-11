import {Route,Routes} from 'react-router-dom'
import { HomePage } from './pages/HomePage';
// import Layout from './components/Layout/Layout';
import './App.css'
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import { Register } from './pages/Auth/Register';
import { Login } from './pages/Auth/Login';
import {  Dashbaord } from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/PrivateRoute';
import { Forgot } from './pages/Auth/Forgot';
import AdminRoutes from './components/Routes/AdminRoutes';
import { AdminDashbaord } from './pages/Admin/AdminDashbaord';
import CreateProducts from './pages/Admin/CreateProducts';
import CreateCategory from './pages/Admin/CreateCategory';
import Users from './pages/Admin/Users';
import { Orders } from './pages/user/Orders';
import Profiles from './pages/user/Profiles';
import { Products } from './pages/Admin/Products';
import { UpdateProducts } from './pages/Admin/UpdateProducts';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Category/Categories';
import CategoryProduct from './pages/Category/CategoryProduct';
import CartPage from './pages/cart/CartPage';
import { AdminOrders } from './pages/Admin/AdminOrders';
import Setting from './pages/user/Setting';
import { OrderDashbaord } from './pages/Admin/OrderDashbaord';

function App() {
  

  return (
    <>
    
     <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/search' element={<Search/>} />
      <Route path='/product/:slug' element={<ProductDetails />} />
      <Route path='/category' element={<Categories />} />
      <Route path='/category/:slug' element={<CategoryProduct />} />
      <Route path='/cart' element={<CartPage />} />
      {/* Usere Dasbord Routes  */}
      <Route path='/dashboard' element={<PrivateRoute/>}>
      <Route path='user' element={<Dashbaord/>} />
      <Route path='user/orders' element={<Orders/>} />
      <Route path='user/profile' element={<Profiles/>} />
      <Route path='user/setting' element={<Setting/>} />
      </Route>
      {/* Admin Routes  */}
      <Route path='/dashboard' element={<AdminRoutes/>}>
        <Route path='admin' element={<AdminDashbaord/>}/>
        <Route path='admin/create-products' element={<CreateProducts/>}/>
        <Route path='admin/products' element={<Products/>}/>
        <Route path='admin/product/:slug' element={<UpdateProducts/>}/>
        <Route path='admin/create-category' element={<CreateCategory/>}/>
        <Route path='admin/users' element={<Users/>}/>
        <Route path='admin/orders' element={<AdminOrders/>}/>
        <Route path='admin/analytics' element={<OrderDashbaord/>}/>
      </Route>
      <Route path='/contact' element={<Contact/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/policy' element={<Policy/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/forgot-password' element={<Forgot/>} />
      <Route path='/*' element={<PageNotFound/>} />
     </Routes>
    </>
  )
}

export default App
