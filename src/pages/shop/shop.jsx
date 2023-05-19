import React, { useEffect, useState } from 'react';
import {PRODUCTS} from '../../products'
//import Product from './product';
import ProductTest from './product-test';

import './shop.css';
import axios from "axios";


function Shop() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/products").then((response) => {
      console.log("respose.data", response.data);
      setProducts(response.data.reverse())
    })
  }, [])
  /*
  return (
    <div className='shop'>
      <div className='shopTitle'>
        <h1>
          Nadia's shop
        </h1>
      </div>

      <div className='products'>
        {PRODUCTS.map((product) => (
          <Product key={product.id} data={product}/>
        ))}
      </div>
    </div>
  )*/

  return (
    <div className='shop'>
      <div className='shopTitle'>
        <h1>
          Nadia's shop
        </h1>
      </div>

      <div className='products'>
        {products.map((product) => (
          <ProductTest key={product.id} product={product}/>
        ))}
      </div>
    </div>
  )
}

export default Shop