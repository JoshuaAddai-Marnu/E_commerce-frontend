import React, { createContext } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../store/store";
import { addItem, removeItem } from "../store/slices/cart";


export const CartContext = createContext(null);

const CartContextProvider = (props) => {

    const cart = useAppSelector(state => state?.cart)
    const user = useAppSelector(state => state.auth?.user)
    const dispatch = useAppDispatch()



    const addToCart = (product) => {
        if (!user) return toast.error("Authentication", {
            description: "Please login / sign up to add an item to cart"
        })
        dispatch(addItem(product))
        toast.success("Successfull", { description: "Successfully added item to cart" })
    }

    const removeFromCart = (itemId) => {
        if (!user) return toast.error("Authentication", {
            description: "Please login / sign up to remove an item from cart"
        })
        dispatch(removeItem({ productId: itemId }))
        toast.success("Successfull", { description: "Successfully removed item from cart" })
    }

    const getTotalCartAmount = () => {

        if (!user) return 0
        let totalAmount = 0;
        for (const item of cart?.cart) {
            totalAmount += item.price * item.quantity;
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        if (!user) return 0
        return cart?.cart?.length;
    }

    const getCartDetail = () => {
        if (!user) return []
        return cart?.cart
    }


    const contextValue = { getTotalCartItems, getTotalCartAmount, addToCart, removeFromCart, getCartDetail }
    return (
        <CartContext.Provider value={contextValue}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;