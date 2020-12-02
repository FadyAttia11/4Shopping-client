import React, { useState } from 'react'
import axios from 'axios'



const MakeUserAdmin = () => {

    const [name, setName] = useState('')

    const handleSubmitForm = async (e) => {
        e.preventDefault()

        await sendFormToDB()
    }

    const sendFormToDB = () => {
        const request = axios.post('/api/items/all', name)
                            .then(response => response.data)
            return request
    }


    return (
        <div className="admin-form-sm sm-1 test2">
            <h2>Make a User an Admin</h2>
            <form id="newProductForm" onSubmit={(e) => handleSubmitForm(e)}>
                <label htmlFor="name">User Name: </label><br/>
                <input 
                    name="name"
                    type="text" 
                    id="name"
                    placeholder="User Name"
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                /><br/>

                <input className="btn" type="submit" name="Make An Admin"/>
            </form>
        </div>
    )
}

export default MakeUserAdmin