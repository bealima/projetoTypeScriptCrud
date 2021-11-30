import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import { AuthProvider } from './context/AuthContext';
import {PessoaProvider} from './context/IPessoaContext'


import Home from './pages/home/Home';
import Login from './pages/login/Login'
import Pessoa from './pages/pessoa/Pessoa'
import NotFound from './pages/notFound/NotFound'
import Endereco from './pages/endereco/Endereco'

const Routers = () =>{
  const[isLogin, setIsLogin]= useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setIsLogin(true)
    
    }
  },[])
  return(
    <BrowserRouter>
    <AuthProvider>
    <PessoaProvider>
        <Header/>
        {isLogin ? (
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/pessoa' element={<Pessoa/>}/>
          <Route path='/endereco' element={<Endereco/>}/>
          <Route path='/*' element={<NotFound/>}/>
        </Routes>
        ): (
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/*' element={<NotFound/>}/>
        </Routes>
        )}
        <Footer/>
      </PessoaProvider>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default Routers;