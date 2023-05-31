import React, { useEffect, useState } from 'react';
import axios from "axios";
import CartProduct from "./cart-product";
import "./cart.css";




function CartTest(props) {

  const [cartProducts, setCartProducts] = useState([]);  

  const getCartProducts = () => axios.get("http://localhost:3001/carts").then((response) => {
    console.log("response.data", response.data);   
    setCartProducts(response.data);
  })

  useEffect(() => {
    getCartProducts()
  }, [])

console.log(cartProducts)
  return (
    <div>
      <div className='cart'>
        {cartProducts.map((cartProduct) => (
          <CartProduct key={`cartProduct.id-${cartProduct.id}`} cartProduct={cartProduct} authState={props.authState} getCartProducts={getCartProducts}/>
          // console.log(cartProduct)
        ))}
      </div>
    </div>
  )
}

export default CartTest
