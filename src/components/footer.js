import React from 'react';
import './footer.css';
import linkedIn from '../assets/linkedIn.png';
import github from '../assets/github.png';

import { Link } from 'react-router-dom';




function Footer() {
    return (
        <div className="footer">
            <div className="copyright">
            <h5>
                &copy; {new Date().getFullYear()}
                <span> SHOPPING-HUNTER </span>
            </h5>
            </div>

            <div className="contucts">
            <h5> Contuct us</h5>
            <Link to="https://www.linkedin.com/in/nadiapiatetskaia/"><img className="contactIcon" src={linkedIn} alt="pic" /></Link>
            <Link to="https://github.com/NadiaPia"><img className="contactIcon" src={github} alt="pic" /></Link>
            
            </div>
        </div>
    )
}

export default Footer;
