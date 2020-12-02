import React, { useState, useEffect } from 'react'
import './Cart.css'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'

//displays the content of the cart for a specific user

const Cart = () => {

    const [userId, setUserId] = useState('')
    const [cart, setCart] = useState([])
    const [subtotal, setSubtotal] = useState(0)

    const headers = { Authorization: `Bearer ${Cookies.get('x_auth')}`}

    const history = useHistory()

    useEffect(() => {
        async function getCurrentUser() {
            const user = await axios.get('/api/users/me', { headers })
                                .then(response => response.data)
            setUserId(user._id)
        }
        getCurrentUser()
    }, [])


    useEffect(() => {
        if(userId !== '') {
            async function getCart() {
                const cart = await axios.get(`/api/cart/getusercart/${userId}`, { headers })
                                    .then(response => response.data)
                setCart(cart)
            }
            getCart()
        }
    }, [userId])



    useEffect(() => {
        if(cart.length !== 0) {
            setSubtotal(cart.map((cartElement) => cartElement.totalPrice).reduce((a, b) => a + b))
        }
    }, [cart])

    
    
    const removeProduct = async (product) => {
        setCart(cart.filter((cartElement) => cartElement.productId !== product.productId))

        const currentCartElement = cart.filter((cartElement) => cartElement.productId === product.productId)
        await axios.delete(`/api/cart/${currentCartElement[0]._id}`, { headers })
                .then(response => response.data)
        
    }
 
    const handleQuantityChange = async (e, product) => {
        const quantity = e.target.value
        
        setCart(cart.map((cartElement) => {
            if(cartElement !== product) return cartElement
            return {...cartElement, quantity, totalPrice: quantity * product.unitPrice}
        }))

        //patch the cart by the cart _id (unique) 
        const item = await axios.patch(`/api/cart/${product._id}`, { quantity, totalPrice: quantity * product.unitPrice }, { headers })
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
                        <a className="cart-product" onClick={() => {history.push(`/4shopping/product/${product.productId}`)}}>
                            <img 
                                src={ product.productImages.length !== 0 ? `https://fadyattia-4shopping-server.herokuapp.com/${product.productImages[0]}` : require('../../img/product-1.jpg')}
                            />
                        </a>
                            <div>
                                <a className="cart-product" onClick={() => {history.push(`/4shopping/product/${product.productId}`)}}>
                                    <p>{product.name}</p>
                                </a>
                                <small>Price: ${product.unitPrice.toFixed(2)}</small>
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
                            className="quantity-input"
                            initialvalue={1}
                            value={product.quantity} 
                            onChange={(e) => handleQuantityChange(e, product)} 
                        />
                    </td>
                    <td>${product.totalPrice.toFixed(2)}</td>
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
                            <td>${subtotal.toFixed(2)}</td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr>
                            <td>Discount</td>
                            <td>${(subtotal * 0.12).toFixed(2)}</td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr>
                            <td>Total</td>
                            <td>${(subtotal - (subtotal * 0.12)).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Cart