import React from 'react'
import './Categories.css'
import { useHistory } from 'react-router-dom'

const Home = () => {

    const history = useHistory()

    return (
        <div className="categories">
            <div className="small-container">
                <h2 className="title">Explore Categories</h2>
                <div className="row">
                    <div className="col-3">
                        <a href="" onClick={() => {history.push("/4shopping/products?category=shirts")}}>
                            <img className="category-img" src={require('../../../img/category-1.jpeg')} />
                        </a>
                        <h2>Shirts</h2>
                    </div>
                    <div className="col-3">
                        <a href="" onClick={() => {history.push("/4shopping/products?category=pants")}}>
                            <img className="category-img" src={require('../../../img/category-2.jpeg')} />
                        </a>
                        <h2>Pants</h2>
                    </div>
                    <div className="col-3">
                        <a href="" onClick={() => {history.push("/4shopping/products?category=shoes")}}>
                            <img className="category-img" src={require('../../../img/category-3.jpeg')} />
                        </a>
                        <h2>Shoes</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home