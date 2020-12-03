import React, { useState, useEffect } from 'react'
import './Products.css'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const Products = (props) => {

    const [items, setItems] = useState([])
    const [numOfPages, setNumOfPages] = useState(0)
    const [params, setParams] = useState('')
    const [chuncks, setChunks] = useState([])
    const n = 4 //tweak this to add more items per line

    const history = useHistory()

    useEffect(() => {
        async function getAllItems() {
            const items = await getItemFromDB() 
            const count = await getCountFromDB() //returns as string (need to be parseInt())
            // console.log(items)
            setItems(items)
            const numOfPages = Math.ceil(parseInt(count) / 20)
            setNumOfPages(numOfPages)  
        }
        getAllItems()
    }, [])



    useEffect(() => { //used to divide the array of products to arrays of 4 products each
        if(items.length !== 0) {
            // console.log(items.map(item => item.category))
            const result = new Array(Math.ceil(items.length / n))
            .fill()
            .map(_ => items.splice(0, n))
            setChunks(result)
        }
    }, [items])


    useEffect(() => {
        if(params !== ''){
            async function getItems() {
                const items = await getItemFromDB()
                setItems(items)
            }
            getItems()
        }
    }, [params])

    // useEffect(() => {
    //     if(numOfPages !== 0) {
    //         console.log(numOfPages)
    //     }
    // }, [numOfPages])

    const getItemFromDB = () => {

        //params has all query params ==> ?key=value (IMPORTANT)
        //you can access any value with:  params.get('key') ==> this will give you the value (IMPORTANT) 
        const search = props.location.search
        const params = (new URLSearchParams(search))
        const request = axios.get(`https://fadyattia-4shopping-server.herokuapp.com/api/items/all?page=${params.get('page')}&category=${params.get('category')}`)
                            .then(response => response.data)
        return request
    }

    const getCountFromDB = () => {
        const request = axios.get("https://fadyattia-4shopping-server.herokuapp.com/api/items/all/count")
                            .then(response => response.data)
        return request
    }


    const displayChuncks = () => (
        chuncks.map((chunk, i) => (
            <div className="row all-product" key={i}>
                {displayElements(chunk)}
            </div>
        )) 
    )
    

    const displayElements = (chunk) => (
        chunk.map((item, i) => (
            <div className="col-4" key={i}>
                <a onClick={() => {history.push(`/product/${item._id}`)}}>
                    <img 
                        src={ item.productImages.length !== 0 ? `https://fadyattia-4shopping-server.herokuapp.com/${item.productImages[0]}` : require('../../img/product-1.jpg')} 
                        style={{width: "100%"}} 
                        className="product-img"
                        alt="product-img" 
                    />
                    <h4 className="product-name">{item.name}</h4>
                </a>
                <div className="rating">
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                    <a href="#reviews" data-after="Reviews">{item.reviews.length} reviews</a>
                </div>

                <div className="price-wrapper">
                    {(item.price === item.salePrice) ? (
                        <p className="price-after">£{item.salePrice} L.E</p>
                    ) : (
                        <><p className="price-before">£{item.price} L.E</p>
                        <p className="price-after">£{item.salePrice} L.E</p></>
                    ) }
                </div>
            </div>
        ))
    )

    const handleClickingAllProducts = () => {
        history.push("/products/all")
    }


    // const search = props.location.search
    // const params2 = (new URLSearchParams(search))
    // const pageParam = params2.get('page')
    // console.log(pageParam)

    const links = document.querySelectorAll(`.page-num`)
    links.forEach(function (item) {
        item.addEventListener('click', function () {
        
        //reset the color of other links
        links.forEach(function (item) {
            item.style.backgroundColor = '#fff'
            item.style.color = '#555'
        })})
    }) 

    // document.querySelector(`.page-num:nth-child(2)`).style.backgroundColor = 'red'


    //to display the number of pages
    const fields = []
    for (let i = 1; i <= numOfPages; i++) {
        fields.push(<a onClick={(e) => handleClickingNumber(e, i)} key={i} className="page-num">{i}</a>)
    }

    const handleClickingNumber = async (e, i) => {
        // e.preventDefault()
        // console.log(i)

        const search = props.location.search
        const params = (new URLSearchParams(search))

        params.set('page', i)
        props.history.push(`?${params.toString()}`) //to set the query params when clicking page num
        setParams(params.toString())  

        //styling
        e.target.style.backgroundColor = '#3b3bff'
        e.target.style.color = '#fff'
    }


    return (
        <div className="small-container">
            <div className="row row-2">
            <h2>
                <a onClick={handleClickingAllProducts} className="all-product-headline">
                    All Products 
                </a>
                </h2>
                <select>
                    <option>Default sorting</option>
                    <option>sort by price</option>
                    <option>sort by popularity</option>
                    <option>sort by rating</option>
                    <option>sort by sale</option>
                </select>
            </div>

            <div className="page-btn">
                {fields}
            </div>

            {
                <div>{displayChuncks()}</div>
            }
        

            <div className="page-btn">
                {fields}
                {/* <a><span>&#8594;</span></a> */}
            </div>
        </div>
    )
}

export default Products