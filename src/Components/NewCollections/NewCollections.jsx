import React from 'react'
import './NewCollections.css'
import new_collection from '../Assets/new_collections'
import { Item } from '../Item/Item'

export const NewCollections = ({collections}) => {
  return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
            {collections.map((item)=>(
              <Item key={item.productId} id={item.productId} name={item.name} image={atob(item.imageData)} new_price={item.price} old_price={item.old_price} />
            ))}
        </div>
    </div>
  )
}
