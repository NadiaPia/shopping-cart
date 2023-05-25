import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from "phosphor-react";
import './navbar.css';
import { useNavigate } from "react-router-dom";


function Navbar(props) {

  const navigate = useNavigate();


  const logout = () => {
    console.log("logout")
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