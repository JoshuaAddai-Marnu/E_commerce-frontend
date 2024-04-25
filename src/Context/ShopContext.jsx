import React, { createContext } from "react";
import http from "../lib/http"
import { toast } from "sonner";


export const ShopContext = createContext(null);
const ShopContextProvider = (props) => {
    const getAllProducts = async (showToast) => {
        try {
            const req = await http.get("/api/Products")
            const data = req.data
            showToast && toast.success("Successfull", {
                description: "Successfully fetched all products"
            })
            return data
        } catch (error) {
            toast.error("Error", {
                description: error?.response?.message ?? error?.message ?? "There was an error"
            })
            return []
        }
    }

    const getAProduct = async (id) => {
        try {
            const req = await http.get(`/api/Products/${id}`)
            const data = req.data

            return data

        } catch (error) {
            toast.error("Error", {
                description: "There was an error fetching th product or the product does not exist"
            })

            return null
        }
    }

    const contextValue = { getAllProducts, getAProduct }
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;