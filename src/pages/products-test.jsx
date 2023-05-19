import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Buffer } from 'buffer';


function ProductsTest() {

  const [allProducts, setAllProducts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/products").then((response) => {
      setAllProducts(response.data)
    })
  }, [])


  return (
    <div>
      {allProducts.map((product) => {

        let binary = Buffer.from(product.image); //or Buffer.from(data, 'binary')
        //let imgData = new Blob(binary.buffer, { type: 'application/octet-binary' });
        let imgData = new Blob([binary.buffer], { type: 'image/jpeg' });

        let link = URL.createObjectURL(imgData);
        //const link = binary.toString('base64')

        console.log("productproductproductproduct", product)
        return (<img key={`productImg-${product.id}`} src={link} alt="pic" />)

      })}

    </div>
  )
}

export default ProductsTest
