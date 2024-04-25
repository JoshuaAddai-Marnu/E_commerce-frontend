import React, { useContext } from 'react'
import './CartItems.css'
import remove_icon from '../Assets/cart_cross_icon.png'
import { useAppSelector } from '../../store/store'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'

export const CartItems = () => {
    const { getTotalCartAmount, removeFromCart, getCartDetail } = useContext(CartContext);
    const user = useAppSelector(state => state?.auth?.user)
    return (
        <div className='cartitems'>
            {
                user ? <>
                    <div className="cartitems-format-main">
                        <p>Products</p>
                        <p>Title</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                        <p>Remove</p>
                    </div>
                    <hr />
                    {getCartDetail()?.map((e) => (
                        <div key={e.productId}>
                            <div className='cartitems-format cartitems-format-main'>
                                <img src={e.image ? atob(e.image) : e.image} alt="" className='carticon-product-icon' />
                                <p>{e.name}</p>
                                <p>£{e.price}</p>
                                <button className='cartitems-quantity'>{e.quantity}</button>
                                <p>£{(e.price * e.quantity)?.toFixed(2)}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.productId) }} alt="" />
                            </div>
                            <hr />
                        </div>
                    ))}
                    <div className="cartitems-down">
                        <div className="cartitems-total">
                            <h1>cart Totals</h1>
                            <div>
                                <div className="cartitems-total-item">
                                    <p>Subtotal</p>
                                    <p>£{getTotalCartAmount()}</p>
                                </div>
                                <hr />
                                <div className='cartitems-total-item'>
                                    <p>Shipping Fee</p>
                                    <p>Free</p>
                                </div>
                                <hr />
                                <div className='cartitems-total-item'>
                                    <h3>Total</h3>
                                    <h3>£{getTotalCartAmount()}</h3>
                                </div>
                            </div>
                            <Link to={"/checkout"}>
                                <button>PROCEED TO CHECKOUT</button>
                            </Link>
                        </div>
                        <div className='cartitems-promocode'>
                            <p>Enter your promo code here</p>
                            <div className="cartitems-promobox">
                                <input type="text" placeholder='promo code' />
                                <button>Submit</button>
                            </div>
                        </div>
                    </div>

                </> :


                    <div className="cartitems-down">

                        <div className="cartitems-total">
                            <p>
                                Please Login / Signup to have access to the cart...
                            </p>
                            <Link to={"/"}>

                                <button>Return to Shop</button>
                            </Link>
                        </div>
                    </div>
            }
        </div>

    )
}
export default CartItems;