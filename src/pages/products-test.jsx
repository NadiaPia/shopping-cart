// import React, { useEffect } from 'react';
// import { Buffer } from 'buffer';

// function ProductsTest(props) {

//   useEffect(() => {
//     props.getAllProducts()
//     console.log("props.getAllProducts", props.getAllProducts)
//   }, [])



//   return (
//     <div>
//       {props.allProducts.map((product) => {

//         let binary = Buffer.from(product.image); //or Buffer.from(data, 'binary')
//         //let imgData = new Blob(binary.buffer, { type: 'application/octet-binary' });
//         let imgData = new Blob([binary.buffer], { type: 'image/jpeg' });

//         let link = URL.createObjectURL(imgData);
//         //const link = binary.toString('base64')

//         console.log("productproductproductproduct", product)
//         return (<img key={`productImg-${product.id}`} src={link} alt="pic" />)

//       })}

//     </div>
//   )
// }

// export default ProductsTest
