import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import AuthApi from '../../../context/AuthApi'
import './Login.css'
import { SERVER_URL } from '../../../config/config'

const Login = (props) => {

    const Auth = useContext(AuthApi)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    let history = useHistory()

    const displayErrors = errors => errors.map((error, i) => <p key={i}>{error}</p>)

    const handleEmailChange = event => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value)
    }

    const submitForm = async (event) => {
        event.preventDefault();
    
        const dataToSubmit = {
            email,
            password
        }
    
        if(isFormValid()){
            setErrors([])
            console.log(dataToSubmit) //just for debugging
            const response = await loginUser(dataToSubmit)
            console.log(response) //just for debugging (consists of loginSuccess)

            if(response.loginSuccess){
                Auth.setAuth(true)
                Cookies.set('x_auth', response.token)
                history.push('/')
                // props.history.push('/4shopping')
            }else {
                setErrors([
                    ...errors,
                    "failed to log in, please check your email and password"
                ])
            }

        }else {
            setErrors([
                ...errors,
                "Form is not valid"
            ])
        }
    }

    const isFormValid = () => email && password


    const loginUser = (dataToSubmit) => {
        const request = axios.post(`${SERVER_URL}/api/users/login`, dataToSubmit)
                        .then(response => response.data)
        return request
    }

    return (
        <div>
            <form id="LoginForm" onSubmit={submitForm} >
                <input 
                    name="email" 
                    type="email" 
                    id="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={e => handleEmailChange(e)}
                />
                <input 
                    name="password" 
                    type="password" 
                    id="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={e => handlePasswordChange(e)}
                />
                <button type="submit" className="btn">Login</button>
                <Link onClick={(e) => e.preventDefault()} className="forgot-btn">Forgot Password?</Link>
                {/* <button onClick={(e) => e.preventDefault()} className="btn facebook-color">Login with Facebook</button>
                <button onClick={(e) => e.preventDefault()} className="btn google-color">Login with Google</button> */}
            </form>

            {errors.length > 0 && (
                <div>
                    {displayErrors(errors)}
                </div>
            )}
        </div>
    )
}

export default Login




