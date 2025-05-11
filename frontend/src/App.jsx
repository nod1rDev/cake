import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Footer from './pages/Footer'
import Admin from './pages/Admin'
import Auth from './pages/Auth'
import Profile from './pages/Profile'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/register' element={<Auth />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
