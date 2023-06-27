import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Login(props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //axios.defaults.withCredentials = true; //!!!!!!!!!!!!!!!!!!!!!!!important it sets access-tokennn in the Application tab

  // axios.get('/logout', { withCredentials: true })
  const login = () => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, { 
      username: username, 
      password: password
     }).then((response) => {      
      props.setAuthState({ username: response.data.username, id: response.data.id, status: true });
      setUsername("");
      setPassword("");
      navigate("/");
    }).catch(error => {  
      console.log("error", error)    
      alert(error.response.data.error)
    });
  };

  return (
    <div className="loginContainer">
      <h1>Login</h1>
      <input type="text" placeholder="Username..." value={username} onChange={(event) => { setUsername(event.target.value) }} />
      <input type="password" placeholder="Password..." value={password} onChange={(event) => { setPassword(event.target.value) }} />
      <button className="regAndLogButton" onClick={login}>Login</button>
    </div>
  )
}

export default Login;
