import React, { useState } from 'react'
import axios from 'axios'
import { SERVER_URL } from '../../../config/config'

const Signup = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [reEnterPassword, setReEnterPassword] = useState('')
    const [msg, setMsg] = useState('')
    // const [boolean, setBoolean] = useState(false)

    const handleSubmitForm = async (e) => {
        e.preventDefault()

        if(password !== reEnterPassword) {
            return setMsg('Password did NOT match!')
        } 

        const dataToSubmit = {
            name,
            email,
            password,
        }

        try {
            await axios.post(`${SERVER_URL}/api/users`, dataToSubmit)
            setMsg('You Have Successfully Created An Account!')
            // setBoolean(true)
            setName('')
            setEmail('')
            setPassword('')
            setReEnterPassword('')
        } catch (e) {
            setMsg('Signing Up has Failed! please try again')
        }
    }


    return (
        <div>
            <form id="RegForm" onSubmit={handleSubmitForm} >
                <input 
                    name="name"
                    type="text" 
                    id="name"
                    placeholder="Username"
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <input 
                    name="email" 
                    type="email" 
                    id="reg-email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />
                <input 
                    name="password" 
                    type="password" 
                    id="reg-password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
                <input 
                    name="reEnterPassword" 
                    type="password" 
                    id="reEnterPassword" 
                    placeholder="Re-enter Password" 
                    value={reEnterPassword} 
                    onChange={(e) => setReEnterPassword(e.target.value)} 
                    required
                />
                <button type="submit" className="btn">Register</button>
            </form>

            {msg && <p>{msg}</p>}
        </div>
    )
}

export default Signup