import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './shop/shop.css';
import { PlusCircle } from "phosphor-react";
import { Link } from 'react-router-dom';

import { SelectionPlus } from "phosphor-react";





function Profile(props) {


    const [profleProducts, setProfileProducts] = useState([]);



    useEffect(() => {
        axios.get("http://localhost:3001/profile").then((response) => {
            console.log("response.data", response.data)
            setProfileProducts(response.data)

        })
    }, [])

    const deleteProduct = (id, publicId) => {
        //console.log("props.product.public_id", item.publicId)
        axios.delete(`http://localhost:3001/products/${id}`, { headers: { publicId: publicId } }).then((response) => {
            console.log("response", response)
        });
    };


    return (
        <div>
            <div className='products'>

                <Link className="product" to="/new-product">
                    <p className='profileProduct'>Add New</p>
                    <p className='profileProduct'><PlusCircle size={42} /></p>
                </Link>

                {profleProducts.map((item) => {
                    return (


                        <div className='product' key={item.id}>
                            <div>
                                <img alt="pic" src={item.imageUrl} />
                                <div >
                                    <p>
                                        <b>{item.title}</b>
                                    </p>
                                    <p>
                                        <b>${item.price}</b>
                                    </p>
                                </div>
                                <button className='deleteProduct' onClick={() => deleteProduct(item.id, item.publicId)}>Delete</button>
                            </div>
                        </div>)
                })}

            </div>
        </div>
    )
}

export default Profile;
