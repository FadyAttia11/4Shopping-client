import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'

import AuthApi from '../../context/AuthApi'
import Home from '../Home/Home'
import About from '../About/About'
import Products from '../Products/Products'
import Product from '../Product/Product'
import Cart from '../Cart/Cart'
import Account from '../Account/Account'
import Profile from '../Profile/Profile'
import Offers from '../Offers/Offers'
import AdminPanel from '../AdminPanel/AdminPanel'

import ProtectedLogin from '../ProtectedLogin/ProtectedLogin' //this is only for non-authenticated users
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute' // this is only for authenticated users

const Routes = () => {

    const Auth = useContext(AuthApi)

    return (
        <Switch>
            <Route exact path="/4shopping/" component={Home} />
            <Route exact path="/4shopping/about" component={About} />
            <Route path="/4shopping/products" component={Products} />
            <Route path="/4shopping/offers" component={Offers} />
            <Route path="/4shopping/product" component={Product} />
            <Route path="/4shopping/admin" component={AdminPanel} />
            <ProtectedLogin path="/4shopping/account/" auth={Auth.auth} component={Account} />
            <ProtectedRoute path="/4shopping/cart" auth={Auth.auth} component={Cart} />
            <ProtectedRoute path="/4shopping/profile" auth={Auth.auth} component={Profile} />
        </Switch>
    )
}

export default Routes