import React, {useRef} from 'react';
import { ShopContext } from '../context/shop-context';
import axios from "axios"


function AddProduct() {

    const loadFile = (e) => {
        const fileToLoad = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            //console.log("eeeee", e)
            axios.post("http://localhost:3001/products", {data: e.currentTarget.result});
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
}

export default AddProduct
