import React, { useState } from 'react'
import http from "../../lib/http"
import { toast } from 'sonner'
import { useAppSelector } from '../../store/store'
import { Link } from 'react-router-dom'

export default function ProductItem({ product, removeProduct }) {
    const [isLoading, setIsLoading] = useState(false)
    const user = useAppSelector(state => state?.auth?.user)

    const deleteProduct = async () => {
        const result = window.confirm("Are you sure you want to delete this product")

        if (result) {
            try {
                setIsLoading(true)
                await http.delete(`/api/Products/${product.productId}`, {
                    headers: {
                        "Authorization": `Bearer ${user?.token}`
                    }
                })
                removeProduct(product.productId)
                toast.success("Successfull", { description: "Successfully deleted product" })
            } catch (error) {
                toast.error("Error", { description: "There was an error deleting the product" })
            } finally {
                setIsLoading(false)
            }
        }
    }

    return (
        <div className='product'>
            <h3>
                {product.name}
            </h3>
            <h3>
                £{product.price}
            </h3>
            <h4>{product.stockQuantity} pieces left</h4>

            <div className='actions'>
                <Link to={`/admin/products/${product.productId}`}>
                <button disabled={isLoading} className='edit'>
                    Edit
                </button>
                
                </Link>
                <button disabled={isLoading} onClick={deleteProduct} className='delete'>
                    Delete
                </button>
            </div>
        </div>
    )
}
