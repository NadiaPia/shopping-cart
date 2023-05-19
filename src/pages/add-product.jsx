import React, { useEffect, useRef, useState } from 'react';
import { ShopContext } from '../context/shop-context';
import axios from "axios";
import { useNavigate } from "react-router-dom";


function AddProduct(props) {
    /*
        const loadFile = (e) => {
            const fileToLoad = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                console.log("eeeee", e.currentTarget.result)
                axios.post("http://localhost:3001/products", {image: e.currentTarget.result}).then((response) => {
                    console.log("response", response)
                });
            };
            reader.readAsDataURL(fileToLoad);
        }
        const inputFile = useRef(null);
       
        return (
            <div>
    
                <input
                    onChange={loadFile}
                    type='file'
                    id='fileDialog'
                    ref={inputFile}
                    style={{ display: 'none' }}
                />
    
                <button onClick={() => inputFile.current.click()}>Add Product</button>
                
            </div>
        )
    
    */
    //const navigate = useNavigate();
    const [imageSelected, setImageSelected] = useState();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(null);


    

    useEffect(() => {
        if (!props.url) return; //if don't use this condition, the value of url will be set up equal "" right away after 
        //render the page, because the statement (const [url, setUrl] = useState('') ) It will trigger useEffect and sending 
        //post request to the server with the image: ""; So, we need prevent the setting up the url="" initially
        axios.post("http://localhost:3001/products", { imageUrl: props.url, title: title, price: price}).then((response) => {
            console.log("response", response);
            //navigate("/")
        });
    }, [props.url])

    const uploadImage = (files) => {
        //console.log("files[0]", files[0]) //FileList {0: File, length: 1}
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "kysjntpy");

        //make request to upload an image to the cloudinary.com

        axios.post("https://api.cloudinary.com/v1_1/dhq7myqzj/image/upload", formData).then((response) => {
            console.log("response.data.url", response.data.url);
            props.setUrl(response.data.url);
        })

        //make request to download and show in the page the image from the cloudinary.com
        //1. npm i cloudinary-react;
        //2. import { Image } from "cloudinary-react";
    };

    return (
        <div className="newProduct">

            <div className="newProductForm">

                <input
                    lang="en"
                    type="file"
                    onChange={(event) => {
                        setImageSelected(event.target.files[0])
                    }}
                />


                <input type="text" placeholder='Title...' onChange={(event) => {setTitle(event.target.value)}}/>

                <input type="text" placeholder='Price...' onChange={(event) => {setPrice(event.target.value)}}/>

                <button onClick={uploadImage}> Upload Image </button>

            </div>
        </div>
    );



}







export default AddProduct;
