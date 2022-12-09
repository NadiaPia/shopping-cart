import React, { useContext } from 'react';
import {PRODUCTS} from '../../products';
import {ShopContext} from '../../context/shop-context';
import CartItem from './cart-item';
import './cart.css';





function Cart() {
  const { cartItems } = useContext(ShopContext);
  return (
    <div className='cart'>
      <div>
        <h1>Your Cart Items</h1>
      </div>

      <div className='cartItems'>
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem key={product.id} data={product}/>
          }
        })}
      </div>

      <div className='cheskout'>
        <p>Subtotal: $</p>
        <button>Contunue Shopping</button>
        <button> Checkout </button>

      </div>

    </div>
  )
}

export default Cart