import React from 'react'
import './Account.css'
import Signup from './Signup/Signup'
import Login from './Login/Login'

const Account = () => {
    return (
        <div className="account-page">
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <img src={require('../../img/image1.png')} style={{width: "100%"}} />
                    </div>

                    <div className="col-2">
                        <div className="form-container">
                            <div className="form-btn">
                                <span
                                    onClick={() => {
                                        document.getElementById("RegForm").style.transform = "translateX(300px)";
                                        document.getElementById("LoginForm").style.transform = "translateX(300px)";
                                        document.getElementById("Indicator").style.transform = "translateX(0px)";
                                    }}
                                >
                                    Register
                                </span>
                                <span
                                    onClick={() => {
                                        document.getElementById("RegForm").style.transform = "translateX(0)";
                                        document.getElementById("LoginForm").style.transform = "translateX(0)";
                                        document.getElementById("Indicator").style.transform = "translateX(100px)";
                                    }}
                                >
                                    Login
                                </span>
                                <hr id="Indicator" />
                            </div>

                                  
                            <Login />
                            <Signup />
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account