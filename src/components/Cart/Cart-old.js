import React, { useState, useEffect } from 'react'
import './Cart.css'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'

//displays the content of the cart for a specific user

const Cart = () => {

    const [subtotal, setSubtotal] = useState(0)
    const [quantity, setQuantity] = useState([])
    const [totalForProduct, setTotalForProduct] = useState([])

    const [userId, setUserId] = useState('')
    const [cart, setCart] = useState([])
    const [cartProducts, setCartProducts] = useState([])

    const [products, setProducts] = useState([])

    const headers = { Authorization: `Bearer ${Cookies.get('x_auth')}`}

    const history = useHistory()

    useEffect(() => {
        async function getUser() {
            const user = await getCurrentUser()
            setUserId(user._id)
        }
        getUser()
    }, [])

    useEffect(() => {
        if(userId !== '') {
            async function getCart() {
                const cart = await getUserCart()
                setCart(cart)
            }
            getCart()
        }
    }, [userId])

    useEffect(() => {
        if(cart.length !== 0) {
            async function getProducts() {
                await getCartProducts()
                // setProducts(products)
            }
            getProducts()
            // console.log("the cart: ", cart)
            // BOUNS: updating the quantity of certain cart doesn't envoke this fn which is good
        }
    }, [cart])


    useEffect(() => {
        if(products.length !== 0) {
            setQuantity(products.map((product) => {
                return {
                    productId: product._id,
                    quantity: currentProductQuantity(product)
                }
            })) // we set the quantity to be an array of objects => every object has the quantity with the productId

            setTotalForProduct(products.map((product) => {
                return {
                    productId: product._id,
                    total: currentProductTotal(product)
                }
            })) // we set the subofeach to be an array of objects => every object has the total with the productId

            console.log("products", products)
            console.log("cart", cart)
        }
    }, [products])

        useEffect(() => {
            console.log(cartProducts)
        }, [cartProducts])


    useEffect(() => {
        if(totalForProduct.length !== 0) {
            setSubtotal(totalForProduct.map((productTotal) => productTotal.total).reduce((a, b) => a + b))
        }
    }, [totalForProduct])

    // useEffect(() => {
    //     if(subtotal.length !== 0) {
    //         console.log(subtotal)
    //     }
    // }, [subtotal])

    useEffect(() => {
        // console.log('quantity is: ', quantity)
    }, [quantity])


    const currentProductQuantity = (product) => {
        const currentCartElement = cart.filter((cartElement) => cartElement.productId == product._id)
        // console.log(currentCartElement[0].quantity)
        return currentCartElement[0].quantity
        //value is writting wrong
    }

    const currentProductTotal = (product) => {
        const currentCartElement = cart.filter((cartElement) => cartElement.productId == product._id)
        // console.log(currentCartElement[0].quantity)
        return currentCartElement[0].total
        //value is writting wrong
    }

    

    const getCartProducts = () => {

        cart.map(async (cartElement) => { //has to be async to wait for every call (nested fn)
            const request = await axios.get(`/api/items/${cartElement.productId}`)
                            .then(response => response.data)
                            setProducts(oldProducts => [...oldProducts, request]);
            return request
        })
        return products
    }

    const getCurrentUser = () => {
        const request = axios.get('/api/users/me', { headers })
                            .then(response => response.data)
        return request
    }

    const getUserCart = () => {
        const request = axios.get(`/api/cart/getusercart/${userId}`, { headers })
                            .then(response => response.data)
        return request
    }

    const patchQuantity = async (e, product) => {
        const quantity = e.target.value
        const request = await axios.patch(`/api/cart/${product._id}`, { quantity, total: quantity * product.salePrice }, { headers })
                            .then(response => response.data)
        setTotalForProduct(totalForProduct.map((element) => {
            if(element.productId !== product._id) return element
            return {productId: product._id, total: quantity * product.salePrice}
        }))
        return request
    }

    const handleQuantityChange = async (e, product) => {
        
        setQuantity(quantity.map((quantity) => {
            if(quantity.productId !== product._id) return quantity
            return {productId: product._id, quantity: e.target.value}
        }))
        // setQuantity(quantity.map((quantity) => {
        //     if(quantity.productId !== item.productId) return quantity
        //     return {productId: item.productId, quantity: item.quantity}
        // }))

        const item = await patchQuantity(e, product)
        console.log(item)
    }

    const quantityValue = (product) => {

        if(quantity.find((obj) => obj.productId == product.productId)) {
            const element = quantity.find((obj) => obj.productId == product.productId)
            return element.quantity
        }
        return 1
    }

    const displayTotalForProduct = (product) => {
        if(totalForProduct.filter((element) => element.productId == product.productId)) {
            const currentElementTotal = totalForProduct.filter((element) => element.productId == product.productId)
            console.log(currentElementTotal)
            // return currentElementTotal[0].total
        }
        return 0
    }

    const removeProduct = async (product) => {
        setProducts([])
        setCart(cart.filter((cartElement) => cartElement.productId !== product.productId))
        const currentCartElement = cart.filter((cartElement) => cartElement.productId == product.productId)
        // console.log(currentCartElement)
        await fetchRemovingProduct(currentCartElement)
    }

    const fetchRemovingProduct = (currentCartElement) => {
        const request = axios.delete(`/api/cart/${currentCartElement[0]._id}`, { headers })
                            .then(response => response.data)
                            .catch(() => console.log('error'))
        return request
    }

    const currentProductColor = (product) => {
        // console.log(product)
        const currentCartElement = cart.filter((cartElement) => 
            cartElement.productId == product._id 
        )
        // console.log(currentCartElement[0].quantity)
        return currentCartElement[0].color
        //value is writting wrong
    }

    const currentProductSize = (product) => {
        const currentCartElement = cart.filter((cartElement) => 
            cartElement.productId == product._id
        )
        // console.log(currentCartElement[0].quantity)
        return currentCartElement[0].size
        //value is writting wrong
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
                                src={ product.productImages.length !== 0 ? `http://localhost:5000/${product.productImages[0]}` : require('../../img/product-1.jpg')}
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
                            value={quantityValue(product)} 
                            onChange={(e) => handleQuantityChange(e, product)} 
                        />
                    </td>
                    <td>${displayTotalForProduct(product).toFixed(2)}</td>
                </tr>
            </tbody>
        ))
    )
    // const displayCart = () => (
    //     products.map((product, i) => (
    //         <tbody key={i}>
    //             <tr>
    //                 <td>
    //                     <div className="cart-info">
    //                     <a className="cart-product" onClick={() => {history.push(`/4shopping/product/${product._id}`)}}>
    //                         <img 
    //                             src={ product.productImages.length !== 0 ? `http://localhost:5000/${product.productImages[0]}` : require('../../img/product-1.jpg')}
    //                         />
    //                     </a>
    //                         <div>
    //                             <a className="cart-product" onClick={() => {history.push(`/4shopping/product/${product._id}`)}}>
    //                                 <p>{product.name}</p>
    //                             </a>
    //                             <small>Price: ${product.salePrice.toFixed(2)}</small>
    //                             <br />
    //                             <div className="cart-colors-sizes">
    //                                 {displaySizes(product)}
    //                                 {displayColors(product)}
    //                             </div>
    //                             <button 
    //                                 className="remove-btn" 
    //                                 onClick={() => removeProduct(product)}
    //                             >Remove</button>
    //                         </div>
    //                     </div>
    //                 </td>
    //                 <td>
    //                     <input 
    //                         type="number" 
    //                         className="quantity-input"
    //                         initialvalue={1}
    //                         value={quantityValue(product)} 
    //                         onChange={(e) => handleQuantityChange(e, product)} 
    //                     />
    //                 </td>
    //                 <td>${displayTotalForProduct(product).toFixed(2)}</td>
    //             </tr>
    //         </tbody>
    //     ))
    // )

    

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