import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from "phosphor-react";
import { MagnifyingGlass } from "phosphor-react";
import { X } from "phosphor-react";
import './navbar.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";



function Navbar(props) {

  //const [searchItem, setSearchItem] = useState("")
  const navigate = useNavigate();
  const username = props.authState.username;


  const logout = () => {
    axios.get("http://localhost:3001/auth/logout").then((response) => {
      //console.log("response.data after logout request", response.data.message);
      if (response.data.message) {
        props.setAuthState({ username: "", id: 0, status: false });

        console.log("props.authState.status", props.authState.status);
        props.setInitialQuantity({});
        props.setCartQuantity(0);
        navigate("/")
      }
    })
  };


  return (
    <div className="navbar">

      <div className="searchContainer">

        <input
          className="search"
          type="text"
          placeholder='Search...'
          onChange={(event) => { props.setSearchItem(event.target.value) }}
          value={props.searchItem}
        />
        <div className="searchContainerIcons">
          {props.searchItem && <div className="searchIcon" > <X onClick={props.clearSearchBar} /> </div>}
          <div className="searchIcon" onClick={props.filterItem}><MagnifyingGlass /></div>

        </div>        
      </div>

      {props.authState.status && (

      <ul>

        <li>

          <div className="loggedInContainer">
            <h2 className="menuItemLogin" > {username ? `Hello, ${username}` : ""} </h2>
          </div>

          <ul className="dropdown">
            <li ><Link className="menuItem" to="/profile"> Profile </Link></li>
            {props.authState.status && <li className="menuItem" onClick={logout}>Logout</li>}
          </ul>

        </li>

      </ul>
      )}



      <div className="links">
        {!props.authState.status ? (
          <>
            {/* <button className="navbarButton" onClick={() => navigate("/login")}>Login</button>
            <button className="navbarButton" onClick={() => navigate("/registration")}>Registration</button> */}
            <Link className="navbarButton" to="/login">Login</Link>
            <Link className="navbarButton" to="/registration">Registration</Link>            
          </>
        ) : (
          <>
            <Link className="navbarButton" to="/"> Shop </Link>

            <div className="shoppingCartImage">
            <Link className="shoppingCartIcon" to="/cart"> <ShoppingCart size={32} /> </Link>
            {props.cartQuantity && <p className="shoppingCartQuantity">{props.cartQuantity}</p>}
            </div>         

          </>

        )}

      </div>
    </div>
  )
}

export default Navbar