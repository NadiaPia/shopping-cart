import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './shop/shop.css';
import { PlusCircle } from "phosphor-react";
import { Link } from 'react-router-dom';
import Dialog from "./Dialog";

function Profile(props) {

    const [profleProducts, setProfileProducts] = useState([]);
    const [dialog, setDialog] = useState({ message: "", isLoading: false, args: null });
    const getAllProfileProducts = () => {
        axios.get(`https://fullstack-pavel.herokuapp.com/profile`).then((response) => {            
            setProfileProducts(response.data);
            setDialog({ message: "", isLoading: false, args: null });
        })
    };

    useEffect(() => {
        getAllProfileProducts();
    }, []);

    const deleteProduct = (id, publicId) => {
        //console.log("props.product.public_id", item.publicId)
        axios.delete(`https://fullstack-pavel.herokuapp.com/products/${id}`, { 
            headers: { publicId: publicId }
         }).then((response) => {           
            getAllProfileProducts();
            props.refreshCurrentCart();
        });
    };

    return (
        <div>
            <div className='products'>

                <Link className="product" to="/new-product">
                    <div className='profileProduct'>
                        <p >Add New</p>
                        <p ><PlusCircle size={42} /></p>
                    </div>
                </Link>

                {profleProducts.map((item) => {
                    return (
                        <div className='product' key={item.id}>
                            <img alt="pic" src={item.imageUrl} />
                            <div className="productElementContainer" >
                                <p className="productElement">
                                    <b>{item.title}</b>
                                </p>
                                <p className="productElement">
                                    <b>${item.price}</b>
                                </p>
                            </div>
                            <button className='deleteProductButton'
                                onClick={() => setDialog({ 
                                    message: "Delete Product?", 
                                    isLoading: true, 
                                    args: { itemId: item.id, publicId: item.publicId}
                                 })}
                            >
                                Delete
                            </button>

                        </div>)
                })}

            </div>
            {dialog.isLoading && <Dialog message={dialog.message} setDialog={setDialog} onConfirm={() => deleteProduct(dialog.args.itemId, dialog.args.publicId)} />}
        </div>
    )
};

export default Profile;
