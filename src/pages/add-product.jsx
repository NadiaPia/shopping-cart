import React, { useEffect, useRef, useState } from 'react';
import { ShopContext } from '../context/shop-context';
import axios from "axios"


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

    const [imageSelected, setImageSelected] = useState()
    

    useEffect(() => {
        if(!props.url) return; //if don't use this condition, the value of url will be set up equal "" right away after 
        //render the page, because the statement (const [url, setUrl] = useState('') ) It will trigger useEffect and sending 
        //post request to the server with the image: ""; So, we need prevent the setting up the url="" initially
        axios.post("http://localhost:3001/products", { image: props.url }).then((response) => {
            console.log("response", response)
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
        <div>
            <input
                lang="en"
                type="file"

                onChange={(event) => {
                    setImageSelected(event.target.files[0])
                }}
            />
            <button onClick={uploadImage}> Upload Image </button>

            {/* <Image style={{width: 200}}cloudName="dhq7myqzj" publicId="https://res.cloudinary.com/dhq7myqzj/image/upload/v1683187661/htqrfkpze90gimskrk1b.jpg"/> */}
            {/* <Image style={{width: 200}}cloudName="dhq7myqzj" publicId={url}/>*/}
        </div>
    );



}







export default AddProduct
