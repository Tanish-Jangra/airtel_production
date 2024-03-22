import React from 'react'
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
const Navbar = ({isAdmin, isAuthenticated}) => {
  const navigate = useNavigate();

  const handleLogout = () =>{
    localStorage.clear();
    isAdmin=false;
    isAuthenticated=false;
    navigate("/");
  }
  return (
    <div className='NavbarContainer'>
            {/* <h3>MRM PROCOM</h3> */}
            <ul className='NavbarItems'>
                <li className='ListItem' onClick={handleLogout}>Logout</li>
            </ul>
    </div>
  )
}

export default Navbar