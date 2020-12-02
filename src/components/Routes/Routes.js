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
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route path="/products" component={Products} />
            <Route path="/offers" component={Offers} />
            <Route path="/product" component={Product} />
            <Route path="/admin" component={AdminPanel} />
            <ProtectedLogin path="/account/" auth={Auth.auth} component={Account} />
            <ProtectedRoute path="/cart" auth={Auth.auth} component={Cart} />
            <ProtectedRoute path="/profile" auth={Auth.auth} component={Profile} />
        </Switch>
    )
}

export default Routes