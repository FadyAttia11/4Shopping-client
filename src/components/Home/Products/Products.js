import React, { useState, useEffect } from 'react'
import './Products.css'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const Products = () => {

    // const [items, setItems] = useState([]) //reversed (new is first)
    const [allItems, setAllItems] = useState([])
    const [latestItems, setLatestItems] = useState([])
    const [featuredItems, setFeaturedItems] = useState([]) //array of the last 4 featured
    const [chunks, setChunks] = useState([]) //2 arrays of 4 products each

    const history = useHistory()

    const n = 4 //set the line to have 4 products
    const m = 8 //set the total latest items to be 8 products (2lines)

    useEffect(() => {
        async function getAllItems() {
            const items = await getAllFromDB()
            const allItems = await getAllItemsFromDB()
            setAllItems(allItems.reverse())
            // setItems(items.reverse()) //to get the latest createdAt first
        }
        getAllItems()
    }, [])


    const getAllItemsFromDB = () => {
        const request = axios.get('https://fadyattia-4shopping-server.herokuapp.com/api/items')
                            .then(response => response.data)
            return request
    }

    const getAllFromDB = () => {
        const request = axios.get('https://fadyattia-4shopping-server.herokuapp.com/api/items/all')
                            .then(response => response.data)
            return request
    }

    useEffect(() => {
        console.log(allItems)
        setLatestItems(allItems.slice(0, m)) //get the first 8 elements of the array
        const featuredItems = allItems.filter(item => item.featured === true)
        setFeaturedItems(featuredItems.slice(0, 4)) //set the featured to be the latest 4
    }, [allItems])

    useEffect(() => { //used to divide the array of products to arrays of 4 products each
        if(latestItems.length !== 0) {
            const result = new Array(Math.ceil(latestItems.length / n))
            .fill()
            .map(_ => latestItems.splice(0, n))
            setChunks(result)
        }
    }, [latestItems])

    // useEffect(() => {
    //     console.log(items)
    // }, [items])

    const displayLatestChunk = () => (
        chunks.map((chunk, i) => (
            <div className="row" key={i}>
                {displayLatestElements(chunk)}
            </div>
        )) 
    )
 

    const displayLatestElements = (chunk) => (
        chunk.map((item, i) => (
            <div className="col-4" key={i}>
                    <a onClick={() => {history.push(`/4shopping/product/${item._id}`)}}>
                        <img 
                            src={ item.productImages.length !== 0 ? `https://fadyattia-4shopping-server.herokuapp.com/${item.productImages[0]}` : require('../../../img/product-1.jpg')} 
                            className="product-img"
                            style={{width: "100%"}}
                        />
                        <h4 className="product-name">{item.name}</h4>
                    </a>
                    <div className="rating">
                        <FontAwesomeIcon icon={faStar} className="fa-star" />
                        <FontAwesomeIcon icon={faStar} className="fa-star" />
                        <FontAwesomeIcon icon={faStar} className="fa-star" />
                        <FontAwesomeIcon icon={faStar} className="fa-star" />
                        <FontAwesomeIcon icon={faStar} className="fa-star" />
                    </div>
                    <div className="price-wrapper">
                        {(item.price == item.salePrice) ? (
                            <p className="price-after">£{item.salePrice} L.E</p>
                        ) : (
                            <><p className="price-before">£{item.price} L.E</p>
                            <p className="price-after">£{item.salePrice} L.E</p></>
                        ) }
                    </div>
                </div>
        ))
    )

    const displayFeatured = () => (
        featuredItems.map((item, i) => (
            <div className="col-4" key={i}>
                    <a onClick={() => {history.push(`/4shopping/product/${item._id}`)}}>
                        <img 
                            src={ item.productImages.length !== 0 ? `https://fadyattia-4shopping-server.herokuapp.com/${item.productImages[0]}` : require('../../../img/product-1.jpg')} 
                            className="product-img"
                            style={{width: "100%"}} 
                        />
                        <h4 className="product-name">{item.name}</h4>
                    </a>
                    <div className="rating">
                        <FontAwesomeIcon icon={faStar} className="fa-star" />
                        <FontAwesomeIcon icon={faStar} className="fa-star" />
                        <FontAwesomeIcon icon={faStar} className="fa-star" />
                        <FontAwesomeIcon icon={faStar} className="fa-star" />
                        <FontAwesomeIcon icon={faStar} className="fa-star" />
                    </div>
                    <div className="price-wrapper">
                        {(item.price == item.salePrice) ? (
                            <p className="price-after">£{item.salePrice} L.E</p>
                        ) : (
                            <><p className="price-before">£{item.price} L.E</p>
                            <p className="price-after">£{item.salePrice} L.E</p></>
                        ) }
                    </div>
                </div>
        ))
    )
        
    

    return (
        <div className="small-container">

            <h2 className="title">Featured Products</h2>
            <div className="row">{displayFeatured()}</div>


            <h2 className="title">Latest Products</h2>
            <div>{displayLatestChunk()}</div>
            
        </div>
    )
}

export default Products