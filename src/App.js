import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Shop from "./pages/shop/shop";
//import Cart from "./pages/cart/cart";
import CartTest from "./pages/cart/cart-test";
import AddProduct from "./pages/add-product";
//import ProductsTest from "./pages/products-test";
import ShopContextProvider from "./context/shop-context";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NoResultsFound from "./pages/NoResultsFound";

import { useNavigate } from "react-router-dom";

function App() {

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;//it sende cookies info to the server in every axios requests and it sets access-tokennn in the Application tab

  const [url, setUrl] = useState('');
  const [authState, setAuthState] = useState({ username: "", id: 0, status: false });
  const [searchItem, setSearchItem] = useState("");
  const [products, setProducts] = useState([]);


  const getAllProducts = () => axios.get("http://localhost:3001/products").then((response) => {
    //console.log("respose.data", response.data); //{id:4, imageUrl: "http://...", title:...}
    setProducts(response.data.reverse())
  });

  useEffect(() => {
    getAllProducts()
  }, [])


  useEffect(() => {
    axios.get("http://localhost:3001/auth/login").then((response) => {
      //console.log("response.data", response.data); //{username: 'pavel', id: 54, iat: 1684998132}
      setAuthState({ username: response.data.username, id: response.data.id, status: true });

    }).catch((err) => {
      //console.log(err)
      setAuthState({ ...authState, status: false });
      
      navigate("/");

    })
  }, []);

  const filterItem = () => {
    axios.get("http://localhost:3001/products/filter", { headers: { "searchItem": searchItem.toLowerCase() } }).then((response) => {
      console.log("response.dataaa", response.data.length);
      if (response.data.length < 1) {
        navigate("/not-found");
      } else {
        setProducts(response.data.reverse())
        navigate("/");
      }
    })
  }

  const clearSearchBar = () => {
    setSearchItem("");
    if(window.location.pathname === "/") {
      getAllProducts();
    }
    navigate("/");
  }

  return (
    <div className="App">
      <ShopContextProvider>

        <Navbar authState={authState} setAuthState={setAuthState} searchItem={searchItem} setSearchItem={setSearchItem} filterItem={filterItem} clearSearchBar={clearSearchBar} />

        <Routes>
          <Route path="/" element={
            <Shop
              authState={authState}
              products={products}
              getAllProducts={getAllProducts}

            />}
          />

          <Route path="/cart" element={<CartTest products={products} authState={authState} />} />
          <Route path="/new-product" element={<AddProduct setUrl={setUrl} url={url} />} />
          {/*<Route path="/products-test" element={<ProductsTest allProducts={allProducts} setAllProducts={setAllProducts} getAllProducts={getAllProducts} />} />*/}
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login authState={authState} setAuthState={setAuthState} />} />
          <Route path="/profile" element={<Profile setProducts={setProducts} />} />
          <Route path="/not-found" element={<NoResultsFound />} />

        </Routes>

      </ShopContextProvider>
    </div>
  );
}

export default App;
