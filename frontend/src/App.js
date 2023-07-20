import './App.css';
import './Components/Style/font.css'
import { Route, Routes } from 'react-router-dom';
import Home from './Components/home';
import Login from './Components/Login';
import Register from './Components/register';
import { Public, Private } from './Authentication/Auth';
import Product from './Components/productDetails';
import Navbar from './Components/nav';
import SideBar from './Components/sidebar';
import EditProfile from './Components/EditProfile';
import MyProduct from './Components/myProduct';
import Cart from './Components/cart';
import Sell from './Components/sell';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<Public />} >
        <Route index element={<Login />} />
        <Route path='signUp' element={<Register />} />
      </Route>

      {/* Private routes */}
    
      <Route element={<Private />}>
        <Route element={<Navbar />} >
          <Route element={<SideBar />}>
            <Route path='home' element={<Home />} />
            <Route path='product/:id' element={<Product />} />
            <Route path='editProfile' element={<EditProfile />} />
            <Route path='myProduct' element={<MyProduct />} />
            <Route path='addProduct' element={<Sell />} />
            <Route path='mycart' element={<Cart />} />
            <Route path='test' element={<Sell />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
