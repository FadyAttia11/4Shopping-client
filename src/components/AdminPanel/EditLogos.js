import React from 'react'
import axios from 'axios'

var FormData = require('form-data');

const EditLogos = () => {

    var bodyFormData = new FormData()

    const fileInput = React.createRef()

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        
        let imagesArray = Array.from(fileInput.current.files)
        console.log(imagesArray)

        imagesArray.map((image) => bodyFormData.append('logoImages', image, 'logo-1.jpg'))
        await sendFormToDB()
    }


    const sendFormToDB = async () => {
        await axios({
            method: 'post',
            url: '/api/items',
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
        <div className="admin-form-sm logos test2">
            <h2 className="logos-title">Edit Logos</h2>
            <form id="newProductForm" onSubmit={(e) => handleSubmitForm(e)}>
                <div className="logos-upload">
                    <input type="file" accept="image/png, image/jpeg" multiple ref={fileInput} /><br/>
                    <input type="file" accept="image/png, image/jpeg" multiple ref={fileInput} /><br/>
                    <input type="file" accept="image/png, image/jpeg" multiple ref={fileInput} /><br/>
                    <input type="file" accept="image/png, image/jpeg" multiple ref={fileInput} /><br/>
                    <input type="file" accept="image/png, image/jpeg" multiple ref={fileInput} /><br/>
                </div>

                <input className="btn" type="submit" name="Add New Product"/>
            </form>
        </div>
    )
}

export default EditLogos