import React, { useContext, useEffect, useState, } from 'react'
import './Navbar.css'

import logo from '../Assets/logo1.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

import { toast } from 'sonner'
import { removeUser } from "../../store/slices/auth"
import { useAppDispatch } from "../../store/store"
import { useSelector } from "react-redux"
import http from "../../lib/http"
import { CartContext } from '../../Context/CartContext'

export const Navbar = () => {
    const [menu, setMenu] = useState("shop")
    const { getTotalCartItems } = useContext(CartContext);
    const user = useSelector(state => state?.auth?.user)
    const dispatch = useAppDispatch()
    const [categories, setCategories] = useState([])

    const logout = async () => {
        try {
            await http.post("/api/Account/logout")
            dispatch(removeUser())

            toast.success("Success", { description: "Sucessfully logged out" })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        async function FetchCategory() {
            try {
                const req = await http.get("/Api/categories")
                const data = req.data
                setCategories(data)
            } catch (error) {
            }

        }

        FetchCategory()
    }, [])

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>SHOPPER</p>
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
                {
                    categories.map(category => (
                        <li key={category.id} onClick={() => { setMenu(category.name) }}><Link style={{ textDecoration: 'none' }} to={`/category/${category.name}`}>{category.name}</Link>{menu === category.name ? <hr /> : <></>}</li>
                    ))
                }

            </ul>
            <div className="nav-login-cart">
                {user ?
                    <button onClick={logout}>Logout</button>
                    : <Link to='/login'><button>Login</button></Link>}
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}


