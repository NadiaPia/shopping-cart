import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration(props) {

  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const navigate = useNavigate();

  const register = () => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
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
      console.log("error.response.data.error.errors[0].message", error.response.data.error.errors[0].message);
      alert("This name is already in use. Please, choose another name.");
    });
  }

  return (
    <div className="loginContainer">
      <h1>Registration</h1>
      <input type="text" placeholder="Username" value={usernameReg} onChange={(e) => { setUsernameReg(e.target.value); }} />
      <input type="text" placeholder="Password" value={passwordReg} onChange={(e) => { setPasswordReg(e.target.value); }} />

      <button
        className={`${"regAndLogButton"} ${!(usernameReg && passwordReg) ? "regAndLogButtonDisabled" : ""}`}
        onClick={register}
        disabled={!(usernameReg && passwordReg)}
      >
        Register
      </button>
    </div>
  )
}

export default Registration;
