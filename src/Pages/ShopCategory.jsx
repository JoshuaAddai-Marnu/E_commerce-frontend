import React, { useContext, useEffect, useState } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from "../Components/Item/Item";
import { useParams } from 'react-router-dom';

export const ShopCategory = (props) => {
    const [products, setProducts] = useState([])
    const { getAllProducts } = useContext(ShopContext)
    const query = useParams()

    useEffect(() => {
        async function fetchAll() {
            const result = await getAllProducts()
            setProducts(result)
        }

        fetchAll()
    }, [])

    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>showing 1-12</span> Out of 36 product
                </p>
                <div className="shopcategory-sort">
                    Sort by <img src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className="shopcategory-products">
                {products.map((item, i) => {
                    if (query.categoryName === item.category.name) {
                        return <Item key={i} id={item.productId} name={item.name} image={atob(item.imageData)} new_price={item.price} old_price={item.old_price} />
                    }
                    else {
                        return null;
                    }
                })}
            </div>
            <div className="shopcategory-loadmore">
                Explore More
            </div>
        </div>
    )
}

export default ShopCategory