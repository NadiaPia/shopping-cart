// import React, { useContext } from 'react';
// import {ShopContext} from '../../context/shop-context';



// function CartItem(props) {
//   const { id, productName, price, productImage } = props.data;
//   const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext);
  

//   return (
//     <div className='cartItem'>
//       <img src={productImage}/>
//       <div className='description'>
//         <p>
//           <b>{productName}</b>
//         </p>
//         <p>
//           ${price}
//         </p>

//         <div className='countHandler'>
//           <button className='cartProductButton' onClick={() => removeFromCart(id)}> - </button>
//           <input 
//           value={cartItems[id]} 
//           onChange={(event) => updateCartItemCount(Number(event.target.value), id)}
//           />
//           <button className='cartProductButton' onClick={() => addToCart(id)}> + </button>


//         </div>
//       </div>
//     </div>
//   )
// }

// export default CartItem