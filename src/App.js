import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Cookies from 'js-cookie'
import './App.css'
import axios from 'axios'

import AuthApi from './context/AuthApi'
import UserApi from './context/UserApi'
import ProductsApi from './context/ProductsApi'
import CartApi from './context/CartApi'

import Navbar from './components/Home/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Routes from './components/Routes/Routes'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

import './firebase/firebase'

const App = (props) => {

  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState({})
  const [cart, setCart] = useState([])
  const [products, setProducts] = useState([])

  const headers = { Authorization: `Bearer ${Cookies.get('x_auth')}`}

  useEffect(() => {
    async function initializeContext() {
      const products = await getProducts() //to set ProductsApi
      setProducts(products)
      readCookie() //to set the AuthApi
      const user = await getUser() //to set the UserApi
      setUser(user)
    }
    initializeContext()
  }, [])

  useEffect(() => {
    if(Object.keys(user).length !== 0 && user.constructor === Object) {
      async function getCart() {
        const cart = await axios.get(`https://fadyattia-4shopping-server.herokuapp.com/api/cart/getusercart/${user._id}`, { headers })
                            .then(response => response.data)
        setCart(cart)
      }
      getCart()
    }
  }, [user])

  const getProducts = () => {
    const request = axios.get("https://fadyattia-4shopping-server.herokuapp.com/api/items")
                        .then(response => response.data)
    return request
  }

  const readCookie = () => {
    const user = Cookies.get('x_auth')
    if(user){
      setAuth(true)
    }
  }

  const getUser = () => {
    const request = axios.get('https://fadyattia-4shopping-server.herokuapp.com/api/users/me', { headers })
                            .then(response => response.data)
    return request
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
