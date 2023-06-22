import React, { useEffect } from 'react';
import ProductTest from './product-test';
import './shop.css';

function Shop(props) {  

  useEffect(() => {
    props.getAllProducts();
    props.refreshCurrentCart();
    }, []);

  return (
    <div className='shop'>      

      <div className='products'>
        {props.initialQuantity && props.products.map((product) => (//product will be render inside the ProductTest component only after initialQuantity set up 
          <ProductTest 
          key={product.id} 
          product={product} 
          authState={props.authState} 
          initialQuantity={props.initialQuantity}
          setCartQuantity={props.setCartQuantity}
          />
        ))}
      </div>
    </div>
  )
}

export default Shop;