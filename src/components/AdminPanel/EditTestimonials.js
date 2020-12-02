import React, { useState } from 'react'
import axios from 'axios'

var FormData = require('form-data');

const EditTestimonials = () => {

    var bodyFormData = new FormData();

    const [name, setName] = useState('')
    const [testimonial, setTestimonial] = useState('')

    const fileInput = React.createRef()

    bodyFormData.append('name', name);
    bodyFormData.append('testimonial', testimonial);

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        
        let imagesArray = Array.from(fileInput.current.files)
        console.log(imagesArray)

        imagesArray.map((image) => bodyFormData.append('TestimonialImage', image, 'testimonial-1.jpg'))
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
        <div className="admin-form-sm sm-2 test2">
            <h2 className="form-title">Edit Testimonials</h2>
            <form id="newProductForm" onSubmit={(e) => handleSubmitForm(e)}>
                <label htmlFor="name">Name: </label><br/>
                <input 
                    name="name"
                    type="text" 
                    id="name"
                    placeholder="Person's Name"
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                /><br/>

                <label htmlFor="name">Testimonial: </label><br/>
                <textarea 
                    name="testimonial"
                    type="text" 
                    id="testimonial"
                    placeholder="The Testimonial:"
                    value={testimonial} 
                    onChange={(e) => setTestimonial(e.target.value)} 
                    required 
                /><br/>

                <label htmlFor="images">Person's Image: </label><br/>
                <input type="file" accept="image/png, image/jpeg" multiple ref={fileInput} /><br/>

                <label htmlFor="rating">Rating: </label>
                <input type="number" id="rating"  />

                <input className="btn" type="submit" name="Add New Product"/>
            </form>
        </div>
    )
}

export default EditTestimonials