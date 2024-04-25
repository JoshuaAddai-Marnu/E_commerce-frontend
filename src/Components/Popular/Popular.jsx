import './Popular.css'
import { Item } from '../Item/Item'

export const Popular = ({ popular }) => {
  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popular.map((item,) => (
          <Item key={item.productId} id={item.productId} name={item.name} image={atob(item.imageData)} new_price={item.price} old_price={item.old_price} />
        )
        )}
      </div>
    </div>
  )
}

