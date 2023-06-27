import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import addImg from "../assets/add_img.png";
import statusImg from "../assets/status.png";
import './add-product.css';

function AddProduct(props) {

    const inputFile = useRef(null);
    const navigate = useNavigate();
    const [imageSelected, setImageSelected] = useState();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(null);
    const [publicId, setPublicId] = useState("");
    const [spin, setSpin] = useState(false);

    useEffect(() => {
        if (!props.url) return; //if don't use this condition, the value of url will be set up equal "" right away after 
        //render the page, because the statement (const [url, setUrl] = useState('') ) It will trigger useEffect and sending 
        //post request to the server with the image: ""; So, we need prevent the setting up the url="" initially
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/products`, { 
            imageUrl: props.url, 
            publicId: publicId, 
            title: title, 
            price: price
         }).then((response) => {            
            navigate("/profile")
        }).catch(error => {
            console.log("error", error)
        });
    }, [props.url]);

    const uploadImage = (files) => {
        //console.log("files[0]", files[0]) //FileList {0: File, length: 1}
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "kysjntpy");

        setSpin(true);
        //console.log(formData.get('file'))

        //make request to upload an image to the cloudinary.com
        axios.post("https://api.cloudinary.com/v1_1/dhq7myqzj/image/upload", formData, { withCredentials: false }).then((response) => {
            // by adding {withCredentials: false} we get rid off the all cookies that are sending by default according the 
            //axios.defaults.withCredentials...because Cloudinary don't wait any extra info

            //console.log("response.data.url", response.data.url);
            //console.log("response.data", response.data);
            //console.log("formData", formData)
            props.setUrl(response.data.url);
            setPublicId(response.data.public_id);
        });

        //make request to download and show in the page the image from the cloudinary.com
        //1. npm i cloudinary-react;
        //2. import { Image } from "cloudinary-react";
    };

    return (
        <div className="newProduct">
            <div className="newProductForm">
                <div className={`thumbnailPictureForm ${imageSelected ? 'selectedImgForm' : ''}`}>

                    <img
                        className={imageSelected ? 'addedPicture' : 'addPicture'}
                        onClick={() => inputFile.current.click()}
                        src={addImg}
                        alt='add pictur'
                    />
                    {imageSelected && <img
                        className='thumbnailPicture'
                        alt='added pictur'
                        src={URL.createObjectURL(imageSelected)}
                    // src={ URL.createObjectURL(new Blob([Buffer.from(imageSelected).buffer]))}
                    />}

                </div>

                <input
                    className="chooseFile"
                    lang="en"
                    type="file"
                    ref={inputFile}
                    onChange={(event) => {
                        setImageSelected(event.target.files[0]);
                    }}
                />

                <input type="text" maxlength="36" placeholder='Title...' onChange={(event) => { setTitle(event.target.value) }} />

                <input type="text" placeholder='Price...' onChange={(event) => { setPrice(event.target.value) }} />

                
                {/* {(title && price) ?  */}
                <button 
                    onClick={uploadImage} 
                    className={`${"addProductButton"} ${!(title && price) ? 'addPrdBtnDisabled' : ''}`}
                    disabled={!(title && price)}
                > 
                                
                                {spin ? <img
                                           className="status-image"
                                           src={statusImg}  //pay attention to this address!!!!!
                                           alt="Loading"
                                       /> : "Add Product"}
                                       
                </button>
                                {/* // : <button disabled className="disabledAddProductButton"> Add Producttt </button>}  */}
                
            </div>
        </div>
    );
};



export default AddProduct;
