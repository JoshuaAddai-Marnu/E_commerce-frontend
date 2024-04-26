import React, { useContext, useEffect, useState } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from "../Components/Item/Item";
import { useParams } from 'react-router-dom';

import men_banner from '../Components/Assets/banner_mens.png'
import women_banner from '../Components/Assets/banner_women.png'
import kid_banner from '../Components/Assets/banner_kids.png'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


export const ShopCategory = (props) => {
    const [products, setProducts] = useState([])
    const { getAllProducts } = useContext(ShopContext)
    const query = useParams()

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed:2000
    };

    useEffect(() => {
        async function fetchAll() {
            const result = await getAllProducts()
            setProducts(result)
        }

        fetchAll()
    }, [])

    return (
        <div className='shop-category'>

            <Slider {...settings}>
                <div>
                    <img className='shopcategory-banner' src={men_banner} alt="" />
                </div>
                <div>
                    <img className='shopcategory-banner' src={women_banner} alt="" />
                </div>
                <div>
                    <img className='shopcategory-banner' src={kid_banner} alt="" />
                </div>

            </Slider>

            <div className="shopcategory-indexSort">
                <p>
                    {/* <span>showing 1-12</span> Out of 36 product */}
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