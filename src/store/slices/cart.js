import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: []
}

// cart will be like
// cart=[{productId, name, price, quantity,}]

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getCart: (state) => {
            return state.cart
        },
        addItem: (state, { payload }) => {
            console.log({ payload })
            const newProduct = payload;
            const product = state.cart.findIndex(p => p.productId === newProduct.productId)

            if (product < 0) {
                state.cart = [...state.cart, newProduct]
            } else {
                state.cart[product].quantity += newProduct.quantity
            }
        },
        removeItem: (state, { payload }) => {
            state.cart = state.cart.filter(p => p.productId !== payload.productId)
        },
        clearCart: (state) => {
            state.cart = []
        },
        getCartQuantity: (state) => {
            return state.cart.length
        }
    },
})

export const { getCart, addItem, removeItem, clearCart, getCartQuantity } = cartSlice.actions

export default cartSlice.reducer