import React, { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';
import axios from "axios";


function ProductTest(props) {

  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItemAmount = cartItems[props.product.id]

  const deleteProduct = (id) => {
    console.log("props.product.public_id*************************************", props.product.publicId)
    axios.delete(`http://localhost:3001/products/${id}`, {headers: {publicId: props.product.publicId}}).then((response) => {
      console.log("response", response)

    });
  };
  
  return (
    <div className="product" >
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
      <button className='deleteProduct' onClick={() => deleteProduct(props.product.id)}>Delete</button>
    </div>
  )
}

export default ProductTest;
