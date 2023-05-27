import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from "phosphor-react";
import Login from "../pages/Login";
import Registration from "../pages/Registration";



import './navbar.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";



function Navbar(props) {

  const navigate = useNavigate();

  const logout = () => {
    axios.get("http://localhost:3001/auth/logout").then((response) => {
      //console.log("response.data after logout request", response.data.message);
      if(response.data.message) {
        props.setAuthState({ ...props.authState, status: false });
        console.log("props.authState.status", props.authState.status)
      }
    })
  };
  return (
    <div className="navbar">

      <div className="loggedInContainer">
        <h1>{props.authState.username}</h1>
        {props.authState.status && <button onClick={logout}> Logout </button>}
      </div>

      <div className="links">
        {!props.authState.status ? (
        <>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/registration")}>Registration</button>
        </>  
        ) : (
          <>
        <Link to="/"> Shop </Link>
        <Link to="/cart"> <ShoppingCart size={32} /> </Link>
        </> 

        )}             

      </div>
    </div>
  )
}

export default Navbar