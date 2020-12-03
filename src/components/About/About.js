import React from 'react'
import './About.css'


const About = () => {

    return (
        <div className="small-container about-page"> 
            <div className="about-top">
                <div className="about-img-wrapper">
                    <img 
                        src={require('../../img/personal-img.jpg')} 
                        alt="about-img" 
                        className="about-img"
                    />
                    <h2><span>F</span>ady <span>A</span>ttia</h2>
                </div>

                <div className="about-info-wrapper">
                    <a href="https://fadyattia11.github.io/4for-react/" target="_blank" rel="noopener noreferrer"><img 
                        src={require('../../img/4for-logo.png')} 
                        alt="4for-logo" 
                        className="for-logo"
                    /></a>
                    <p><span>4</span>Shopping is a part of our <span>4</span>For services that we provide for  our clients
                    <br />through a various number of websites & apps</p>
                    <div className="contact-wrapper">
                        <p id="contact">you can contact us through our: </p>
                        <a href="https://www.linkedin.com/in/fady-attia-01/" target="_blank" rel="noopener noreferrer"><img 
                            src={require('../../img/linkedin-logo.png')} 
                            alt="linkedin-logo" 
                            className="linkedin-logo"
                        /></a>
                        <a href="https://twitter.com/FadyAttia12" target="_blank" rel="noopener noreferrer"><img 
                            src={require('../../img/twitter-logo.png')} 
                            alt="twitter-logo" 
                            className="twitter-logo"
                        /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About