import React, { useContext, useEffect, useState, } from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import { ShopContext } from '../../Context/ShopContext'

export const RelatedProducts = (category) => {
  const [relatedProducts, setRelatedProducts] = useState([])
  const { getAllProducts } = useContext(ShopContext)

  useEffect(() => {
    async function getSimilar() {
      const response = await getAllProducts()
      if (response?.length) {
        setRelatedProducts(response?.filter(p => p.category?.name != category)?.slice(0, 4))
      }
    }
    getSimilar()
  }, [])


  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProducts.map((item, i) => (

          <Item key={i} id={item.productId} name={item.name} image={atob(item.imageData)} new_price={item.price} old_price={item.old_price} />
        )
        )}
      </div>
    </div>
  )
}
