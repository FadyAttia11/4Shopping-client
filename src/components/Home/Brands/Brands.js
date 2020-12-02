import React from 'react'
import './Brands.css'

const Brands = () => {
    return (
        <div className="brands">
            <div className="small-container">
                <div className="row">
                    <div className="col-5">
                        <img src={require('../../../img/logo-nike.png')} alt="" />
                    </div>
                    <div className="col-5">
                        <img src={require('../../../img/logo-adidas.png')} alt="" />
                    </div>
                    <div className="col-5">
                        <img src={require('../../../img/logo-puma.png')} alt="" />
                    </div>
                    <div className="col-5">
                        <img src={require('../../../img/logo-zara.png')} alt="" />
                    </div>
                    <div className="col-5">
                        <img src={require('../../../img/logo-lacoste.png')} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Brands