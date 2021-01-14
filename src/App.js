import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Cookies from 'js-cookie'
import './App.css'
import axios from 'axios'

import UserApi from './context/UserApi'
import CartApi from './context/CartApi'
import AuthApi from './context/AuthApi'
import ProductsApi from './context/ProductsApi'

import Navbar from './components/Home/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Routes from './components/Routes/Routes'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import { SERVER_URL } from './config/config'

const App = () => {

  const [user, setUser] = useState({})
  const [cart, setCart] = useState([])

  const [auth, setAuth] = useState(false)
  const [products, setProducts] = useState([])

  const headers = { Authorization: `Bearer ${Cookies.get('x_auth')}`}

  useEffect(() => {
    async function initializeContext() { 
      const products = await axios.get(`${SERVER_URL}/api/items`).then(response => response.data)
      setProducts(products.reverse()) //set ProductsApi
      readCookie() //set AuthApi
      const user = await axios.get(`${SERVER_URL}/api/users/me`, { headers })
                      .then(response => response.data)
      setUser(user) //set UserApi
    }
    initializeContext()
  }, []) 

  useEffect(() => {
    if(Object.keys(user).length !== 0 && user.constructor === Object) {
      async function getCart() {
        const cart = await axios.get(`${SERVER_URL}/api/cart/getusercart/${user._id}`, { headers })
                            .then(response => response.data)
        setCart(cart)
      }
      getCart()
    }
  }, [user])

  const readCookie = () => {
    const user = Cookies.get('x_auth')
    if(user){
      setAuth(true)
    }
  }


  return (
    <ProductsApi.Provider value={{ products, setProducts }}>
        <AuthApi.Provider value={{ auth, setAuth }}>
          <UserApi.Provider value={{ user, setUser }}>
            <CartApi.Provider value ={{ cart, setCart }}>
              <Router>
                <ScrollToTop />
                <div className="pages-content">
                  <Navbar />
                  <Routes />
                </div>
                <Footer />
              </Router>
            </CartApi.Provider>
          </UserApi.Provider>
        </AuthApi.Provider>
    </ProductsApi.Provider>
  );
}

export default App;