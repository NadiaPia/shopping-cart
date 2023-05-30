import React from 'react';



function CartProduct(props) {
    return (
        <div>
            <div className='cartItem'>
                        <img src={props.cartProduct.Product.imageUrl} alt="pic" />
                        <div className='description'>
                            <p>
                                <b>{props.cartProduct.Product.title}</b>
                            </p>
                            <p>
                                ${props.cartProduct.Product.price}
                            </p>

                            <div className='countHandler'>
                                <button > - </button>
                                <input

                                />
                                <button > + </button>

                            </div>
                        </div>
                    </div>
        </div>
    )
}

export default CartProduct
