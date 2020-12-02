import React, { useState, useEffect } from 'react'
import axios from 'axios'

var FormData = require('form-data');

const EditExclusiveProduct = () => {

    var bodyFormData = new FormData();

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const fileInput = React.createRef()

    bodyFormData.append('name', name);
    bodyFormData.append('description', description);

    const handleSubmitForm = async (e) => {
        e.preventDefault()

        let imagesArray = Array.from(fileInput.current.files)
        console.log(imagesArray)
        imagesArray.map((image) => bodyFormData.append('productImage', image, 'product-1.jpg'))
        await sendFormToDB()
    }

    const sendFormToDB = async () => {
        await axios({
            method: 'post',
            url: 'https://fadyattia-4shopping-server.herokuapp.com/api/items',
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data' }
            })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    return (
        <div className="admin-form-sm test2">
            <h2 className="form-title">Edit Exclusive Product</h2>
            <form id="editExclusiveForm" onSubmit={(e) => handleSubmitForm(e)}>

                <label htmlFor="name">Name: </label><br/>
                <input 
                    name="name"
                    type="text" 
                    id="name"
                    placeholder="Product Name"
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                /><br/>

                <label htmlFor="description">Description: </label><br/>
                <input 
                    name="description"
                    type="text" 
                    id="description"
                    placeholder="Product Description"
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                /><br/>

                <label htmlFor="images">Product Image: </label><br/>
                <input type="file" accept="image/png, image/jpeg" multiple ref={fileInput} /><br/>

                <input className="btn" type="submit" name="Edit Exclusive Product"/>
            </form>
        </div>
        
    )
}

export default EditExclusiveProduct