import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { CartContext } from "../../Context/CartContext";


const ProductDisplay = (props) => {

  const { product } = props;
  const { addToCart } = useContext(CartContext);

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={atob(product.imageData)} alt="img" />
          <img src={atob(product.imageData)} alt="img" />
          <img src={atob(product.imageData)} alt="img" />
          <img src={atob(product.imageData)} alt="img" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={atob(product.imageData)} alt="img" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-new">£{product.price}</div>
        </div>
        <div className="productdisplay-right-description">

        </div>
        <button onClick={() => { addToCart({ productId: product.productId, name: product.name, price: product.price, quantity: 1, image: product.imageData }) }}>ADD TO CART</button>
        <p className="productdisplay-right-category"><span>Category :</span> {product?.category?.name}</p>
        <p className="productdisplay-right-category"><span>Tags :</span> Modern, Latest</p>
      </div>
    </div>
  );
};

export default ProductDisplay;


