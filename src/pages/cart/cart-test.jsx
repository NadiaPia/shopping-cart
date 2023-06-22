import React, { useEffect, useState } from 'react';
import axios from "axios";
import CartProduct from "./cart-product";
import "./cart.css";
import { useNavigate } from "react-router-dom";

function CartTest(props) {

  const [cartProducts, setCartProducts] = useState([]); 
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  const getCartProducts = () => axios.get(`https://fullstack-pavel.herokuapp.com/carts`).then((response) => {
    //console.log("response.data", response.data);   
    setCartProducts(response.data);
  })

  useEffect(() => {
    getCartProducts()
  }, [])

//console.log(cartProducts)
  return (
    <div className="cartContainer">
      <div className='cart'>
        {cartProducts.map((cartProduct) => (
          <CartProduct
           key={`cartProduct.id-${cartProduct.id}`}
           setSubtotal={setSubtotal} 
           cartProduct={cartProduct} 
           authState={props.authState} 
           getCartProducts={getCartProducts}
           setCartQuantity={props.setCartQuantity}
           />
          // console.log(cartProduct)
        ))}
      </div>
      <div className="subtotalContainer">      
      <p>Subtotal:<br/> $ {subtotal}</p>
      <div className="cartButtons">
        <button className="ShopAndCheckout" onClick={() => navigate("/")}>Continue Shopping</button>
        <button className="ShopAndCheckout" onClick={() => navigate("/payment")}>Checkout</button>

      </div>
      </div>
    </div>
  )
};

export default CartTest;
