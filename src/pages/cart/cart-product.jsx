import React, { useState } from 'react';
import axios from "axios";




function CartProduct(props) {

    const [quantity, setQuantity] = useState(props.cartProduct.quantity)    

    const changeQuantity = ((id, delta) => { // delta is the second argument might be 1 or -1
        const newQuantity = quantity + delta;
        if(newQuantity === 0) {
            deleteFromCart()
            
        }
        axios.put(`http://localhost:3001/carts/${id}`, { userId: props.authState.id, quantity: newQuantity }).then((response) => {
        console.log("Add to cart button is clicked more then once");
        //console.log("response", response.data)
        setQuantity((prev) => newQuantity);
      })
    }) 
    
    const deleteFromCart = () => {
        axios.delete(`http://localhost:3001/carts/${props.cartProduct.id}`).then((response) => {
            props.getCartProducts()
            console.log(response)
        }).catch((error) => {
            console.log("error", error);
        }) 
    }

    return (
        <div >
            <div className='cartItem'>
                        <img src={props.cartProduct.Product.imageUrl} alt="pic" />
                        <div className='cartItemDescription'>
                            <p>
                                <b>{props.cartProduct.Product.title}</b>
                            </p>
                            <p>
                                ${props.cartProduct.Product.price}
                            </p>

                            <div className='countHandler'>
                                <button className='cartProductButton' onClick={() => changeQuantity(props.cartProduct.Product.id, -1)}> - </button>
                                <input value={quantity} />
                                <button className='cartProductButton' onClick={() => changeQuantity(props.cartProduct.Product.id, 1)}> + </button>

                            </div>
                        </div>
                    </div>
        </div>
    )
}

export default CartProduct
