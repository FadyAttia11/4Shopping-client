import React, { useState, useEffect } from 'react'
import './Testimonial.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const Testimonial = () => {

    const [testimonials, setTestimonials] = useState([])

    useEffect(() => {
        async function getTestimonials(){
            const testimonials = await getTestimonialsFromDB()
            setTestimonials(testimonials)
        }
        getTestimonials()
    }, [])

    useEffect(() => {
        console.log(testimonials)
    }, [testimonials])

    const getTestimonialsFromDB = () => {
        const request = axios.get('https://fadyattia-4shopping-server.herokuapp.com/api/testimonials/all')
                            .then(response => response.data)
            return request
    }

    const displayTestimonials = () => (
        testimonials.map((testimonial, i) => (
            <div className="col-3" key={i}>
                <FontAwesomeIcon icon={faQuoteLeft} className="fa-quote-left" />
                <p>{testimonial.quote}</p>
                <div className="rating">
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                </div>
                <img src={`https://fadyattia-4shopping-server.herokuapp.com/${testimonial.testimonialImage}`} alt="testimonial-img" className="testimonial-img"></img>
                <h3>{testimonial.name}</h3>
            </div>
        ))
    )

    return (
        <div className="testimonial">
            <div className="small-container">

                {<div className="row">{displayTestimonials()}</div>}

            </div>
        </div>
    )       
}

export default Testimonial