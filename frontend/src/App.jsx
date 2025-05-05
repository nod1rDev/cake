import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Footer from './pages/Footer'
import Admin from './pages/Admin'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
