import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from "phosphor-react";
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
  }
  return (
    <div className="navbar">

      <div className="loggedInContainer">
        <h1>{props.authState.username}</h1>
        {props.authState.status && <button onClick={logout}> Logout </button>}
      </div>

      <div className="links">
        <Link to="/"> Shop </Link>
        <Link to="/cart"> <ShoppingCart size={32} /> </Link>       

      </div>
      <button onClick={() => navigate("/login")}>Login</button>


    </div>
  )
}

export default Navbar