import React, { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';


function ProductTest(props) {

  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItemAmount = cartItems[props.product.id]


  return (
    <div className="product">
      <img alt="pic" src={props.product.imageUrl}/>
      <div >
        <p>
          <b>{props.product.title}</b>
        </p> 
        <p>
          <b>${props.product.price}</b>
        </p>       
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(props.product.id)}>
        Add To Cart {cartItemAmount > 0 && <>({cartItemAmount})</>}
      </button>
    </div>
  )
}

export default ProductTest;
