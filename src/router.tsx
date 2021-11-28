import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import { AuthProvider } from './context/AuthContext';
import {PessoaProvider} from './context/IPessoaContext'


import Home from './pages/Home';
import Login from './pages/Login'
import Pessoa from './pages/Pessoa'

const Routers = () =>{
  return(
    <BrowserRouter>
    <AuthProvider>
    <PessoaProvider>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/pessoa' element={<Pessoa/>}/>
        </Routes>
        <Footer/>
      </PessoaProvider>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default Routers;