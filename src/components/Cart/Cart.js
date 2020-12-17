import React, { useState, useEffect, useContext } from 'react'
import './Cart.css'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import CartApi from '../../context/CartApi'
import { SERVER_URL } from '../../config/config'

//displays the content of the cart for a specific user

const Cart = () => {

    const [subtotal, setSubtotal] = useState(0)
    const [colorFirstImage, setColorFirstImage] = useState([])

    const headers = { Authorization: `Bearer ${Cookies.get('x_auth')}`}

    const { cart, setCart } = useContext(CartApi)

    const history = useHistory()

    // useEffect(() => {
    //     const colorFirstImage = cart.map(cartElement => cartElement.productImages.find(image => image.slice(30, -6) === cartElement.color))
    //     setColorFirstImage(colorFirstImage)
    // }, [])

    // useEffect(() => {
    //     console.log('the color first image is: ', colorFirstImage)
    // },[colorFirstImage])


    useEffect(() => {
        if(cart.length !== 0) {
            setSubtotal(cart.map((cartElement) => cartElement.totalPrice).reduce((a, b) => a + b))
            console.log('thie cart', cart)
        }
    }, [cart])

    
    
    const removeProduct = async (product) => {
        setCart(cart.filter((cartElement) => cartElement.productId !== product.productId || cartElement.size !== product.size || cartElement.color !== product.color))

        const currentCartElement = cart.filter((cartElement) => cartElement.productId === product.productId)
        await axios.delete(`${SERVER_URL}/api/cart/${currentCartElement[0]._id}`, { headers })
                .then(response => response.data)
        
    }
 
    const handleQuantityChange = async (e, product) => {
        const quantity = e.target.value
        
        setCart(cart.map((cartElement) => {
            if(cartElement !== product) return cartElement
            return {...cartElement, quantity, totalPrice: quantity * product.unitPrice}
        }))

        //patch the cart by the cart _id (unique) 
        const item = await axios.patch(`${SERVER_URL}/api/cart/${product._id}`, { quantity, totalPrice: quantity * product.unitPrice }, { headers })
                            .then(response => response.data)
        console.log(item)
    }
 

    const displayColors = (product) => (
        <div
            className="cart-item-color"
            style={{backgroundColor: product.color}}
        ></div>
    )

    const displaySizes = (product) => (
        <div className="cart-item-size">
            <p>Size: {product.size}</p>
        </div>
    )


    const displayCart = () => (
        cart.map((product, i) => (
            <tbody key={i}>
                <tr>
                    <td>
                        <div className="cart-info">
                        <a className="cart-product" onClick={() => {history.push(`/product/${product.productId}`)}}>
                            <img 
                                src={ product.productImage ? `${SERVER_URL}/${product.productImage}` : require('../../img/product-1.jpg')}
                            />
                        </a>
                            <div>
                                <a className="cart-product" onClick={() => {history.push(`/product/${product.productId}`)}}>
                                    <p>{product.name} - {product.color}</p>
                                </a>
                                <small>Price: £{product.unitPrice.toFixed(2)}</small>
                                <br />
                                <div className="cart-colors-sizes">
                                    {displaySizes(product)}
                                    {displayColors(product)}
                                </div>
                                <button 
                                    className="remove-btn" 
                                    onClick={() => removeProduct(product)}
                                >Remove</button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <input 
                            type="number" 
                            min="1"
                            className="quantity-input"
                            initialvalue={1}
                            value={product.quantity} 
                            onChange={(e) => handleQuantityChange(e, product)} 
                        />
                    </td>
                    <td>£{product.totalPrice.toFixed(2)}</td>
                </tr>
            </tbody>
        ))
    )
  

    return (
        <div className="small-container cart-page">
            <table>
                <tbody>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </tbody>

                {displayCart()}

            </table>

            <div className="total-price">
                <table>
                    <tbody>
                        <tr>
                            <td>Subtotal</td>
                            <td>£{subtotal.toFixed(2)}</td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr>
                            <td>Discount</td>
                            <td>£{(subtotal * 0.12).toFixed(2)}</td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr>
                            <td>Total</td>
                            <td style={{fontWeight: "600"}}>£{(subtotal - (subtotal * 0.12)).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Cart