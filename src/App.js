import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Shop from "./pages/shop/shop";
import Cart from "./pages/cart/cart";
import AddProduct from "./pages/add-product"; 
import ProductsTest from "./pages/products-test";
import ShopContextProvider from "./context/shop-context";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Registration from "./pages/Registration";
import Login from "./pages/Login";




function App() {

  axios.defaults.withCredentials = true;//it sende cookies info to the server in every axios requests and it sets access-tokennn in the Application tab


  /*useEffect(() => {
    axios.get("http://localhost:3001/auth/auth", { withCredentials: true }).then((response) => {
      console.log("----------")
    })


  }, [])*/

  
  useEffect(() => {
    console.log("before axios.det login")
    axios.get("http://localhost:3001/auth/login").then((response) => {
      console.log(response)

    })
  }, [])
  

  const [url, setUrl] = useState('');
  const [authState, setAuthState] = useState({ username: "", id: 0, status: false });


  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar authState={authState} setAuthState={setAuthState}/>

          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/new-product" element={<AddProduct setUrl={setUrl} url={url} />} />
            <Route path="/products-test" element={<ProductsTest />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login authState={authState} setAuthState={setAuthState}/>} />




          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
