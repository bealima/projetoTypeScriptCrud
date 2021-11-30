import React, { createContext, useEffect, useState } from "react";
import api from "../api";
import {useNavigate} from 'react-router-dom';
import { LoginDTO } from "../model/LoginDTO";

const AuthContext = createContext({});

const AuthProvider: React.FC<any> = ({children}) =>{
  
  const[auth, setAuth] = useState(false)
  const navigate = useNavigate();
  const[loading, setLoading] = useState(true)
  
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = token;
      setAuth(true)
    }
    setLoading(false)
  },[])


  const handleLogin = async(user: LoginDTO) => {
    const {data} = await api.post('/auth', user);
    localStorage.setItem('token', data )
    api.defaults.headers.common['Authorization'] = data;
    window.location.href = '/pessoa'
    setAuth(true)
    
  } 


  const handleLogout= async() =>  {
    localStorage.removeItem('token');
    api.defaults.headers.common['Authorization']= '';
    window.location.href = '/login'
    setAuth(false)

  } 
  

  if(loading){
   return(<h1>Loading...</h1>)
  }
  return(
    <AuthContext.Provider value={{auth, setAuth, handleLogin, handleLogout}}>
      {children}
    </AuthContext.Provider>
  );
}

export {AuthContext, AuthProvider};