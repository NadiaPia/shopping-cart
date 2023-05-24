import React, { useState } from 'react';
import axios from "axios";


function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        axios.post("http://localhost:3001/auth/login", {username: username, password: password}).then((response) => {
            if(response.data.error) {
                alert(response.data.error)
            } else {
                console.log("response to the FE after login")
            }
        })

    }

  return (
    <div className="loginContainer">
        <h1>Login</h1>
      <input type="text" placeholder="Username..." onChange={(event) => {setUsername(event.target.value)}}/>   
      <input type="password" placeholder="Password..." onChange={(event) => {setPassword(event.target.value)}}/>

      <button onClick={login}>Login</button>

    </div>
  )
}

export default Login
