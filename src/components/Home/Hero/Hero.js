import React from 'react'
import './Hero.css'
import { Link } from 'react-router-dom'

const Hero = () => {

    return (
        <div className="header">
            <div className="container">
                
                {/* <Navbar /> */}

                <div className="row">
                    <div className="col-2">
                        <div className="text-wrapper">
                            <h1>Get The Best Outfits<br />that makes you shine!</h1>
                            <p>With our collections you can choose between several styles to get the ones that
                                truly fits your character and gives you maximum confidence.</p>
                            <Link to="/offers" className="btn">Explore Offers &#8594;</Link>
                        </div>
                    </div>

                    <div className="col-2 img-wrapper">
                        <img src={require('../../../img/hero.png')} alt="" />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Hero