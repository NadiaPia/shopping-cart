//import React, { useContext } from 'react';
//import { ShopContext } from '../../context/shop-context';
import React, { useState, useEffect } from 'react';

import axios from "axios";


function ProductTest(props) {

  const [quantity, setQuantity] = useState(props.initialQuantity[props.product.id] || 0); //quantity(product.id? || 0)
/*
  const deleteProduct = (id) => {
    console.log("props.product.public_id", props.product.publicId)
    axios.delete(`http://localhost:3001/products/${id}`, { headers: { publicId: props.product.publicId } }).then((response) => {
      console.log("response", response)
    });
  };
*/
useEffect(() => {
  setQuantity(props.initialQuantity[props.product.id] || 0)
}, [props.initialQuantity[props.product.id]]);

  const addToCart = (id) => {

    //console.log("props.authState.id", props.authState.id)
    quantity < 1 ? (
      axios.post(`http://localhost:3001/carts/${id}`, { userId: props.authState.id, quantity: 1 }).then((response) => {
        //I set up  quantity: 1 in the request body as a post request is doing before we increased the quantity, so, I do it manualy
        //console.log("Add to cart button is clicked once")
        console.log("response", response.data)
        setQuantity((prev) => prev + 1);
        props.setCartQuantity((prev) => prev + 1);
      })
    ) : (
      axios.put(`http://localhost:3001/carts/${id}`, { userId: props.authState.id, quantity: quantity + 1 }).then((response) => {
        console.log("Add to cart button is clicked more then once");
        console.log("response", response.data)
        setQuantity((prev) => prev + 1);
        props.setCartQuantity((prev) => prev + 1);
      }));

  };
  useEffect(() => {
    console.log("quantity", quantity)
  }, [quantity]) 


  return (
    <div className="product" >
      <img alt="pic" src={props.product.imageUrl} />

      <div className="productElementContainer">
        <p className="productElement">
          <b>{props.product.title}</b>
        </p>
        <p className="productElement">
          <b>${props.product.price}</b>
        </p>
      </div>
      {props.authState.status && <button className="addToCartBttn" onClick={() => addToCart(props.product.id)}>
        Add To Cart {quantity > 0 && <>({quantity})</>}
      </button>}
      {/*<button className='deleteProduct' onClick={() => deleteProduct(props.product.id)}>Delete</button> */}
    </div>
  )
}

export default ProductTest;
