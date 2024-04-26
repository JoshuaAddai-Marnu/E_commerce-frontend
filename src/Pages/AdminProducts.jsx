import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import "./CSS/AdminProduct.css"
import ProductItem from '../Components/Admin/ProductItem'


export default function AdminProducts() {
    const [products, setProducts] = useState([])
    const { getAllProducts } = useContext(ShopContext)

    useEffect(() => {
        async function fetchAll() {
            const result = await getAllProducts()
            setProducts(result)
        }

        fetchAll()
    }, [])

    const removeProduct = (productId) => {
        setProducts(curr => curr.filter(prod => prod.productId !== productId))
    }

    return (
        <div>
            <div className='prod-title'>

                <h3 className='title'>
                    All Products
                </h3>
                <button>
                    Create New products
                </button>
            </div>

            <div className='products'>
                {
                    products.map(product => (
                        <ProductItem product={product} removeProduct={removeProduct} />
                    ))
                }
            </div>
        </div>
    )
}
