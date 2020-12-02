import React, { useState, useEffect } from 'react'
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faIndent } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'

const Product = (props) => {

    const [allItems, setAllItems] = useState([])
    const [featuredItems, setFeaturedItems] = useState([]) //array of the last 4 featured

    const [productId, setProductId] = useState('')
    const [product, setProduct] = useState({})
    const [productReviews, setProductReviews] = useState([])
    const [productColors, setProductColors] = useState([])
    const [productSizes, setProductSizes] = useState([])
    // const [productKeywords, setProductKeywords] = useState([])
    const [productImages, setProductImages] = useState([])
    const [productDetails, setProductDetails] = useState([])

    const [cartColor, setCartColor] = useState('')
    const [cartSize, setCartSize] = useState('')

    const [bigImage, setBigImage] = useState('')
    const [imageColorsArray, setImageColorsArray] = useState([])
    const [smallImages, setSmallImages] = useState([])

    const [quantity, setQuantity] = useState(1) //for the current product product

    // const [currentUser, setCurrentUser] = useState({})
    const [userOwnerId, setUserOwnerId] = useState('')

    const headers = { Authorization: `Bearer ${Cookies.get('x_auth')}`}

    const history = useHistory()

    useEffect(() => {
        async function start() {
            setProductId(props.location.pathname.slice(19)) //slice /4shopping/product from the path & just keep the id

            const allItems = await axios.get('https://fadyattia-4shopping-server.herokuapp.com/api/items').then(response => response.data)
            setAllItems(allItems.reverse())
        }
        start()
    }, [])

    useEffect(() => {
        console.log(allItems)
        const featuredItems = allItems.filter(item => item.featured === true)
        setFeaturedItems(featuredItems.slice(0, 4)) //set the featured to be the latest 4
    }, [allItems])


    useEffect(() => {
        if(productId !== '') {
            async function getProductInfo() {
                const product = await getProductFromDB() 
                // console.log(items)
                setProduct(product)
            }
            getProductInfo()
        }
    }, [productId])

    useEffect(() => {
        if(Object.keys(product).length !== 0) {
            // console.log(product)
            setProductReviews(product.reviews)
            setProductColors(product.colors)
            setProductSizes(product.sizes)
            // setProductKeywords(product.keywords)
            setProductImages(product.productImages)
            setProductDetails(product.details)
            setBigImage('uploads\\products\\1605624203696no-photo.jpg')
        }
    }, [product])

    useEffect(() => {
        let imageColorsArray = []
        // let currentColor = []

        // if(bigImage.length !== 0 && productColors.length !== 0) {
        //     const firstColor = productImages.filter(image => image.slice(30, -6) == productColors[0])
        //     setBigImage((firstColor[0]))
        // }

        productColors.map((color) => {
        const currentColor = productImages.filter(image => image.slice(30, -6) === color)
            imageColorsArray.push(currentColor)

            // if(currentColor.length !== 0) {
            //     setBigImage(currentColor[0])
            // }

            console.log("imageColorsArray: ", imageColorsArray)
        })

        setImageColorsArray(imageColorsArray)
        // console.log(productImages)
        // console.log(productColors)

    }, [productColors])

    useEffect(() => {
        setCartColor(productColors[0])
        setCartSize(productSizes[0])
    }, [productColors, productSizes])

    useEffect(() => {
        if(imageColorsArray.length !== 0) {
            console.log(imageColorsArray)
            if(imageColorsArray[0].length !== 0) {
                setBigImage(imageColorsArray[0][0])
                setSmallImages(imageColorsArray[0])
            } 
        } 
    }, [imageColorsArray])

    useEffect(() => {
        async function getUserInfo() {
            const user = await getCurrentUser()
            // setCurrentUser(user)
            setUserOwnerId(user._id)
        }
        getUserInfo()
    }, [setProductSizes])

    const getCurrentUser = () => {
        const request = axios.get('https://fadyattia-4shopping-server.herokuapp.com/api/users/me', { headers })
                            .then(response => response.data)
        return request
    }

    const getProductFromDB = () => {
        const request = axios.get(`https://fadyattia-4shopping-server.herokuapp.com/api/items/${productId}`)
                            .then(response => response.data)
            return request
    }


    const colorsLinks = document.querySelectorAll(`.item-color`)
    colorsLinks.forEach(function (item) {
        item.addEventListener('click', function () {
        //reset the color of other links
        colorsLinks.forEach(function (item) {
            item.style.border = '1px solid grey'
        })})
    }) 

    const displayColors = () => (
            productColors.map((color, i) => (
                <a 
                    onClick={(e) => handleClickingColor(e, color)} 
                    className="item-color" 
                    style={{backgroundColor: color}} 
                    key={i}
                    href=""
                ></a>
            ))
    )

    const handleClickingColor = (e, color) => {
        e.preventDefault()
        setCartColor(color)
        e.target.style.border = '5px solid grey'

        let colorsHaveImagesArray = []

        imageColorsArray.map((singleColorArray) => {
            if(singleColorArray.length !== 0) colorsHaveImagesArray.push(singleColorArray[0].slice(30, -6))
            if(singleColorArray.length !== 0 && singleColorArray[0].slice(30, -6) === color) {
                setBigImage(singleColorArray[0])
                setSmallImages(singleColorArray)
            }
        })

        if(colorsHaveImagesArray.filter(colorHaveImages => colorHaveImages === color).length === 0) {
            setBigImage('uploads\\products\\1605624203696no-photo.jpg')
            setSmallImages([])
        }
    }


    const sizesLinks = document.querySelectorAll(`.item-size`)
    sizesLinks.forEach(function (item) {
        item.addEventListener('click', function () {
        //reset the color of other links
        sizesLinks.forEach(function (item) {
            item.style.backgroundColor = 'white'
            item.style.color = 'black'
        })})
    }) 

    const displaySizes = () => (
            productSizes.map((size, i) => (
                    <a 
                        onClick={(e) => handleClickingSize(e, size)} 
                        className="item-size" 
                        key={i}
                        href=""
                    >{size}</a>
            ))
    )


    const handleClickingSize = (e, size) => {
        e.preventDefault()
        setCartSize(size)
        e.target.style.backgroundColor = 'black'
        e.target.style.color = 'white'
        // console.log(e.target.style)
    }

    const addToCart = async () => {
        const addNewCartToServer = await addNewToCart()
        console.log(addNewCartToServer)
    }

    const dataForNewToCart = {
        productId,
        userOwnerId,
        name: product.name,
        color: cartColor,
        size: cartSize,
        quantity,
        unitPrice: product.salePrice,
        totalPrice: product.salePrice * quantity,
        productImages
    }

    const addNewToCart = () => {
        const request = axios.post('https://fadyattia-4shopping-server.herokuapp.com/api/cart/addtocart', dataForNewToCart, { headers })
                            .then(response => response.data)
        return request
    }
    

    const renderBigImg = () => (
        <img 
            src=
                { productImages.length !== 0 && productColors.length !== 0 ? 
                    `https://fadyattia-4shopping-server.herokuapp.com/${bigImage}`
                    : 
                    require('../../img/no-photo.jpg')
                }
            alt="personal-img" 
            id="productImg"
            className="big-image"
        />
    )

    const renderSmallPics = () => (
        smallImages.map((image, i) => (
            <div className="small-img-col" key={i}>
                <img 
                    src={`https://fadyattia-4shopping-server.herokuapp.com/${image}`} 
                    // style={{width: "100%"}} 
                    className="small-img"
                    id={i}
                    onClick={() => document.getElementById("productImg").src = document.getElementById(i).src}
                    alt=""
                />
            </div>
        ))
    )
    
    const displayFeatured = () => (
        featuredItems.map((item, i) => (
            <div className="col-4" key={i}>
                    <a href="" onClick={(e) => {
                        e.preventDefault()
                        history.push(`/4shopping/product/${item._id}`)
                    }}>
                        <img 
                            src={ item.productImages.length !== 0 ? `https://fadyattia-4shopping-server.herokuapp.com/${item.productImages[0]}` : require('../../img/product-1.jpg')} 
                            className="product-img"
                            style={{width: "100%"}} 
                            alt=""
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

    return (
        <div className="small-container single-product">
            <div className="row product-all">
                <div className="col-2 all-images">
                    
                    {renderBigImg()}
                    
                    <div className="small-img-row">
                        {renderSmallPics()}
                    </div>
                </div>

                <div className="col-2">
                    <p><Link to="/4shopping/products/all">All Products</Link> / {product.category}</p>
                    <h1 style={{fontSize: "2.2rem", margin: "15px 0", lineHeight: "100%"}}>{product.name} - {cartColor}</h1>
                    <div className="rating">
                        <FontAwesomeIcon icon={faStar} className="fa-star" />
                        <FontAwesomeIcon icon={faStar} className="fa-star" />
                        <FontAwesomeIcon icon={faStar} className="fa-star" />
                        <FontAwesomeIcon icon={faStar} className="fa-star" />
                        <FontAwesomeIcon icon={faStar} className="fa-star" />
                        <a href="#reviews" data-after="Reviews">{productReviews.length} reviews</a>
                    </div>

                    <div className="price-wrapper">
                        {(product.price === product.salePrice) ? (
                            <p className="price-after">£{product.salePrice} L.E</p>
                        ) : (
                            <><p className="price-before">£{product.price} L.E</p>
                            <p className="price-after">£{product.salePrice} L.E</p></>
                        ) }
                    </div>


                    <p className="colors-title">Available Colors: </p>
                    {
                        <div className="item-colors">
                            {displayColors()}
                        </div>
                    }


                    <p className="sizes-title">Available Sizes: </p>
                    {
                        <div className="item-sizes"> {displaySizes()} </div>
                    }


                    <input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)}  
                    />

                    <Link to="../cart" onClick={addToCart} className="btn">Add To Cart</Link>

                    <h3>Product Details <FontAwesomeIcon icon={faIndent} className="fa-indent" /></h3>
                    <br />
                    {productDetails.map((productDetail, i) => (
                        <div key={i}>* {productDetail}</div>
                    ))}
                </div>
            </div>



            <div className="small-container">
                <div className="row row-2">
                    <h2>More Good Stuff</h2>
                    <p>View More</p>
                </div>
            </div>

            <section className="small-container" id="reviews">
                <div className="row">
                    {displayFeatured()}
                </div>
            </section>

            <div className="small-container">
                <div className="row row-2">
                    <h2>Product Reviews</h2>
                    <p>View More</p>
                </div>
            </div>

            {productReviews}
        </div>
    )
}

export default Product