import React, { useContext, useEffect, useState } from 'react'
import { Hero } from '../Components/Hero/Hero'
import { Popular } from '../Components/Popular/Popular'
import { Offers } from '../Components/Offers/Offers'
import { NewCollections } from '../Components/NewCollections/NewCollections'
import { NewsLetter } from '../Components/NewsLetter/NewsLetter'
import { ShopContext } from '../Context/ShopContext'

export const Shop = () => {

    const { getAllProducts } = useContext(ShopContext)
    const [popular, setPopular] = useState([])
    const [offer, setOffer]= useState([])
  
    useEffect(() => {
      async function fetchAll() {
          const result = await getAllProducts()
          const women = result?.filter(p=> p?.category?.name ==="Women")?.slice(0,4)
          const offer = result?.sort(() => Math.random() - 0.5)?.slice(0,8)
          setPopular(women)
          setOffer(offer)
      }
  
      fetchAll()
  }, [])
  
    return (
        <div>
            <Hero />
            <Popular popular={popular} />
            <Offers />
            <NewCollections collections={offer} />
            <NewsLetter />
        </div>
    )
}

