import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Footer from './pages/Footer'
import Admin from './pages/Admin'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import { useEffect } from 'react'
import { useUserStore } from './store/User'
import Bakers from './pages/Bakers'

function App() {
  useEffect(() => {
    const user = useUserStore.getState().user;
    const token = useUserStore.getState().token;
    console.log('App loaded: user', user, 'token', token);
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/register' element={<Auth />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/bakers' element={<Bakers />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
