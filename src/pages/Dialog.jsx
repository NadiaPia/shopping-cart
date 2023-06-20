import React from 'react';
import './Dialog.css';



function Dialog(props) {
    const { message, onConfirm, setDialog } = props;
  return (
    <div className="dialogContainer">
      <div className="dialog">
        <h3>{message}</h3>
        <div className="buttonsContainer">
            <button className="dialogButton" style={{background:"red"}} onClick={onConfirm}>Yes</button>
            <button className="dialogButton" style={{background:"green"}} onClick={() => setDialog({ message: "", isLoading: false, args: null })}>No</button>
        </div>

      </div>
    </div>
  )
}

export default Dialog
