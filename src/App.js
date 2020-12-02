import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Cookies from 'js-cookie'
import './App.css'

import AuthApi from './context/AuthApi'
import Navbar from './components/Home/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Routes from './components/Routes/Routes'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

import './firebase/firebase'

const App = () => {

  const [auth, setAuth] = useState(false)

  const readCookie = () => {
    const user = Cookies.get('x_auth')
    if(user){
      setAuth(true)
    }
  }

  useEffect(() => {
    readCookie()
  }, [])

  return (
    <AuthApi.Provider value={{ auth, setAuth }}>
      <Router>
        <ScrollToTop />
        <div className="pages-content">
          <Navbar />
          <Routes />
        </div>
        <Footer />
      </Router>
    </AuthApi.Provider>
  );
}

export default App;
