import React, { useState } from 'react';
import axios from "axios";



function Registration() {

  
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');

  const register = axios.post("http://localhost:3001/register", {
    username: usernameReg,
    password: passwordReg
  }).then((response) => {
    console.log(response.data)
  })

  return (
    <div className="registration">
            <h1>Registration</h1>
            <input type="text" placeholder="Username" onChange={(e) => { setUsernameReg(e.target.value); }} />
            <input type="text" placeholder="Password" onChange={(e) => { setPasswordReg(e.target.value); }} />
            
            {(usernameReg &&  passwordReg)? <button onClick={register}>Register</button> : <button disabled  onClick={register}>Register</button>}
        </div>
  )
}

export default Registration;
