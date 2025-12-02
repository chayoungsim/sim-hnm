import {Routes, Route} from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import ProductAll from './pages/ProductAll';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import {useNavigate} from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute';

function App() {

  const navigate = useNavigate();
  const [authenticate, setAuthenticate] = useState(false)

  useEffect(() => {    
    navigate('/')

  },[authenticate])

  return (
    <>
      <Navbar authenticate={authenticate} setAuthenticate={setAuthenticate} />
      <Routes>
         <Route path="/" element={<ProductAll />} />
         <Route path="/login" element={<Login setAuthenticate={setAuthenticate}/>} />
         <Route path="/product/:id" element={<PrivateRoute authenticate={authenticate} />} />         
      </Routes>
    </>
  )
}

export default App
