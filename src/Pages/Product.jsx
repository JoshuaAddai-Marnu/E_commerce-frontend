import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrum from '../Components/Breadcrums/Breadcrum'
import { ShopContext } from '../Context/ShopContext'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import { RelatedProducts } from '../Components/RelatedProducts/RelatedProducts'

export const Product = () => {
  const [product, setProduct] = useState(null)

  const { getAProduct } = useContext(ShopContext)
  const { productId } = useParams();

  useEffect(() => {

    async function fetchProduct() {
      const product = await getAProduct(productId)
      setProduct(product)
    }

    if (productId.length) {
      fetchProduct()
    }

  }, [productId])

  console.log({ product })
  return (
    <div>
      {
        product ?
          <>

            <Breadcrum product={product} />
            <ProductDisplay product={product} />
            <DescriptionBox description={product.description} />
            <RelatedProducts category={product?.category?.name} />
          </>
          :
          <p>
            Product was not found
          </p>
      }
    </div>
  )
}

export default Product
