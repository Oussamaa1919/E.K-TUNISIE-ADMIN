import React, { useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom'
import { themeChange } from 'theme-change'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { logout } from './slices/authSlice';
import Layout from './containers/Layout'
import Login from'./pages/Login'
import ForgotPassword from'./pages/ForgotPassword'
import Register from'./pages/Register'
import { useSelector } from 'react-redux'
 


const App = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    // 👆 daisy UI themes initialization
    themeChange(false)
  }, [])


  return (
    <>
      <Router>
        <Routes>
        <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          
          
          {/* Place new routes over this */}
          <Route path="/app/*" element={<Layout />} />
          <Route path="*" element={<Navigate to={userInfo ? "/app/dashboard" : "/login"} replace />}/>

        </Routes>
      </Router>
    </>
  )
}

export default App
