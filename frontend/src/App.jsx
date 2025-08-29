import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './pages/Home'
import Cakes from './pages/Cakes'
import Footer from './pages/Footer'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import EditProduct from './pages/EditProduct'
import SingleProduct from './pages/SingleProduct'
import { useEffect } from 'react'
import { useUserStore } from './store/User'
import Bakers from './pages/Bakers'
import OnlyAdmins from './components/OnlyAdmins'
import OnlyAuthorized from './pages/OnlyAuthorized'
import BakerDetail from './pages/BakerDetail'
import OnlyUsers from './components/OnlyUsers'
import Cart from './pages/Cart'
import CakeDetails from './pages/CakeDetails'
import AddProduct from './pages/AddProduct/AddProduct.jsx'
import { Toaster } from "react-hot-toast";
import Favorite from './pages/Favorite/Favorite.jsx'
import Help from './pages/Help/Help.jsx'
import Contact from './pages/Contact/Contact.jsx'
import BakerOrders from './pages/Bakers/BakerOrders.jsx'
import MyOrders from './pages/MyOrders/MyOrders.jsx'
import Checkout from './pages/Checkout/Checkout.jsx'
import CakeConstructor from './pages/Contructor/Constructor.jsx'

function App() {
  useEffect(() => {
    const user = useUserStore.getState().user;
    const token = useUserStore.getState().token;
    console.log('App loaded: user', user, 'token', token);
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/cakes' element={
          // <OnlyUsers>
          <Cakes />
          // </OnlyUsers>
        } />
        <Route path='/cakes/:productId' element={<CakeDetails />} />
        <Route path='/bakers' element={
          // <OnlyUsers>
          <Bakers />
          // </OnlyUsers>
        } />
        <Route path='/bakers/:bakerId' element={
          // <OnlyUsers>
          <BakerDetail />
          // </OnlyUsers>
        } />
        <Route path='/cart' element={<Cart />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path='/help' element={<Help />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/my-orders' element={<MyOrders />} />
        <Route path='/baker-orders' element={<BakerOrders />} />
        <Route path='/constructor' element={<CakeConstructor />} />
         

        <Route
          path="/addproduct"
          element={
            <OnlyAdmins>
              <AddProduct />
            </OnlyAdmins>
          }
        />
        <Route
          path="/edit-product/:productId"
          element={
            <OnlyAdmins>
              <EditProduct />
            </OnlyAdmins>
          }
        />

        <Route path='/register' element={<Auth />} />
        <Route
          path="/profile"
          element={
            <OnlyAuthorized>
              <Profile />
            </OnlyAuthorized>
          }
        />
        <Route path='/cakes/:productId' element={<CakeDetails />} />
      </Routes>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}

export default App
