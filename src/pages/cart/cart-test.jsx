import React, { useEffect, useState } from 'react';
import axios from "axios";
import CartProduct from "./cart-product";



function CartTest(props) {

  const [cartProducts, setCartProducts] = useState([]);  

  useEffect(() => {
    axios.get("http://localhost:3001/carts").then((response) => {
      console.log("response.data", response.data);   
      setCartProducts(response.data);    

    })
  }, [])


  return (
    <div>
      <div className='products'>
        {cartProducts.map((cartProduct) => (
          <CartProduct key={cartProduct.id} cartProduct={cartProduct} products={props.products}/>
        ))}
      </div>
    </div>
  )
}

export default CartTest
