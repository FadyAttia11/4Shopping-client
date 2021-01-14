import React, { useState, useEffect } from 'react'
import './Offer.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { SERVER_URL } from '../../../config/config'

const Offer = () => {

    const [offer, setOffer] = useState([])

    useEffect(() => {
        async function getOffer() {
            const offer = await axios.get(`${SERVER_URL}/api/exclusive`).then(response => response.data)
            setOffer(offer.reverse()) //get the latest offer in position [0]
        }
        getOffer()
    }, [])


    const renderOffer = () => (
        (offer.length !== 0) ? (
            <div className="row">
                <div className="col-2 offer-arrow">
                    <img 
                        src={`${SERVER_URL}/${offer[0].exclusiveImage}`}
                        className="offer-img" 
                        alt="" 
                    />
                </div>

                <div className="col-2 offer-arrow">
                    <div>
                        <p>Exclusively Available on <span>4</span>Shopping Website</p>
                        <h1>{offer[0].name}</h1>
                        <small>{offer[0].description}</small><br />
                        <Link to="" onClick={(e) => e.preventDefault()} className="btn">Buy Now &#8594;</Link>
                    </div>
                    
                </div>
            </div>
        ) : (null)
    )

    return (
        <div className="offer">
            {/* <Link onClick={(e) => handleArrowClick(e)}><img src={require('../../../img/left-arrow.png')} className="arrow" /></Link> */}
            
            {<div className="small-container">{renderOffer()}</div>}

            {/* <Link onClick={handleArrowClick}><img src={require('../../../img/right-arrow.png')} className="arrow" /></Link> */}
        </div>
    )
}

export default Offer