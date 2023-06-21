import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

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
import Payment from "./pages/Payment";
import Completion from "./pages/Completion";



import { useNavigate } from "react-router-dom";

function App() {

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;//it sende cookies info to the server in every axios requests and it sets access-tokennn in the Application tab

  const [url, setUrl] = useState('');
  const [authState, setAuthState] = useState({ username: "", id: 0, status: false });
  const [searchItem, setSearchItem] = useState("");
  const [products, setProducts] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [initialQuantity, setInitialQuantity] = useState(null);


  const getAllProducts = () => axios.get("http://localhost:3001/products").then((response) => {
    //console.log("respose.data", response.data); //{id:4, imageUrl: "http://...", title:...}
    setProducts(response.data.reverse())
  });

  const refreshCurrentCart = () => {
    axios.get(`http://localhost:3001/carts`).then((response) => {
      console.log("response.data", response.data);
      let totalQuantity = 0;
      const obj = {};
      response.data.map((el) => {
        obj[el.ProductId] = el.quantity;
        totalQuantity += el.quantity
      })
      console.log("obj", obj); //{3:1, 4:3} means {el.ProductId: el.quantity}
      console.log("totalQuantity", totalQuantity)

      setInitialQuantity(obj);
      setCartQuantity(totalQuantity)

    }).catch((err) => {
      setInitialQuantity({}) //allows to render products for not authorized users
    })
  }

  useEffect(() => {
    getAllProducts()
  }, []);

  useEffect(() => {
    if (window.location.pathname === "/completion") {
      axios.delete("http://localhost:3001/carts/clearCart").then((response) => {
        setCartQuantity(0);        
      }).catch((err) => {
        console.log(err);
      })
    }
  }, [window.location.pathname])


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

  useEffect(() => {
    if(!authState.status) {
      return;
    };
    refreshCurrentCart();
  }, [authState.status])

  const filterItem = () => {
    axios.get("http://localhost:3001/products/filter", { headers: { "searchItem": searchItem.toLowerCase() } }).then((response) => {
      console.log("response.dataaa", response.data.length);
      if (response.data.length < 1) {
        navigate("/not-found");
      } else {
        setProducts(response.data.reverse());
        navigate("/");
      };
    });
  };

  const clearSearchBar = () => {
    setSearchItem("");
    if (window.location.pathname === "/") {
      getAllProducts();
    }
    navigate("/");
  }

  return (
    <div className="App">
      <ShopContextProvider>

        <Navbar
          authState={authState}
          setAuthState={setAuthState}
          searchItem={searchItem}
          setSearchItem={setSearchItem}
          filterItem={filterItem}
          clearSearchBar={clearSearchBar}
          cartQuantity={cartQuantity}
          setCartQuantity={setCartQuantity}
          setInitialQuantity={setInitialQuantity}
        />

        <Routes>
          <Route path="/" element={
            <Shop
              authState={authState}
              products={products}
              getAllProducts={getAllProducts}
              setInitialQuantity={setInitialQuantity}
              initialQuantity={initialQuantity}
              setCartQuantity={setCartQuantity}

            />}
          />

          <Route path="/cart" element={
            <CartTest
              products={products}
              authState={authState}
              setCartQuantity={setCartQuantity}
            />}
          />

          <Route path="/new-product" element={<AddProduct setUrl={setUrl} url={url} />} />
          {/*<Route path="/products-test" element={<ProductsTest allProducts={allProducts} setAllProducts={setAllProducts} getAllProducts={getAllProducts} />} />*/}
          <Route path="/registration" element={<Registration authState={authState} setAuthState={setAuthState}/>} />
          <Route path="/login" element={<Login authState={authState} setAuthState={setAuthState} />} />
          <Route path="/profile" element={<Profile setProducts={setProducts} refreshCurrentCart={refreshCurrentCart}/>} />
          <Route path="/not-found" element={<NoResultsFound />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/completion" element={<Completion />} />

        </Routes>

        <Footer
          
        />

      </ShopContextProvider>
    </div>
  );
}

export default App;
