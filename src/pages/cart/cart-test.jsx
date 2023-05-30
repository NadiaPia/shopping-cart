import React, { useEffect, useState } from 'react';
import axios from "axios";
import CartProduct from "./cart-product";
import "./cart.css";




function CartTest(props) {

  const [cartProducts, setCartProducts] = useState([]);  

  useEffect(() => {
    axios.get("http://localhost:3001/carts").then((response) => {
      console.log("response.data", response.data);   
      setCartProducts(response.data);
    })
  }, [])

console.log(cartProducts)
  return (
    <div>
      <div className='products'>
        {cartProducts.map((cartProduct, i) => (
          <CartProduct key={`cartProduct.id-${i}`} cartProduct={cartProduct}/>
          // console.log(cartProduct)
        ))}
      </div>
    </div>
  )
}

export default CartTest
