import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration(props) {
  
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const navigate = useNavigate();

  const register = () => {
    axios.post(`https://shopping-hunter-api.web.app/auth`, {
    username: usernameReg,
    password: passwordReg
  }).then((response) => {    
    props.setAuthState({
      username: response.data.username, 
      id: response.data.id, 
      status: true
    });     

    setUsernameReg("");
    setPasswordReg("");
    navigate("/");
  }).catch(error => {
    console.log(error);
});
}

  return (
    <div className="loginContainer">
            <h1>Registration</h1>
            <input type="text" placeholder="Username" value={usernameReg} onChange={(e) => { setUsernameReg(e.target.value); }} />
            <input type="text" placeholder="Password" value={passwordReg} onChange={(e) => { setPasswordReg(e.target.value); }} />
            
            {(usernameReg &&  passwordReg)? <button className="regAndLogButton" onClick={register}>Register</button> : <button className="regAndLogButton" disabled  onClick={register}>Register</button>}
        </div>
  )
}

export default Registration;
