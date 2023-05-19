import React from 'react'

function ProductTest(props) {
  return (
    <div className="product">
      <img alt="pic" src={props.product.image}/>
      <div >
        <p>
          <b>{props.product.id}</b>
        </p>        
      </div>
      <button >
        Add To Cart 
      </button>
    </div>
  )
}

export default ProductTest;
