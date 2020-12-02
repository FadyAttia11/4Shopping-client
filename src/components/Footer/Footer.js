import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="footer-col-1">
                        <h3>Download Our App</h3>
                        <p>Download App for Android and ios mobile phone.</p>
                        <div className="app-logo">
                            <img src={require('../../img/play-store.png')} alt="" />
                            <img src={require('../../img/app-store.png')} alt="" />
                        </div>
                    </div>
                    <div className="footer-col-2">
                    <img src={require('../../img/4shopping-dark.png')} alt="" />
                        <p>Our Purpose Is To Give our clients various clothes styles with the best available quality.</p>
                    </div>
                    <div className="footer-col-3">
                        <h3>Useful Links</h3>
                        <ul>
                            <li>Coupons</li>
                            <li>Blog post</li>
                            <li>Return Policy</li>
                            <li>Join Affiliate</li>
                        </ul>
                    </div>
                    <div className="footer-col-4">
                        <h3>C   ontact me</h3>
                        <ul className="social-links">
                            <a href="https://www.facebook.com/Fady.Attia1/" target="_blank" ><li>Facebook</li></a>
                            <a href="https://twitter.com/FadyAttia12" target="_blank"><li>Twitter</li></a>
                            <a href="https://www.linkedin.com/in/fady-attia-01/" target="_blank"><li>Linkedin</li></a>
                            <a href="https://github.com/FadyAttia11" target="_blank"><li>Github</li></a>
                        </ul>
                    </div>
                </div>
                <hr />
                <p className="copyright">Copyright 2020 - Fady Attia</p>
            </div>
        </div>
    )
}

export default Footer