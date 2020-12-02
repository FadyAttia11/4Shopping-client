import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import AuthApi from '../../../context/AuthApi'
import './Navbar.css'

const Navbar = () => {

    const Auth = useContext(AuthApi)

    return (
        <div className="wrapper">
        <div className="container">
            <div className="navbar">
                <div className="logo">
                    <Link to="/4shopping/"><img src={require('../../../img/4shopping-light.png')} alt="" /></Link>
                </div>

                <nav>
                    <ul id="menuItems" style={{maxHeight: "0px"}}>
                        <li><Link to="/4shopping/">Home</Link></li>
                        {/* <li><Link to="/4shopping/admin">Admin</Link></li> */}
                        <li><Link to="/4shopping/offers"><span>Offers & Deals</span></Link></li>
                        <li><Link to="/4shopping/products/all">All Products</Link></li>
                        <li><Link to="/4shopping/about">About</Link></li>
                        {!Auth.auth && <li><Link to="/4shopping/account"><span>Login</span></Link></li>}
                        {/* {Auth.auth && <button className="cta" onClick={handleSignOut}><span>Sign out</span></button>} */}
                    </ul>
                </nav>
                <Link to="/4shopping/cart"><img src={require('../../../img/cart2.png')} className="cart-icon" alt="" /></Link>
                {Auth.auth && <Link to="/4shopping/profile"><img src={require('../../../img/profile.png')} className="profile-icon" alt="" /></Link>}
                
                <img 
                    src={require('../../../img/menu.png')} 
                    className="menu-icon" 
                    onClick={() => document.getElementById('menuItems').style.maxHeight === "0px" 
                        ? (document.getElementById('menuItems').style.maxHeight = "200px") 
                        : (document.getElementById('menuItems').style.maxHeight = "0px")} 
                    alt="" 
                />
            </div>
        </div>
        </div>
    )
}

export default Navbar