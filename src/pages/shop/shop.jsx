import React, { useEffect, useState } from 'react';
//import {PRODUCTS} from '../../products'
//import Product from './product';
import ProductTest from './product-test';

import './shop.css';
import axios from "axios";

function Shop(props) {

 
  const [initialQuantity, setInitialQuantity] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/carts`).then((response) => {      
      //console.log("response.data", response.data);
      const obj = {};
      response.data.map((el) => {
        obj[el.ProductId] = el.quantity;
      })
      console.log("obj", obj); //{3:1, 4:3} means {el.ProductId: el.quantity}
      setInitialQuantity(obj)
      
    })

  }, []) 

  return (
    <div className='shop'>
      <div className='shopTitle'>
        <h1>
          Nadia's shop
        </h1>
      </div>

      <div className='products'>
        {initialQuantity && props.products.map((product) => (//product will be render inside the ProductTest component only after initialQuantity set up 
          <ProductTest key={product.id} product={product} authState={props.authState} initialQuantity={initialQuantity}/>
        ))}
      </div>
    </div>
  )
}


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

export default Shop;