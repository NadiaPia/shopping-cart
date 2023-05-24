import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Shop from "./pages/shop/shop";
import Cart from "./pages/cart/cart";
import AddProduct from "./pages/add-product"; 
import ProductsTest from "./pages/products-test";

import ShopContextProvider from "./context/shop-context";
import React, { useState } from 'react';
import Registration from "./pages/Registration";
import Login from "./pages/Login";



function App() {

  const [url, setUrl] = useState('');


  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar />

          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/new-product" element={<AddProduct setUrl={setUrl} url={url} />} />
            <Route path="/products-test" element={<ProductsTest />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />




          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
