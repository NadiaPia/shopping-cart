import React, { useState, useEffect } from 'react';
import axios from "axios";

function CartProduct(props) {

    const [quantity, setQuantity] = useState(props.cartProduct.quantity);
    const [isLoading, setIsLoading] = useState(false);
    const changeQuantity = ((id, delta) => { // delta is the second argument might be 1 or -1

        setIsLoading(true); //to make +/- buttons disabled untill response from server

        const newQuantity = quantity + delta;
        if (newQuantity === 0) {
            deleteFromCart();
        }
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/carts/${id}`, {
            userId: props.authState.id,
            quantity: newQuantity
        }).then((response) => {
            //console.log("Add to cart button is clicked more then once");
            //console.log("response", response.data)
            setIsLoading(false);
            setQuantity((prev) => newQuantity);
            props.setSubtotal(prev => prev + delta * props.cartProduct.Product.price);
            props.setCartQuantity((prev) => prev + delta);
        })
    });

    const deleteFromCart = () => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/carts/${props.cartProduct.id}`).then((response) => {
            props.getCartProducts()
            //console.log(response)
        }).catch((error) => {
            console.log("error", error);
        })
    };

    useEffect(() => {
        props.setSubtotal(prev => prev + props.cartProduct.quantity * props.cartProduct.Product.price)
    }, []);

    return (
        
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
                        <button className='cartProductButton' disabled={isLoading} onClick={() => changeQuantity(props.cartProduct.Product.id, -1)}> - </button>
                        <input value={quantity} />
                        <button className='cartProductButton' disabled={isLoading} onClick={() => changeQuantity(props.cartProduct.Product.id, 1)}> + </button>
                    </div>
                </div>
            </div>
        
    )
};

export default CartProduct;
