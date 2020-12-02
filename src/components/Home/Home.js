import React from 'react'
import Hero from './Hero/Hero'
import Categories from './Categories/Categories'
import Products from './Products/Products'
import Offer from './Offer/Offer'
import Testimonial from './Testimonial/Testimonial'
import Brands from './Brands/Brands'


const Home = () => {
    return (
        <div>
            <Hero />
            <Categories />
            <Products />
            <Offer />
            <Testimonial />
            <Brands />
        </div>
    )
}

export default Home